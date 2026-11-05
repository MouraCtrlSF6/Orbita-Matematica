import { useMissionContext } from './hooks/useMissionContext';
import { SupportButtons } from './SupportButtons';
import { MissionVisual } from './MissionVisual';

export function MissionSupport() {
  const { session } = useMissionContext();

  return (
    <>
      <SupportButtons />
      <p className="narration-status [&:empty]:hidden text-small mt-3 text-[#785d33]" role="status">
        {session.narration.message}
      </p>
      <MissionVisual />
    </>
  );
}
