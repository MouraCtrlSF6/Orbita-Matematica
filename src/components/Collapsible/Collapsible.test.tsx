import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Collapsible } from './Collapsible';
import { CollapsibleVariant } from './collapsible-styles';

it.each(Object.values(CollapsibleVariant))(
  'supports keyboard toggling and linked content with variant %s',
  async (variant) => {
    const user = userEvent.setup();

    render(
      <Collapsible title="Detalhes" variant={variant}>
        <p>Conteúdo da seção</p>
      </Collapsible>,
    );
    const trigger = screen.getByRole('button', { name: 'Detalhes' });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Conteúdo da seção')).not.toBeInTheDocument();
    await user.tab();
    await user.keyboard('{Enter}');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(trigger.getAttribute('aria-controls')!)).toHaveTextContent(
      'Conteúdo da seção',
    );
    await user.keyboard(' ');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  },
);

it('keeps controlled state owned by the caller and forwards part refs', async () => {
  const change = vi.fn();
  const triggerRef = createRef<HTMLButtonElement>();
  const contentRef = createRef<HTMLDivElement>();
  const { rerender } = render(
    <Collapsible
      title="Detalhes"
      open={false}
      onOpenChange={change}
      triggerProps={{ ref: triggerRef }}
      contentProps={{ ref: contentRef }}
    >
      Conteúdo
    </Collapsible>,
  );

  await userEvent.click(screen.getByRole('button'));
  expect(change).toHaveBeenCalledWith(true);
  expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  expect(triggerRef.current).toBe(screen.getByRole('button'));
  rerender(
    <Collapsible title="Detalhes" open onOpenChange={change} contentProps={{ ref: contentRef }}>
      Conteúdo
    </Collapsible>,
  );
  expect(contentRef.current).toHaveTextContent('Conteúdo');
});

it('does not toggle a disabled trigger or submit its surrounding form', async () => {
  const change = vi.fn();
  const submit = vi.fn();
  const { rerender } = render(
    <form onSubmit={submit}>
      <Collapsible title="Detalhes" disabled onOpenChange={change}>
        Conteúdo
      </Collapsible>
    </form>,
  );

  await userEvent.click(screen.getByRole('button'));
  expect(change).not.toHaveBeenCalled();
  rerender(
    <form onSubmit={submit}>
      <Collapsible title="Detalhes" onOpenChange={change}>
        Conteúdo
      </Collapsible>
    </form>,
  );
  await userEvent.click(screen.getByRole('button'));
  expect(change).toHaveBeenCalledWith(true);
  expect(submit).not.toHaveBeenCalled();
});

it('preserves nested expansion and input values when keeping the content mounted', async () => {
  render(
    <Collapsible title="Aluno" keepMounted>
      <Collapsible title="Setor" keepMounted>
        <input aria-label="Anotação" />
      </Collapsible>
    </Collapsible>,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Aluno' }));
  await userEvent.click(screen.getByRole('button', { name: 'Setor' }));
  await userEvent.type(screen.getByRole('textbox'), 'Observação');
  await userEvent.click(screen.getByRole('button', { name: 'Aluno' }));
  await userEvent.click(screen.getByRole('button', { name: 'Aluno' }));
  expect(screen.getByRole('button', { name: 'Setor' })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByRole('textbox')).toHaveValue('Observação');
});
