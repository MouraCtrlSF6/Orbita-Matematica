interface SpaceBodyProps {
  kind: 'planet' | 'moon' | 'asteroid';
}

export function SpaceBody({ kind }: SpaceBodyProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      {kind === 'asteroid' ? (
        <>
          <path d="M30 16 68 10 103 39 108 74 77 106 35 102 10 70 15 38Z" />
          <circle cx="42" cy="39" r="10" />
          <circle cx="77" cy="72" r="17" />
          <path d="M25 75q15-15 21 8M70 24l10 12" />
        </>
      ) : (
        <>
          <circle cx="60" cy="60" r={kind === 'moon' ? 35 : 40} />
          {kind === 'planet' ? (
            <>
              <ellipse cx="60" cy="60" rx="57" ry="17" transform="rotate(-25 60 60)" />
              <path d="M39 29q30 9 40 45M32 53q10 25 38 35" />
            </>
          ) : (
            <>
              <circle cx="49" cy="47" r="10" />
              <circle cx="72" cy="73" r="7" />
              <path d="M34 69q8 10 15 8" />
            </>
          )}
        </>
      )}
    </svg>
  );
}
