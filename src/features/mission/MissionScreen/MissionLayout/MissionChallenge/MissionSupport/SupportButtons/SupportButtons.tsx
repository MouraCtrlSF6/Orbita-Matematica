import { NarrationButton } from './NarrationButton/NarrationButton';
import { VisualButton } from './VisualButton/VisualButton';

export function SupportButtons() {
  return (
    <div className="support-actions flex gap-3 flex-wrap mt-4.5 mr-0 mb-0 ml-0 ds-down-mobile:gap-2">
      <NarrationButton />
      <VisualButton />
    </div>
  );
}
