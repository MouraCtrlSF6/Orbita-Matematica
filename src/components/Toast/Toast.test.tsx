import { createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, beforeAll, expect, it, vi } from 'vitest';
import { Toast } from './Toast';
import { ToastProvider } from './ToastProvider/ToastProvider';

const pointerCaptureDescriptor = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'hasPointerCapture',
);

beforeAll(() => {
  // JSDOM does not implement the pointer-capture API used by Radix swipe handling.
  Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
    configurable: true,
    value: () => false,
  });
});

afterAll(() => {
  if (pointerCaptureDescriptor)
    Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', pointerCaptureDescriptor);
  else Reflect.deleteProperty(HTMLElement.prototype, 'hasPointerCapture');
});

it('renders its title and description, forwards the root ref and closes manually', async () => {
  const ref = createRef<HTMLLIElement>();

  render(
    <ToastProvider>
      <Toast
        ref={ref}
        title="Questão salva"
        description="As alterações foram registradas."
        data-testid="toast"
      />
    </ToastProvider>,
  );
  const toast = await screen.findByTestId('toast');

  expect(toast).toHaveTextContent('Questão salva');
  expect(toast).toHaveTextContent('As alterações foram registradas.');
  expect(ref.current).toBe(toast);
  expect(screen.getByRole('region', { name: 'Notificações (F8)' })).toContainElement(toast);
  await userEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }));
  await waitFor(() => expect(screen.queryByTestId('toast')).not.toBeInTheDocument());
});

it('keeps controlled state owned by the caller', async () => {
  const change = vi.fn();
  const { rerender } = render(
    <ToastProvider>
      <Toast title="Questão salva" open onOpenChange={change} data-testid="toast" />
    </ToastProvider>,
  );

  await screen.findByTestId('toast');
  await userEvent.click(screen.getByRole('button', { name: 'Fechar notificação' }));
  expect(change).toHaveBeenCalledWith(false);
  expect(screen.getByTestId('toast')).toBeInTheDocument();
  rerender(
    <ToastProvider>
      <Toast title="Questão salva" open={false} onOpenChange={change} data-testid="toast" />
    </ToastProvider>,
  );
  await waitFor(() => expect(screen.queryByTestId('toast')).not.toBeInTheDocument());
});

it('executes its optional action once and dismisses the toast', async () => {
  const action = vi.fn();

  render(
    <ToastProvider>
      <Toast
        title="Tente novamente"
        data-testid="toast"
        action={{
          label: 'Repetir',
          altText: 'Você também pode repetir pelo formulário.',
          onClick: action,
        }}
      />
    </ToastProvider>,
  );
  await screen.findByTestId('toast');
  await userEvent.click(screen.getByRole('button', { name: 'Repetir' }));
  expect(action).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(screen.queryByTestId('toast')).not.toBeInTheDocument());
});

it('supports a localized custom viewport in a portal container', async () => {
  const container = document.createElement('div');

  document.body.append(container);
  const { unmount } = render(
    <ToastProvider
      portalContainer={container}
      viewportProps={{ label: 'Avisos ({hotkey})', hotkey: ['F9'] }}
    >
      <Toast title="Aviso" data-testid="toast" />
    </ToastProvider>,
  );

  expect(container).toContainElement(await screen.findByTestId('toast'));
  expect(screen.getByRole('region', { name: 'Avisos (F9)' })).toBeInTheDocument();
  unmount();
  container.remove();
});

it.each([
  ['foreground', 'assertive'],
  ['background', 'polite'],
] as const)('announces %s notifications using %s priority', async (type, live) => {
  render(
    <ToastProvider>
      <Toast title="Atualização disponível" type={type} />
    </ToastProvider>,
  );
  expect(await screen.findByRole('status')).toHaveAttribute('aria-live', live);
});
