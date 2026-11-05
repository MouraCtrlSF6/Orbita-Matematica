export function PlayerShip() {
  return (
    <div className="player-ship absolute -left-5 -top-6 w-10 h-12 [will-change:transform] text-[#ffb0ef] [filter:drop-shadow(0_0_0.5rem_#e56de2)] [&_svg]:w-full [&_svg]:h-full [&_svg]:[fill:#291b43] [&_svg]:[stroke:currentColor] [&_svg]:[stroke-width:2] [.flight-reduced_&]:[filter:none] [.flight-reduced_&]:[will-change:auto]">
      <svg viewBox="0 0 40 48">
        <path d="M20 3 36 41 20 33 4 41Z" />
        <path className="ship-flame [stroke:#8fffe8]" d="m15 38 5 8 5-8" />
      </svg>
    </div>
  );
}
