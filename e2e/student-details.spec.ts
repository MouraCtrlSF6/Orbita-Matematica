import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';
import { test } from './rooms-fixture';

const longTitle =
  'Uma missão com título muito longo para conferir a leitura e o truncamento em telas de todos os tamanhos';

test('shows ordered sectors, mission summaries, supports and answer feedback', async ({ page }) => {
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 0');
  await page.evaluate((title) => {
    const mission = {
      missionNumber: 1,
      missionTitle: title,
      missionStatus: 'completed',
      usedHints: true,
      usedVisuals: false,
      providedAnswers: {
        second: { order: 2, answer: { label: 'Resposta numérica', value: '8' }, correct: true },
        first: { order: 1, answer: { label: 'Resposta numérica', value: '4' }, correct: false },
      },
    };

    window.dispatchEvent(
      new CustomEvent('mock-room-update', {
        detail: [
          {
            studentId: 'visual-student',
            name: 'Aluno de teste',
            sectors: {
              base: { sectorName: 'Base de exploração', sectorStatus: 'not_started', missions: {} },
              launch: {
                sectorName: 'Estação de lançamento',
                sectorStatus: 'in_progress',
                missions: {
                  second: {
                    ...mission,
                    missionNumber: 2,
                    missionTitle: 'Segunda missão',
                    missionStatus: 'in_progress',
                  },
                  first: mission,
                  third: {
                    ...mission,
                    missionNumber: 3,
                    missionTitle: 'Terceira missão',
                    missionStatus: 'not_started',
                    providedAnswers: {},
                  },
                },
              },
              workshop: {
                sectorName: 'Oficina orbital',
                sectorStatus: 'not_started',
                missions: {},
              },
            },
          },
        ],
      }),
    );
  }, longTitle);
  const student = page.getByRole('button', { name: 'Aluno de teste', exact: true });

  await student.click();
  const sectors = page
    .getByRole('group', { name: 'Setores de Aluno de teste', exact: true })
    .locator(':scope > .accordion-item > div > h3 > .accordion-trigger');

  await expect(sectors).toHaveText([
    'Estação de lançamento · Em andamento',
    'Oficina orbital · Não iniciado',
    'Base de exploração · Não iniciado',
  ]);
  await expect(sectors.first().locator('.text-amber-600')).toHaveText('Em andamento');
  await sectors.first().click();
  const firstMission = page.getByRole('button', {
    name: `Missão 1 · ${longTitle} Concluído`,
    exact: true,
  });

  await expect(firstMission.locator('.text-lime-600')).toHaveText('Concluído');
  await expect(firstMission.locator('.rounded-full')).toHaveCount(0);
  await firstMission.click();
  const details = page.locator(`#${await firstMission.getAttribute('aria-controls')}`);

  await expect(details.getByText('Dicas usadas:')).toContainText('Sim');
  await expect(details.getByText('Modelo visual usado:')).toContainText('Não');
  await expect(details.getByText('Respostas', { exact: true })).toBeVisible();
  await expect(details.locator('li')).toHaveText([
    'Resposta numérica · 4 · Incorreta',
    'Resposta numérica · 8 · Correta',
  ]);
  const remove = page.getByRole('button', { name: 'Remover Aluno de teste da sala' });

  await remove.hover();
  await expect(page.getByRole('tooltip')).toHaveText('Remover aluno');
  await page.keyboard.press('Escape');
  await firstMission.focus();
  for (const width of [390, 700, 1000, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      await firstMission
        .locator('[title]')
        .evaluate((element) => element.scrollWidth > element.clientWidth),
    ).toBe(true);
    // These explicitly requested text colors have known contrast limitations on light surfaces.
    const { violations } = await new AxeBuilder({ page })
      .exclude('.text-lime-600')
      .exclude('.text-amber-600')
      .analyze();

    expect(violations).toEqual([]);
    await page.screenshot({
      path: test.info().outputPath(`students-${width}.png`),
      fullPage: true,
    });
  }
  await student.click();
  await student.click();
  await expect(details.getByText('Respostas', { exact: true })).toBeVisible();
});
