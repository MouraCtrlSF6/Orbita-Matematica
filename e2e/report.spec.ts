import { expect } from '@playwright/test';
import { test } from './rooms-fixture';
import { missions } from '../src/content/missions';
import { initialSave } from '../src/game/progress';
import { initialRoomStudent } from '../src/game/room-progress';

async function createRoom(page: import('@playwright/test').Page) {
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
}

test('downloads the actual worker-generated PDF, shows loading and keeps the UI responsive', async ({
  page,
}) => {
  test.setTimeout(120000);
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.exposeFunction('recordCatalogLoad', () => gate);
  await createRoom(page);
  const student = initialRoomStudent('ana', 'Ana Souza', initialSave());
  const mission = student.sectors.launch.missions[missions[0].id];
  mission.missionStatus = 'completed';
  mission.usedHints = true;
  mission.providedAnswers = {
    first: { order: 1, answer: { label: 'Alternativa', value: '4' }, correct: false },
    second: { order: 2, answer: { label: 'Alternativa', value: '5' }, correct: true },
  };
  await page.evaluate(
    (students) => window.dispatchEvent(new CustomEvent('mock-room-update', { detail: students })),
    [student, { ...student, studentId: 'homonym' }],
  );
  const button = page.getByRole('button', { name: 'Exportar PDF', exact: true });
  await button.focus();
  await expect(page.getByRole('tooltip')).toContainText('Exportar relatório');
  await button.click();
  await expect(page.getByRole('button', { name: 'Gerando PDF…' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Gerando PDF…' })).toHaveAttribute(
    'aria-busy',
    'true',
  );
  await page.getByRole('tab', { name: 'Alunos', exact: true }).focus();
  await expect(page.getByRole('tab', { name: 'Alunos', exact: true })).toBeFocused();
  const download = page.waitForEvent('download');
  release();
  const result = await download;
  expect(result.suggestedFilename()).toMatch(/^orbita-relatorio-turma-teste-.*\.pdf$/);
  await result.saveAs(test.info().outputPath('report.pdf'));
  await expect(button).toBeEnabled();
  const roomId = await page.evaluate(() => localStorage.getItem('mock-room-id'));
  expect(
    await page.evaluate(() => JSON.parse(sessionStorage.getItem('mock-analytics-events') ?? '[]')),
  ).toEqual([{ name: 'room_report_pdf_generated', parameters: { room_id: roomId } }]);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(button).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath('export-mobile.png'), fullPage: true });
  const errors = page.getByRole('alert');
  await expect(errors).toHaveCount(0);
});

test('exports an empty room and recovers from a catalog failure', async ({ page }) => {
  await createRoom(page);
  await page.evaluate(() => localStorage.setItem('mock-catalog-read-error', 'true'));
  const button = page.getByRole('button', { name: 'Exportar PDF', exact: true });
  await button.click();
  await expect(
    page.getByText('Não foi possível gerar o PDF. Tente novamente.', { exact: true }),
  ).toBeVisible();
  await expect(button).toBeEnabled();
  expect(await page.evaluate(() => sessionStorage.getItem('mock-analytics-events'))).toBeNull();
  await page.evaluate(() => localStorage.removeItem('mock-catalog-read-error'));
  const download = page.waitForEvent('download');
  await button.click();
  await (await download).saveAs(test.info().outputPath('empty.pdf'));
  await expect(button).toBeEnabled();
});
