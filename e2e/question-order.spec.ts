import { expect } from '@playwright/test';
import { test } from './rooms-fixture';

async function openQuestions(page: import('@playwright/test').Page) {
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await page.getByRole('tab', { name: 'Quest\u00f5es', exact: true }).click();
  await page.getByRole('button', { name: /Esta\u00e7\u00e3o de lan\u00e7amento/ }).click();
  return page.getByRole('group', { name: 'Quest\u00f5es do setor', exact: true });
}

test('persists keyboard reordering and preserves the previous order on failure', async ({
  page,
}) => {
  const list = await openQuestions(page);
  const first = list.locator('[data-accordion-value]').first();
  const id = await first.getAttribute('data-accordion-value');
  const handle = first.getByRole('button', { name: /^Arrastar/ });

  await handle.focus();
  await page.keyboard.press('ArrowDown');
  await expect(list.locator('[data-accordion-value]').nth(1)).toHaveAttribute(
    'data-accordion-value',
    id!,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.evaluate(() => localStorage.setItem('mock-catalog-write-error', 'true'));
  await handle.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('alert')).toContainText('Falha ao salvar');
  await expect(list.locator('[data-accordion-value]').nth(1)).toHaveAttribute(
    'data-accordion-value',
    id!,
  );
  await page.evaluate(() => localStorage.removeItem('mock-catalog-write-error'));
  await page.getByRole('button', { name: 'Recarregar quest\u00f5es' }).click();
  await page.getByRole('button', { name: /Esta\u00e7\u00e3o de lan\u00e7amento/ }).click();
  await expect(list.locator('[data-accordion-value]').nth(1)).toHaveAttribute(
    'data-accordion-value',
    id!,
  );
});

test('cancels pointer dragging with Escape and saves when dropped on another question', async ({
  page,
}) => {
  const list = await openQuestions(page);
  const first = list.locator('[data-accordion-value]').first();
  const id = await first.getAttribute('data-accordion-value');
  const handle = first.getByRole('button', { name: /^Arrastar/ });
  const origin = (await handle.boundingBox())!;
  const target = (await list.locator('[data-accordion-value]').nth(1).boundingBox())!;
  const x = origin.x + origin.width / 2;
  const y = origin.y + origin.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 5 });
  await page.keyboard.press('Escape');
  await page.mouse.up();
  await expect(first).toHaveAttribute('data-accordion-value', id!);
  await expect(first).toHaveCSS('transform', 'none');
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, { steps: 5 });
  await page.mouse.up();
  await expect(list.locator('[data-accordion-value]').nth(1)).toHaveAttribute(
    'data-accordion-value',
    id!,
  );
});
