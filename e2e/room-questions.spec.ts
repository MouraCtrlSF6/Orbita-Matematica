import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';
import { enterRoom, mockRoomBackend, test } from './rooms-fixture';

async function openTeacherQuestions(page: Page) {
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await page.getByRole('button', { name: 'Questões', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 22 questões' }),
  ).toBeVisible();
}

async function fillQuestion(page: Page, title: string, kind: string) {
  const form = page
    .locator('form')
    .filter({ has: page.getByRole('button', { name: 'Adicionar questão à sala' }) });

  if (!(await form.isVisible())) await page.getByText('Adicionar questão', { exact: true }).click();
  await page.getByLabel('Formato', { exact: true }).selectOption(kind);
  for (const [label, value] of [
    ['Título', title],
    ['Enunciado', 'Calcule o total da expedição.'],
    ['Objetivo', 'Calcular expressões'],
    ['Habilidade', 'EF08MA06'],
    ['Dica 1', 'Observe os números.'],
    ['Dica 2', 'Substitua x.'],
    ['Dica 3', 'Confira as operações.'],
    ['Explicação', 'Faça as operações na ordem.'],
    ['Descrição dos objetos visuais', 'Cristais'],
  ])
    await form.getByLabel(label, { exact: true }).fill(value);
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

test('adds all four formats, validates builds and confirms removal', async ({ page }) => {
  await openTeacherQuestions(page);
  const choice = await fillQuestion(page, 'Questão de alternativas', 'choice');
  await choice.getByLabel('Alternativas, uma por linha').fill('0\n1');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: test.info().outputPath('teacher-questions.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await choice.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Questão adicionada.');
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 23 questões' }),
  ).toBeVisible();

  const number = await fillQuestion(page, 'Questão numérica', 'number');
  await number.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 24 questões' }),
  ).toBeVisible();

  const build = await fillQuestion(page, 'Questão de montagem', 'build');
  await build.getByLabel('Tipo de expressão', { exact: true }).selectOption('operation');
  await build.getByLabel('Tipo de expressão esquerda', { exact: true }).selectOption('variable');
  await build.getByLabel('Valor de expressão direita', { exact: true }).fill('2');
  await build.getByLabel('Peças disponíveis').fill('x | + | 2');
  await build.getByLabel('Ordem correta das peças').fill('x | + | 2');
  await build.getByLabel('Outras ordens equivalentes, uma por linha').fill('2 | + | x');
  await build.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 25 questões' }),
  ).toBeVisible();

  const create = await fillQuestion(page, 'Questão de criação', 'create');
  await create.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 26 questões' }),
  ).toBeVisible();
  const question = page.locator('.collapsible').filter({
    has: page.getByRole('button', { name: 'Questão de criação · Criação guiada', exact: true }),
  });
  await question
    .getByRole('button', { name: 'Questão de criação · Criação guiada', exact: true })
    .click();
  await expect(question.getByText('Resposta esperada:', { exact: false })).toContainText(
    'x = 3 → 10',
  );
  page.once('dialog', (dialog) => void dialog.dismiss());
  await question
    .getByRole('button', { name: 'Excluir questão Questão de criação', exact: true })
    .click();
  await expect(question).toHaveCount(1);
  page.once('dialog', (dialog) => void dialog.accept());
  await question
    .getByRole('button', { name: 'Excluir questão Questão de criação', exact: true })
    .click();
  await expect(page.getByRole('status')).toHaveText('Questão excluída.');
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 25 questões' }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Alunos', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 0');
});

test('keeps the student snapshot until reentry and loads changed questions once', async ({
  page,
  context,
}) => {
  await openTeacherQuestions(page);
  const student = await context.newPage();
  await joinReadyStudent(student);
  await expect(student.locator('.exploration-count')).toContainText('/ 52');
  await page.getByText('Adição · exercício 1 · Alternativas', { exact: true }).click();
  page.once('dialog', (dialog) => void dialog.accept());
  await page
    .getByRole('button', { name: 'Excluir questão Adição · exercício 1', exact: true })
    .click();
  await expect(page.getByRole('status')).toHaveText('Questão excluída.');
  await expect(student.locator('.exploration-count')).toContainText('/ 52');
  await student.getByRole('link', { name: 'Sair da sala' }).click();
  await student.getByRole('link', { name: 'Sou aluno' }).click();
  await enterRoom(student);
  await expect(student.locator('.exploration-count')).toContainText('/ 51');
  await student.close();
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
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 23 questões' }),
  ).toBeVisible();
  await page.evaluate(() => localStorage.setItem('mock-catalog-read-error', 'true'));
  await page.getByRole('button', { name: 'Recarregar questões' }).click();
  await expect(page.getByRole('alert').first()).toContainText('Não foi possível carregar');
  await page.evaluate(() => localStorage.removeItem('mock-catalog-read-error'));
  await page.getByRole('button', { name: 'Recarregar questões' }).click();
  await expect(
    page.getByRole('heading', { name: 'Estação de lançamento · 23 questões' }),
  ).toBeVisible();
});

test('plays and restores a custom question using only the room catalog', async ({
  page,
  context,
}) => {
  await openTeacherQuestions(page);
  const form = await fillQuestion(page, 'Questão exclusiva da sala', 'number');
  await form.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Questão adicionada.');
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
  await student.getByRole('textbox', { name: 'Qual é o total?', exact: true }).fill('0');
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
