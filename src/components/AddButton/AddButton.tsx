import { PlusIcon } from '@radix-ui/react-icons';
import { TooltipButton, type TooltipButtonProps } from '../Tooltip/TooltipButton/TooltipButton';
import { ButtonVariant } from '../Button/button-styles';
import { mergeClasses } from '../utils/merge-classes';

export type AddButtonProps = Omit<TooltipButtonProps, 'variant' | 'asChild'>;

export function AddButton({ children, className, ...props }: AddButtonProps) {
  return (
    <TooltipButton
      {...props}
      variant={ButtonVariant.Addition}
      className={mergeClasses(children === undefined ? 'size-11 p-0' : undefined, className)}
    >
      <PlusIcon aria-hidden="true" className="size-5 shrink-0" />
      {children}
    </TooltipButton>
  );
}
