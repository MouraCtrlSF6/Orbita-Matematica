import { createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Accordion } from './Accordion';

const items = [
  { value: 'mission', title: 'Missão', content: 'Enunciado da missão' },
  { value: 'disabled', title: 'Indisponível', content: 'Conteúdo indisponível', disabled: true },
  { value: 'support', title: 'Apoios', content: 'Dicas da missão' },
];

it('opens only one section and allows closing it when collapsible', async () => {
  render(<Accordion label="Expedição" type="single" collapsible items={items} />);
  await userEvent.click(screen.getByRole('button', { name: 'Missão' }));
  expect(screen.getByRole('region', { name: 'Missão' })).toHaveTextContent('Enunciado da missão');
  await userEvent.click(screen.getByRole('button', { name: 'Apoios' }));
  expect(screen.queryByText('Enunciado da missão')).not.toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Apoios' })).toHaveTextContent('Dicas da missão');
  await userEvent.click(screen.getByRole('button', { name: 'Apoios' }));
  expect(screen.queryByRole('region')).not.toBeInTheDocument();
});

it('keeps the selected single section open unless collapsing is enabled', async () => {
  render(<Accordion label="Expedição" type="single" defaultValue="mission" items={items} />);
  const trigger = screen.getByRole('button', { name: 'Missão' });

  expect(trigger).toHaveAttribute('aria-disabled', 'true');
  await userEvent.click(trigger);
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
});

it('supports independent expansion in multiple mode', async () => {
  render(<Accordion label="Expedição" type="multiple" defaultValue={['mission']} items={items} />);
  await userEvent.click(screen.getByRole('button', { name: 'Apoios' }));
  expect(screen.getAllByRole('region')).toHaveLength(2);
  await userEvent.click(screen.getByRole('button', { name: 'Missão' }));
  expect(screen.getByRole('region', { name: 'Apoios' })).toHaveTextContent('Dicas da missão');
  expect(screen.queryByRole('region', { name: 'Missão' })).not.toBeInTheDocument();
});

it('navigates headings with arrows, Home and End while skipping disabled sections', async () => {
  const user = userEvent.setup();

  render(<Accordion label="Expedição" type="single" heading="h2" items={items} />);
  expect(screen.getByRole('heading', { name: 'Missão', level: 2 })).toBeInTheDocument();
  await user.tab();
  await user.keyboard('{ArrowDown}');
  await waitFor(() => expect(screen.getByRole('button', { name: 'Apoios' })).toHaveFocus());
  await user.keyboard('{Home}');
  await waitFor(() => expect(screen.getByRole('button', { name: 'Missão' })).toHaveFocus());
  await user.keyboard('{End}');
  await waitFor(() => expect(screen.getByRole('button', { name: 'Apoios' })).toHaveFocus());
});

it('keeps single selection controlled by the caller and forwards root refs', async () => {
  const change = vi.fn();
  const ref = createRef<HTMLDivElement>();
  const { rerender } = render(
    <Accordion
      ref={ref}
      label="Expedição"
      type="single"
      value="mission"
      onValueChange={change}
      items={items}
    />,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Apoios' }));
  expect(change).toHaveBeenCalledWith('support');
  expect(screen.getByRole('button', { name: 'Missão' })).toHaveAttribute('aria-expanded', 'true');
  expect(ref.current).toBe(screen.getByRole('group', { name: 'Expedição' }));
  rerender(
    <Accordion
      label="Expedição"
      type="single"
      value="support"
      onValueChange={change}
      items={items}
    />,
  );
  expect(screen.getByRole('region', { name: 'Apoios' })).toBeInTheDocument();
});

it('emits an array of selected values in controlled multiple mode', async () => {
  const change = vi.fn();

  render(
    <Accordion
      label="Expedição"
      type="multiple"
      value={['mission']}
      onValueChange={change}
      items={items}
    />,
  );
  await userEvent.click(screen.getByRole('button', { name: 'Apoios' }));
  expect(change).toHaveBeenCalledWith(['mission', 'support']);
  expect(screen.getAllByRole('region')).toHaveLength(1);
});

it('respects disabled items and the root without submitting its form', async () => {
  const submit = vi.fn();
  const change = vi.fn();
  const { rerender } = render(
    <form onSubmit={submit}>
      <Accordion label="Expedição" type="single" onValueChange={change} items={items} />
    </form>,
  );

  await userEvent.click(screen.getByRole('button', { name: 'Indisponível' }));
  expect(change).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button', { name: 'Missão' }));
  expect(submit).not.toHaveBeenCalled();
  rerender(<Accordion label="Expedição" type="single" disabled items={items} />);
  screen.getAllByRole('button').forEach((button) => expect(button).toBeDisabled());
});

it('preserves input values when keeping section content mounted', async () => {
  render(
    <Accordion
      label="Expedição"
      type="single"
      collapsible
      items={[
        {
          value: 'notes',
          title: 'Anotações',
          content: <input aria-label="Anotação" />,
          keepMounted: true,
        },
      ]}
    />,
  );
  const trigger = screen.getByRole('button', { name: 'Anotações' });

  await userEvent.click(trigger);
  await userEvent.type(screen.getByRole('textbox'), 'Revisar expressão');
  await userEvent.click(trigger);
  await userEvent.click(trigger);
  expect(screen.getByRole('textbox')).toHaveValue('Revisar expressão');
});
