import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
import { enterRoom, mockRoomBackend, test } from './rooms-fixture';

async function openTeacherQuestions(page: Page) {
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await page.getByRole('tab', { name: 'Questões', exact: true }).click();
  await expectSectorCount(page, 'Estação de lançamento', 22);
}

async function expectSectorCount(page: Page, sector: string, count: number) {
  const back = page.getByRole('button', { name: 'Voltar para a listagem de questões' });

  if (await back.isVisible()) await back.click();
  await expect(
    page.getByRole('heading', { name: new RegExp(sector + ' · ' + count + ' questões$') }),
  ).toBeVisible();
}

async function fillQuestion(page: Page, title: string, kind: string) {
  const form = page
    .locator('form')
    .filter({ has: page.getByRole('button', { name: 'Adicionar questão à sala' }) });

  if (!(await form.isVisible()))
    await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  const formats: Record<string, string> = {
    choice: 'Objetiva',
    number: 'Discursiva',
    build: 'Montagem de expressão',
    create: 'Criação guiada',
  };

  await page.getByRole('combobox', { name: 'Formato', exact: true }).click();
  await page.getByRole('option', { name: formats[kind], exact: true }).click();
  for (const [label, value] of [
    ['Título', title],
    ['Enunciado', 'Calcule o total da expedição.'],
    ['Objetivo', 'Calcular expressões'],
    ['Habilidade', 'EF08MA06'],
    ['Explicação da resposta', 'Faça as operações na ordem.'],
  ])
    await form.getByLabel(label, { exact: true }).fill(value);
  if (kind === 'number') await form.getByLabel('Resposta esperada', { exact: true }).fill('0');
  if (kind === 'choice') {
    await form.getByLabel('Alternativa 1', { exact: true }).fill('0');
    await form.getByLabel('Alternativa 2', { exact: true }).fill('1');
  }
  return form;
}

async function joinReadyStudent(page: Page) {
  await mockRoomBackend(page);
  await page.goto('/students');
  await page.evaluate(() => {
    const roomId = localStorage.getItem('mock-room-id');
    sessionStorage.setItem(
      `orbita-matematica:v1:room:${roomId}`,
      JSON.stringify({
        version: 1,
        completed: {},
        tutorialDone: true,
        lastMissionId: null,
        preferences: { largeText: false, reducedMotion: true, soundEnabled: false },
      }),
    );
  });
  await enterRoom(page);
}

test('switches teacher tabs with arrow keys and labels the active panel', async ({ page }) => {
  await openTeacherQuestions(page);
  const questions = page.getByRole('tab', { name: 'Questões', exact: true });
  const students = page.getByRole('tab', { name: 'Alunos', exact: true });

  await expect(page.getByRole('tablist', { name: 'Seções da sala' })).toBeVisible();
  await expect(page.getByRole('code')).toHaveText('turma teste');
  await expect(page.getByRole('navigation', { name: 'Localização atual' })).toHaveCount(0);
  await questions.focus();
  await page.keyboard.press('ArrowLeft');
  await expect(students).toBeFocused();
  await expect(students).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel', { name: 'Alunos' })).toContainText(
    'Registros de alunos: 0',
  );
  await expect(page.getByRole('tabpanel', { name: 'Questões' })).toBeHidden();
  await page.keyboard.press('ArrowRight');
  await expect(questions).toBeFocused();
  await expect(questions).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('button', { name: 'Recarregar questões' })).toBeVisible();
  await expect(page.getByRole('tabpanel', { name: 'Alunos' })).toBeHidden();
});

