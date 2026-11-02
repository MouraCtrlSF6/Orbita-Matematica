import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { missions } from '../src/content/missions';
import { sectors } from '../src/content/sectors';
import type { Mission } from '../src/game/types';

async function visitDestination(page: Page, label: string) {
  const list = page.locator('.flight-destinations');
  if (!(await list.evaluate((element) => (element as HTMLDetailsElement).open)))
    await list.getByText('Destinos em lista', { exact: true }).click();
  await list
    .getByRole('button')
    .filter({ has: page.getByText(label, { exact: true }) })
    .click();
}

async function openMission(page: Page, mission: Mission) {
  const sector = sectors.find((item) => item.id === mission.sectorId)!;
  if (!(await page.getByRole('heading', { name: sector.name, exact: true }).isVisible())) {
    await page.getByRole('button', { name: 'Mapa da expedição', exact: true }).click();
    await visitDestination(page, sector.name);
  }
  await visitDestination(page, mission.title);
}

async function finishTutorial(page: Page) {
  await page.getByRole('button', { name: 'Vamos explorar', exact: true }).click();
  await page.getByRole('button', { name: 'Pular prática de pilotagem' }).click();
  await page.getByRole('button', { name: 'Conhecer uma variável' }).click();
  await page.getByRole('button', { name: 'Agora é sua vez' }).click();
  await page.getByRole('radio', { name: '4 cristais', exact: true }).check();
  await page.getByRole('button', { name: 'Pronto para explorar' }).click();
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
}

test('completes tutorial, all 52 catalog missions, authors a problem and restores progress', async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.goto('/');
  await finishTutorial(page);
  for (let index = 0; index < missions.length - 1; index++) {
    await openMission(page, missions[index]);
    if (index === 0) {
      await page.getByRole('radio', { name: '5', exact: true }).check();
      await page.getByRole('button', { name: 'Conferir resposta' }).click();
    } else {
      await page.getByRole('button', { name: 'Quero uma pista' }).click();
      await page.getByRole('button', { name: 'Próximo passo' }).click();
      await page.getByRole('button', { name: 'Próximo passo' }).click();
      await page.getByRole('button', { name: 'Entendi, concluir com apoio' }).click();
    }
    await page.getByRole('button', { name: 'Continuar exploração', exact: true }).click();
    if (missions[index + 1].sectorId !== missions[index].sectorId) {
      await expect(page.locator('.sector-celebration')).toContainText('Setor concluído!');
      await expect(page.locator('.sector-celebration')).toContainText('está disponível');
    }
  }
  await openMission(page, missions[missions.length - 1]);
  await page.getByLabel('Carga da missão').selectOption('peças');
  await page.getByLabel('Quantidade de robôs (x)').selectOption('4');
  await page.getByRole('textbox', { name: 'Qual é o total?', exact: true }).fill('12');
  await page.getByRole('button', { name: 'Conferir resposta' }).click();
  await page.getByRole('button', { name: 'Continuar exploração', exact: true }).click();
  await expect(page.locator('.sector-celebration')).toContainText('Você concluiu toda a expedição');
  await page.getByRole('button', { name: /Minhas descobertas/ }).click();
  await expect(page.getByRole('heading', { name: 'Um universo de descobertas!' })).toBeVisible();
  await expect(page.getByText(/Seu problema: 4 robôs levam 2 peças/)).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: /Minhas descobertas/ }).click();
  await expect(page.getByRole('heading', { name: 'Um universo de descobertas!' })).toBeVisible();
  await page.getByRole('button', { name: 'Voltar ao mapa' }).click();
  await visitDestination(page, sectors[0].name);
  await visitDestination(page, missions[0].title);
  await expect(page.getByRole('heading', { name: missions[0].title })).toBeVisible();
});

test('supports keyboard, preferences, reduced motion and confirmed reset', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await page.getByRole('checkbox', { name: /Texto maior/ }).check();
  await page.getByRole('checkbox', { name: /Reduzir movimentos/ }).check();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('.app-shell')).toHaveClass(/large-text/);
  await expect(page.locator('.flight')).toHaveClass(/flight-reduced/);
  await expect(page.locator('.player-ship')).toHaveCSS('filter', 'none');
  await page.reload();
  await expect(page.locator('.app-shell')).toHaveClass(/large-text/);
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await page.getByRole('button', { name: 'Reiniciar expedição' }).click();
  await page.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page.locator('.app-shell')).toHaveClass(/large-text/);
  await page.getByRole('button', { name: 'Reiniciar expedição' }).click();
  await page.getByRole('button', { name: 'Sim, apagar progresso' }).click();
  await expect(page.locator('.app-shell')).not.toHaveClass(/large-text/);
});

