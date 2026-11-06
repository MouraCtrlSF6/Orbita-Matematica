import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
import { test } from './rooms-fixture';

async function openQuestions(page: Page) {
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await page.getByRole('tab', { name: 'Questões', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: /Estação de lançamento · 22 questões/ }),
  ).toBeVisible();
}

test('opens a separate creation view and preserves drafts and list expansion on return', async ({
  page,
}) => {
  await openQuestions(page);
  const sector = page.getByRole('button', { name: /Estação de lançamento · 22 questões/ });
  await sector.click();
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  const title = page.getByRole('heading', { name: 'Adicionar Questão', exact: true });

  await expect(title).toBeFocused();
  await expect(page.getByRole('region', { name: 'Adicionar questão', exact: true })).toBeVisible();
  expect(
    await page
      .getByRole('region', { name: 'Adicionar questão', exact: true })
      .locator('..')
      .evaluate((element) => getComputedStyle(element).transitionProperty),
  ).toContain('translate');
  await expect(page.getByRole('tab', { name: 'Questões', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(sector).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Recarregar questões' })).toBeHidden();
  await page.getByLabel('Título', { exact: true }).fill('Meu rascunho');
  await page.getByRole('tab', { name: 'Alunos', exact: true }).click();
  await page.getByRole('tab', { name: 'Questões', exact: true }).click();
  await expect(page.getByLabel('Título', { exact: true })).toHaveValue('Meu rascunho');
  const back = page.getByRole('button', { name: 'Voltar para a listagem de questões' });

  await back.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Questões', exact: true })).toBeFocused();
  await expect(page.getByRole('region', { name: 'Adicionar questão', exact: true })).toHaveCount(0);
  await expect(sector).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  await expect(page.getByLabel('Título', { exact: true })).toHaveValue('Meu rascunho');
});

test('keeps failed submissions editable and shows the saved question after returning', async ({
  page,
}) => {
  await openQuestions(page);
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  await page.getByRole('combobox', { name: 'Formato', exact: true }).click();
  await page.getByRole('option', { name: 'Discursiva', exact: true }).click();
  for (const [label, value] of [
    ['Título', 'Nova questão'],
    ['Enunciado', 'Quanto é 2 + 2?'],
    ['Resposta esperada', '4'],
    ['Explicação da resposta', 'A soma de dois com dois é quatro.'],
  ])
    await page.getByLabel(label, { exact: true }).fill(value);
  await page.evaluate(() => localStorage.setItem('mock-catalog-write-error', 'true'));
  await page.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Falha ao salvar questões.');
  await expect(page.getByLabel('Título', { exact: true })).toHaveValue('Nova questão');
  await page.evaluate(() => localStorage.removeItem('mock-catalog-write-error'));
  await page.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Questão adicionada.');
  await expect(page.getByLabel('Título', { exact: true })).toBeEmpty();
  await page.getByRole('button', { name: 'Voltar para a listagem de questões' }).click();
  await page.getByRole('button', { name: /Estação de lançamento · 23 questões/ }).click();
  await expect(
    page.getByRole('button', { name: 'Nova questão · Discursiva', exact: true }),
  ).toBeVisible();
});

test('supports reduced motion, narrow screens and accessible creation controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await openQuestions(page);
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  const form = page.getByRole('region', { name: 'Adicionar questão', exact: true });

  for (const width of [390, 700, 1000, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expect(form).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.screenshot({ path: test.info().outputPath(`add-question-${width}.png`) });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => {
    document.documentElement.style.fontSize = '125%';
  });
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  expect(
    await form.locator('..').evaluate((element) => getComputedStyle(element).transitionDuration),
  ).toBe('0s');
  await page.getByRole('button', { name: 'Voltar para a listagem de questões' }).click();
  await expect(page.getByRole('heading', { name: 'Questões', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