test('adds all four formats, validates builds and confirms removal', async ({ page }) => {
  await openTeacherQuestions(page);
  const choice = await fillQuestion(page, 'Questão de alternativas', 'choice');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: test.info().outputPath('teacher-questions.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await choice.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Questão adicionada.' })).toHaveText(
    'Questão adicionada.',
  );
  await expectSectorCount(page, 'Estação de lançamento', 23);

  const number = await fillQuestion(page, 'Questão numérica', 'number');
  await number.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expectSectorCount(page, 'Estação de lançamento', 24);

  const build = await fillQuestion(page, 'Questão de montagem', 'build');
  for (const token of ['x', '+', '2', '7']) {
    await build.getByLabel('Peças disponíveis', { exact: true }).fill(token);
    await build.getByRole('button', { name: 'Adicionar componente', exact: true }).click();
  }
  const order = build.locator('input[name="expectedTokens"]').locator('..');
  for (const token of ['x', '+', '2'])
    await order.getByRole('button', { name: 'Adicionar peça ' + token, exact: true }).click();
  await build.getByRole('button', { name: 'Adicionar ordem equivalente', exact: true }).click();
  const equivalent = build.locator('input[name="equivalentTokens"]').locator('..');
  for (const token of ['2', '+', 'x'])
    await equivalent.getByRole('button', { name: 'Adicionar peça ' + token, exact: true }).click();
  await build.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expectSectorCount(page, 'Estação de lançamento', 25);

  const create = await fillQuestion(page, 'Questão de criação', 'create');
  await create.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expectSectorCount(page, 'Estação de lançamento', 26);
  await page.getByRole('button', { name: /Estação de lançamento · 26 questões/ }).click();
  const question = page
    .getByRole('button', { name: 'Questão de criação · Criação guiada', exact: true })
    .locator('xpath=ancestor::*[@data-accordion-value][1]');
  await question
    .getByRole('button', { name: 'Questão de criação · Criação guiada', exact: true })
    .click();
  await expect(question.getByText('Resposta esperada:', { exact: false })).toContainText(
    'x = 3 → 10',
  );
  await question.getByRole('button', { name: 'Excluir questão', exact: true }).click();
  await page.getByRole('dialog').getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(question).toHaveCount(1);
  await question.getByRole('button', { name: 'Excluir questão', exact: true }).click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Excluir questão', exact: true })
    .click();
  await expectSectorCount(page, 'Estação de lançamento', 25);
  await page.getByRole('tab', { name: 'Alunos', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Registros de alunos: 0' })).toHaveText(
    'Registros de alunos: 0',
  );
});

test('keeps the student snapshot until reentry and loads changed questions once', async ({
  page,
  context,
}) => {
  await openTeacherQuestions(page);
  const student = await context.newPage();
  await joinReadyStudent(student);
  await expect(student.locator('.exploration-count')).toContainText('/ 52');
  await page.getByRole('button', { name: /Estação de lançamento · 22 questões/ }).click();
  await page.getByText('Adição · exercício 1 · Objetiva', { exact: true }).click();
  await page.getByRole('button', { name: 'Excluir questão', exact: true }).click();
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Excluir questão', exact: true })
    .click();
  await expect(page.getByRole('status').filter({ hasText: 'Questão excluída.' })).toHaveText(
    'Questão excluída.',
  );
  await expect(student.locator('.exploration-count')).toContainText('/ 52');
  await student.getByRole('link', { name: 'Sair da sala' }).click();
  await student.getByRole('link', { name: 'Sou aluno' }).click();
  await enterRoom(student);
  await expect(student.locator('.exploration-count')).toContainText('/ 51');
  await student.close();
});

test('selects a sector with the shared control and resets it after saving', async ({ page }) => {
  await openTeacherQuestions(page);
  const form = await fillQuestion(page, 'Questão da base', 'number');
  const sector = form.getByRole('combobox', { name: 'Setor', exact: true });

  await sector.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('option', { name: /Estação de lançamento/ })).toBeFocused();
  await page.keyboard.press('End');
  await expect(page.getByRole('option', { name: /Base de exploração/ })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(sector).toContainText('Base de exploração');
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(sector).toContainText('Estação de lançamento');
  await expectSectorCount(page, 'Base de exploração', 16);
});