test('remains playable without storage or a speech API', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get: () => {
        throw new Error('denied');
      },
    });
    Object.defineProperty(window, 'speechSynthesis', { value: undefined });
  });
  await page.goto('/');
  await expect(page.getByText(/O navegador não permitiu salvar/)).toBeVisible();
  await finishTutorial(page);
  await openMission(page, missions[0]);
  await page.getByRole('button', { name: 'Ouvir enunciado' }).click();
  await expect(page.getByText(/Leitura em voz alta indisponível/)).toBeVisible();
  await page.getByRole('radio', { name: '5', exact: true }).check();
  await page.getByRole('button', { name: 'Conferir resposta' }).click();
  await expect(
    page.getByRole('button', { name: 'Continuar exploração', exact: true }),
  ).toBeVisible();
});

test('accepts the correct independent answers throughout all 52 missions', async ({ page }) => {
  test.setTimeout(90000);
  await page.addInitScript(() =>
    localStorage.setItem(
      'orbita-matematica:v1',
      JSON.stringify({
        version: 1,
        completed: {},
        tutorialDone: true,
        lastMissionId: null,
        preferences: { largeText: false, reducedMotion: false },
      }),
    ),
  );
  await page.goto('/');
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  interface Response {
    radio?: string;
    number?: string;
    tokens?: string[];
  }
  const responses: Record<string, Response> = {
    'launch-1': { radio: '6 baterias' },
    'launch-2': { number: '9' },
    'launch-3': { radio: 'A quantidade de robôs' },
    'launch-4': { tokens: ['x', 'Multiplicação', '3'] },
    'launch-5': { number: '12' },
    'workshop-1': { radio: '7 cristais' },
    'workshop-2': { number: '8' },
    'workshop-3': { number: '9' },
    'workshop-4': { radio: '10 peças' },
    'workshop-5': { number: '14' },
    'base-1': { radio: '4 + x' },
    'base-2': { radio: '2x + 4' },
    'base-3': { number: '12' },
    'base-4': { tokens: ['4', 'Adição', 'x', 'Multiplicação', '2'] },
    'base-5': { number: '10' },
  };
  const importedAnswers = [
    5, 10, 5, 8, 8, 15, 6, 5, 6, 14, 10, 4, 5, 10, 5, 14, 4, 7, 15, 5, 18, 0, 5, 7, 6, 12, -4, 4, 5,
    4, 3, -3, 6, 7, 7, 13, 7,
  ];
  for (const mission of missions) {
    await openMission(page, mission);
    const response = mission.id.startsWith('equations-')
      ? { radio: String(importedAnswers[Number(mission.id.split('-')[1]) - 1]) }
      : responses[mission.id];
    if (response.radio)
      await page.getByRole('radio', { name: response.radio, exact: true }).check();
    if (response.number)
      await page
        .getByRole('textbox', { name: 'Qual é o total?', exact: true })
        .fill(response.number);
    if (response.tokens)
      for (const token of response.tokens)
        await page.getByRole('button', { name: token, exact: true }).click();
    await page.getByRole('button', { name: 'Conferir resposta' }).click();
    await page.getByRole('button', { name: 'Continuar exploração', exact: true }).click();
  }
  await page.getByRole('button', { name: /Minhas descobertas/ }).click();
  await expect(page.getByRole('heading', { name: 'Um universo de descobertas!' })).toBeVisible();
});

test('has accessible structure and contrast across the main screens', async ({ page }) => {
  test.setTimeout(60000);
  async function audit() {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((violation) => ({
        id: violation.id,
        nodes: violation.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
  }
  await page.goto('/');
  await audit();
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await audit();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Vamos explorar' }).click();
  await audit();
  await page.getByRole('button', { name: 'Pular prática de pilotagem' }).click();
  await audit();
  await page.getByRole('button', { name: 'Conhecer uma variável' }).click();
  await page.getByRole('button', { name: 'Agora é sua vez' }).click();
  await page.getByRole('radio', { name: '4 cristais', exact: true }).check();
  await page.getByRole('button', { name: 'Pronto para explorar' }).click();
  await audit();
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  await audit();
  await openMission(page, missions[0]);
  await page.getByRole('button', { name: 'Ver com objetos' }).click();
  await page.getByRole('button', { name: 'Quero uma pista' }).click();
  await audit();
  await page.getByRole('button', { name: /Minhas descobertas/ }).click();
  await audit();
});

test('reflows at an effective 200 percent desktop zoom and smaller windows', async ({ page }) => {
  for (const width of [720, 390]) {
    await page.setViewportSize({ width, height: 600 });
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Vamos explorar' })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await finishTutorial(page);
    await expect(page.getByRole('region', { name: 'Área de pilotagem' })).toBeVisible();
    await openMission(page, missions[0]);
    await expect(page.getByRole('button', { name: 'Conferir resposta' })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await page.evaluate(() => localStorage.clear());
  }
});
