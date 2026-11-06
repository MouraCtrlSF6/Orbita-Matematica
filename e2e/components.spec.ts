import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/fixtures/components.html');
});

test('uses a spinner as a loading button label and respects reduced motion', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Carregando dados…' });
  const icon = button.locator('svg');

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(button).toBeDisabled();
  await expect(button).toHaveAttribute('aria-busy', 'true');
  await expect(icon).toHaveCSS('animation-name', 'spin');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(icon).toHaveCSS('animation-name', 'none');
  await expect(button).toHaveAccessibleName('Carregando dados…');
});

test('supports keyboard selection, form submission and tab navigation', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Nome', exact: true }).fill('Explorador');
  const select = page.getByRole('combobox', { name: 'Setor' });

  await select.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('option', { name: 'Indisponível' })).toBeDisabled();
  await expect(page.getByRole('option', { name: 'Lançamento', exact: true })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('option', { name: 'Base', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(select).toHaveText('Base');
  await page.getByRole('checkbox').focus();
  await page.keyboard.press('Space');
  await page.getByRole('radio', { name: 'Quatro' }).focus();
  await expect(page.getByRole('radio', { name: 'Quatro' })).toBeFocused();
  await page.keyboard.down('ArrowDown');
  await expect(page.getByRole('radio', { name: 'Seis' })).toBeFocused();
  await page.keyboard.up('ArrowDown');
  await expect(page.getByRole('radio', { name: 'Seis' })).toBeChecked();
  await page.getByRole('button', { name: 'Salvar', exact: true }).click();
  await expect(page.getByLabel('Valores salvos')).toHaveText(
    '{"name":"Explorador","sector":"base","resume":"on","answer":"6"}',
  );
  await page.getByRole('tab', { name: 'Alunos' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tabpanel', { name: 'Questões' })).toHaveText('Lista de questões');
});

test('contains modal focus, restores it on Escape and passes accessibility checks', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'Abrir ajustes' });

  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Ajustes' });

  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: 'Confirmar' }).focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Fechar diálogo' })).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('scales controls and keeps the modal inside a narrow viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addStyleTag({ content: 'html { font-size: 125%; }' });
  await expect(page.getByRole('combobox')).toBeVisible();
  await page.getByRole('button', { name: 'Abrir ajustes' }).click();
  const box = await page.getByRole('dialog').boundingBox();

  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/components-mobile.png', fullPage: true });
});

test('hides mounted collapsible content from keyboard navigation and preserves nested state', async ({
  page,
}) => {
  const trigger = page.getByRole('button', { name: 'Detalhes da missão', exact: true });

  await trigger.focus();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Abrir ajustes' })).toBeFocused();
  await trigger.press('Enter');
  await page.getByRole('button', { name: 'Apoios', exact: true }).press('Space');
  await page.getByRole('textbox', { name: 'Anotação' }).fill('Revisar expressão');
  await trigger.press('Enter');
  await expect(page.getByRole('textbox', { name: 'Anotação' })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Apoios', exact: true })).toBeHidden();
  await trigger.press('Space');
  await expect(page.getByRole('button', { name: 'Apoios', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.getByRole('textbox', { name: 'Anotação' })).toHaveValue('Revisar expressão');
});

test('opens tooltip variants on hover, stays open over content and dismisses with Escape', async ({
  page,
}) => {
  for (const variant of ['default', 'light', 'flight']) {
    await page.getByRole('button', { name: `Ajuda ${variant}`, exact: true }).hover();
    await expect(page.getByRole('tooltip')).toContainText(`Ajuda da missão ${variant}`);
    await page.locator('.tooltip-content').hover();
    await expect(page.locator('.tooltip-content')).toBeVisible();
    expect(
      (await new AxeBuilder({ page }).include('.tooltip-content').analyze()).violations,
    ).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('tooltip')).toHaveCount(0);
  }
});

test('describes a focused tooltip trigger and fits the narrow viewport with enlarged text', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ content: 'html { font-size: 125%; }' });
  const trigger = page.getByRole('button', { name: 'Ajuda default', exact: true });

  await trigger.focus();
  await expect(trigger).toHaveAccessibleDescription('Ajuda da missão default');
  const box = await page.locator('.tooltip-content').boundingBox();

  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toHaveCount(0);
  await expect(trigger).toBeFocused();
  await trigger.press('Tab');
  await expect(page.getByRole('button', { name: 'Ajuda light', exact: true })).toBeFocused();
});