test('preserves the form on write failure and allows retrying load and save', async ({ page }) => {
  await openTeacherQuestions(page);
  await page.evaluate(() => localStorage.setItem('mock-catalog-write-error', 'true'));
  const form = await fillQuestion(page, 'Questão para repetir', 'number');
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Falha ao salvar questões.');
  await expect(form.getByLabel('Título', { exact: true })).toHaveValue('Questão para repetir');
  await page.evaluate(() => localStorage.removeItem('mock-catalog-write-error'));
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expectSectorCount(page, 'Estação de lançamento', 23);
  await page.evaluate(() => localStorage.setItem('mock-catalog-read-error', 'true'));
  await page.getByRole('button', { name: 'Recarregar questões' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Não foi possível carregar');
  await page.evaluate(() => localStorage.removeItem('mock-catalog-read-error'));
  await page.getByRole('button', { name: 'Recarregar questões' }).click();
  await expectSectorCount(page, 'Estação de lançamento', 23);
});

test('plays and restores a custom question using only the room catalog', async ({
  page,
  context,
}) => {
  await openTeacherQuestions(page);
  const form = await fillQuestion(page, 'Questão exclusiva da sala', 'number');
  await form.getByLabel('Resposta esperada', { exact: true }).fill('2x');
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Questão adicionada.' })).toHaveText(
    'Questão adicionada.',
  );
  await page.evaluate(() => {
    const key = `mock-catalog-${localStorage.getItem('mock-room-id')}`;
    const catalog = JSON.parse(localStorage.getItem(key)!);

    catalog.missions = catalog.missions.filter((mission: { id: string }) =>
      mission.id.startsWith('custom-'),
    );
    localStorage.setItem(key, JSON.stringify(catalog));
  });
  const student = await context.newPage();
  await joinReadyStudent(student);
  await student.getByRole('button', { name: 'Retomar exploração', exact: true }).click();
  await student.getByText('Destinos em lista', { exact: true }).click();
  await student
    .getByRole('button')
    .filter({ has: student.getByText('Questão exclusiva da sala', { exact: true }) })
    .click();
  await expect(student.getByRole('button', { name: 'Ver com objetos' })).toHaveCount(0);
  await expect(student.getByText('Objetivo:', { exact: false })).toHaveCount(0);
  await student.getByRole('textbox', { name: 'Sua resposta', exact: true }).fill('x+x');
  await student.getByRole('button', { name: 'Conferir resposta' }).click();
  await expect(
    student.getByText('Ainda não chegamos ao resultado.', { exact: false }),
  ).toBeVisible();
  await student.getByRole('textbox', { name: 'Sua resposta', exact: true }).fill(' 2X ');
  await student.getByRole('button', { name: 'Conferir resposta' }).click();
  await expect(student.getByText('Boa descoberta! Você concluiu a missão.')).toBeVisible();
  await student.getByRole('link', { name: 'Sair da sala' }).click();
  await student.getByRole('link', { name: 'Sou aluno' }).click();
  await enterRoom(student);
  await expect(student.locator('.exploration-count')).toHaveText('1 / 1 descobertas');
  await student.close();
});

test('supports a completely empty room and prevents joining when questions cannot load', async ({
  page,
  context,
}) => {
  await openTeacherQuestions(page);
  await page.evaluate(() => {
    const key = `mock-catalog-${localStorage.getItem('mock-room-id')}`;

    localStorage.setItem(key, JSON.stringify({ revision: 1, missions: [] }));
    localStorage.setItem('mock-catalog-read-error', 'true');
  });
  const student = await context.newPage();
  await mockRoomBackend(student);
  let registrations = 0;
  await student.exposeFunction('recordStudentRegistration', () => {
    registrations++;
  });
  await student.goto('/students');
  await enterRoom(student);
  await expect(student.getByRole('alert')).toContainText('Não foi possível entrar');
  expect(registrations).toBe(0);
  await page.evaluate(() => localStorage.removeItem('mock-catalog-read-error'));
  await joinReadyStudent(student);
  await expect(student.locator('.exploration-count')).toHaveText('0 / 0 descobertas');
  await student.getByRole('button', { name: 'Explorar novamente', exact: true }).click();
  await expect(
    student.getByText('Este setor está sem questões nesta sala.', { exact: false }),
  ).toBeVisible();
  expect(registrations).toBe(1);
  await student.close();
});

test('preserves format drafts, validates closed sections and supports optional aids', async ({
  page,
}) => {
  await openTeacherQuestions(page);
  const form = await fillQuestion(page, 'Rascunho de questão', 'choice');
  const format = form.getByRole('combobox', { name: 'Formato', exact: true });

  await form.getByRole('button', { name: 'Adicionar alternativa', exact: true }).click();
  await form.getByLabel('Alternativa 3', { exact: true }).fill('2');
  await form.getByRole('radio', { name: 'Alternativa 3 correta', exact: true }).check();
  await form.getByRole('button', { name: 'Excluir alternativa 3', exact: true }).click();
  await form.getByRole('button', { name: 'Alternativas', exact: true }).click();
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(form.getByRole('button', { name: 'Alternativas', exact: true })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(
    form.getByRole('radio', { name: 'Alternativa 1 correta', exact: true }),
  ).toBeFocused();
  await form.getByRole('radio', { name: 'Alternativa 2 correta', exact: true }).check();
  await format.click();
  await page.getByRole('option', { name: 'Discursiva', exact: true }).click();
  await form.getByLabel('Resposta esperada', { exact: true }).fill('2x');
  await format.click();
  await page.getByRole('option', { name: 'Objetiva', exact: true }).click();
  await expect(form.getByLabel('Alternativa 2', { exact: true })).toHaveValue('1');
  await expect(
    form.getByRole('radio', { name: 'Alternativa 2 correta', exact: true }),
  ).toBeChecked();
  await format.click();
  await page.getByRole('option', { name: 'Discursiva', exact: true }).click();
  await expect(form.getByLabel('Resposta esperada', { exact: true })).toHaveValue('2x');
  await form.getByRole('button', { name: 'Dicas (opcional)', exact: true }).click();
  await form.getByLabel('Dica 1', { exact: true }).fill('Some os termos semelhantes.');
  await form.getByRole('button', { name: 'Adicionar dica', exact: true }).click();
  await form.getByRole('button', { name: 'Adicionar dica', exact: true }).click();
  await expect(form.getByRole('button', { name: 'Adicionar dica', exact: true })).toBeDisabled();
  await form.getByRole('button', { name: 'Dicas (opcional)', exact: true }).click();
  await form.getByRole('button', { name: 'Dicas (opcional)', exact: true }).click();
  await expect(form.getByLabel('Dica 1', { exact: true })).toHaveValue(
    'Some os termos semelhantes.',
  );
  await form.getByRole('button', { name: 'Objetos visuais (opcional)', exact: true }).click();
  await form.getByRole('checkbox', { name: 'Incluir apoio visual', exact: true }).check();
  await expect(form.getByRole('region', { name: 'Representação com objetos' })).toBeVisible();
  await form.getByLabel('Objetivo', { exact: true }).clear();
  await form.getByLabel('Habilidade', { exact: true }).clear();
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Questão adicionada.' })).toHaveText(
    'Questão adicionada.',
  );
  const saved = await page.evaluate(() => {
    const catalog = JSON.parse(
      localStorage.getItem('mock-catalog-' + localStorage.getItem('mock-room-id'))!,
    );
    return catalog.missions.find((mission: { id: string }) => mission.id.startsWith('custom-'));
  });

  expect(saved.kind).toBe('text');
  expect(saved.expectedAnswer).toBe('2x');
  expect(saved.choices).toBeUndefined();
  expect(saved.expression).toBeUndefined();
  expect(saved.hints).toEqual(['Some os termos semelhantes.']);
});

test('lays out the form at all reference widths and assembles with touch controls', async ({
  page,
}) => {
  await openTeacherQuestions(page);
  const form = await fillQuestion(page, 'Montagem responsiva', 'build');

  for (const token of ['2', '+', 'x', '7']) {
    await form.getByLabel('Peças disponíveis', { exact: true }).fill(token);
    await form.getByRole('button', { name: 'Adicionar componente', exact: true }).click();
  }
  const order = form.locator('input[name="expectedTokens"]').locator('..').locator('..');
  for (const token of ['2', '+', 'x'])
    await order.getByRole('button', { name: 'Adicionar peça ' + token, exact: true }).click();
  await order.getByRole('button', { name: 'Selecionar peça 3: x', exact: true }).click();
  await order.getByRole('button', { name: 'Mover peça para a esquerda', exact: true }).click();
  await order.getByRole('button', { name: 'Mover peça para a direita', exact: true }).click();
  for (const width of [390, 700, 1000, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await form.screenshot({ path: test.info().outputPath('question-form-' + width + '.png') });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => (document.documentElement.style.fontSize = '125%'));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Questão adicionada.' })).toHaveText(
    'Questão adicionada.',
  );
});
