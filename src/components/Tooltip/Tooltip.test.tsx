import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';
import { TooltipVariant } from './tooltip-styles';

it.each(Object.values(TooltipVariant))(
  'describes the focused trigger and dismisses with Escape for variant %s',
  async (variant) => {
    const user = userEvent.setup();

    render(
      <Tooltip variant={variant} content="Mais informações sobre a missão">
        <Button>Ajuda</Button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Ajuda' });

    await user.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Mais informações sobre a missão');
    expect(trigger).toHaveAccessibleDescription('Mais informações sobre a missão');
    expect(document.querySelectorAll('button')).toHaveLength(1);
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  },
);

it('keeps controlled state owned by the caller and uses a custom portal container', async () => {
  const change = vi.fn();
  const container = document.createElement('div');

  document.body.append(container);
  const { rerender, unmount } = render(
    <Tooltip open={false} onOpenChange={change} content="Descrição" portalContainer={container}>
      <Button>Ajuda</Button>
    </Tooltip>,
  );

  await userEvent.tab();
  expect(change).toHaveBeenCalledWith(true);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  rerender(
    <Tooltip open onOpenChange={change} content="Descrição" portalContainer={container}>
      <Button>Ajuda</Button>
    </Tooltip>,
  );
  expect(container).toContainElement(await screen.findByRole('tooltip'));
  unmount();
  container.remove();
});