test('supports accordion variants, exclusive expansion and keyboard navigation past disabled items', async ({
  page,
}) => {
  for (const variant of ['default', 'card', 'ghost', 'flight']) {
    const group = page.getByRole('group', { name: `Accordion ${variant}`, exact: true });
    const mission = group.getByRole('button', { name: `Missão ${variant}`, exact: true });
    const support = group.getByRole('button', { name: `Apoios ${variant}`, exact: true });

    await expect(
      group.getByRole('button', { name: `Indisponível ${variant}`, exact: true }),
    ).toBeDisabled();
    await mission.focus();
    await page.keyboard.press('Enter');
    await expect(group.getByRole('region', { name: `Missão ${variant}` })).toHaveText(
      'Enunciado da missão.',
    );
    await page.keyboard.press('ArrowDown');
    await expect(support).toBeFocused();
    await page.keyboard.press('Space');
    await expect(mission).toHaveAttribute('aria-expanded', 'false');
    await expect(group.getByRole('region', { name: `Apoios ${variant}` })).toHaveText(
      'Dicas da missão.',
    );
    expect((await new AxeBuilder({ page }).include('.accordion').analyze()).violations).toEqual([]);
    await page.keyboard.press('Home');
    await expect(mission).toBeFocused();
    await page.keyboard.press('End');
    await expect(support).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(group.getByRole('region')).toHaveCount(0);
  }
});

test('keeps multiple accordion sections open and preserves mounted content on small screens', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ content: 'html { font-size: 125%; }' });
  const group = page.getByRole('group', { name: 'Seções combinadas', exact: true });
  const notes = group.getByRole('button', { name: 'Anotações da expedição', exact: true });

  await notes.click();
  await group.getByRole('textbox', { name: 'Anotações da expedição' }).fill('Revisar expressão');
  await group.getByRole('button', { name: 'Progresso da expedição', exact: true }).click();
  await expect(group.getByRole('region')).toHaveCount(2);
  await notes.click();
  await expect(group.getByRole('textbox')).toBeHidden();
  await notes.focus();
  await page.keyboard.press('Tab');
  await expect(
    group.getByRole('button', { name: 'Progresso da expedição', exact: true }),
  ).toBeFocused();
  await notes.click();
  await expect(group.getByRole('textbox')).toHaveValue('Revisar expressão');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await group.screenshot({ path: 'test-results/accordion-mobile.png' });
});

test('shows toast variants with accessible contrast and closes each notification', async ({
  page,
}) => {
  for (const variant of ['default', 'success', 'error', 'warning', 'flight']) {
    await page.getByRole('button', { name: `Mostrar ${variant}`, exact: true }).click();
    const toast = page.locator('.toast');

    await expect(toast).toHaveCount(1);
    await expect(toast).toBeVisible();
    await expect(toast).toContainText(`Notificação ${variant}`);
    await expect(page.locator('.toast-viewport')).toBeVisible();
    await expect(page.getByRole('region', { name: 'Notificações (F8)' })).toContainText(
      `Notificação ${variant}`,
    );
    expect(
      (await new AxeBuilder({ page }).include('.toast-viewport').analyze()).violations,
    ).toEqual([]);
    await toast.getByRole('button', { name: 'Fechar notificação' }).click();
    await expect(toast).toHaveCount(0);
  }
});

test('pauses automatic toast dismissal over the viewport and resumes after leaving', async ({
  page,
}) => {
  await page.bringToFront();
  await page.getByRole('button', { name: 'Mostrar notificação temporária', exact: true }).click();
  const toast = page.locator('.toast');

  await toast.hover();
  // Wait longer than the configured 450 ms to verify that interaction pauses the timer.
  await page.waitForTimeout(700);
  await expect(toast).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(toast).toHaveCount(0);
});

test('supports the toast hotkey, optional action, Escape and swipe on narrow screens', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addStyleTag({ content: 'html { font-size: 125%; }' });
  await page.getByRole('button', { name: 'Mostrar success', exact: true }).click();
  await page.keyboard.press('F8');
  await expect(page.locator('.toast-viewport')).toBeFocused();
  await page.locator('.toast').getByRole('button', { name: 'Repetir ação' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Ações executadas')).toHaveText('1');
  await expect(page.locator('.toast')).toHaveCount(0);
  await page.getByRole('button', { name: 'Mostrar error', exact: true }).click();
  await page.locator('.toast').focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('.toast')).toHaveCount(0);
  await page.getByRole('button', { name: 'Mostrar flight', exact: true }).click();
  const toast = page.locator('.toast');
  const box = await toast.boundingBox();

  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/toast-mobile.png' });
  await page.mouse.move(box!.x + 30, box!.y + 30);
  await page.mouse.down();
  await page.mouse.move(box!.x + 210, box!.y + 30, { steps: 5 });
  await page.mouse.up();
  await expect(toast).toHaveCount(0);
});
