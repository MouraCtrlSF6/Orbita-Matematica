import type { RefObject } from 'react';
import { type FlightViewProps } from './flight-scene-types';
import { Scene } from './Scene';
import { Radar } from './Radar';
import { SoundToggle } from './SoundToggle';

export interface FlightViewportProps extends FlightViewProps {
  viewportRef: RefObject<HTMLDivElement | null>;
  helpId: string;
}

export function FlightViewport({ viewportRef, helpId, ...props }: FlightViewportProps) {
  return (
    <div
      ref={viewportRef}
      className="flight-viewport relative [height:clamp(23.75rem,_57vh,_43.75rem)] overflow-hidden isolate [outline-offset:-0.3125rem] [background:#080d20] focus-visible:[outline:0.1875rem_solid_#a6ffe0] [.tutorial-pilot_&]:h-95 ds-down-mobile:h-102.5"
      tabIndex={0}
      role="region"
      aria-label="Área de pilotagem"
      aria-describedby={helpId}
      onBlur={props.controller.stop}
      onKeyDown={props.controller.keyDown}
      onKeyUp={props.controller.keyUp}
    >
      <Scene {...props} />
      <Radar {...props} />
      {props.onSoundChange ? <SoundToggle {...props} /> : null}
    </div>
  );
}
