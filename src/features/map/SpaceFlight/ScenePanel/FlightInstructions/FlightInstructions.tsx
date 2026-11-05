export interface FlightInstructionsProps {
  id: string;
}

export function FlightInstructions({ id }: FlightInstructionsProps) {
  return (
    <p
      id={id}
      className="flight-instructions py-3 px-4.5 bg-flight-panel [border-bottom:1px_solid_#34425f] text-[#c6d3ec] text-small ds-down-mobile:p-3"
    >
      Setas ou WASD para pilotar · Solte para parar · Aproxime-se e pressione Enter para entrar. Tab
      sai da pilotagem.
    </p>
  );
}
