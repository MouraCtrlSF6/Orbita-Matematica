interface PlanetProps {
  variant: string;
}
export function Planet({ variant }: PlanetProps) {
  return (
    <div className={`planet-art ${variant}`} aria-hidden="true">
      <div className="planet-ring" />
      <div className="planet-sphere">
        <i />
        <b />
        <span />
      </div>
      <div className="satellite" />
      <div className="planet-spark">✦</div>
    </div>
  );
}

export function SpaceArt() {
  return (
    <svg className="space-art" viewBox="0 0 570 340" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="world"
          x1="300"
          y1="70"
          x2="500"
          y2="330"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#b3a1f4" />
          <stop offset="1" stopColor="#6251ac" />
        </linearGradient>
        <linearGradient
          id="helmet"
          x1="190"
          y1="90"
          x2="270"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#38496c" />
          <stop offset="1" stopColor="#131e38" />
        </linearGradient>
        <linearGradient
          id="suit"
          x1="180"
          y1="140"
          x2="310"
          y2="280"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fff8ef" />
          <stop offset="1" stopColor="#acb9d3" />
        </linearGradient>
      </defs>
      <ellipse
        cx="363"
        cy="200"
        rx="217"
        ry="76"
        transform="rotate(-24 363 200)"
        stroke="#c6b6ff"
        strokeOpacity=".15"
        strokeDasharray="5 7"
      />
      <circle cx="404" cy="183" r="116" fill="url(#world)" />
      <path
        d="M315 112c50-25 78 30 119 3s53 3 73 19M291 178c54-37 80 34 133 7s65-1 94 20M309 250c49-37 75 13 110 1s61-6 78 0"
        stroke="#c7b6ff"
        strokeOpacity=".24"
        strokeWidth="18"
      />
      <ellipse
        cx="398"
        cy="198"
        rx="167"
        ry="35"
        transform="rotate(-24 398 198)"
        stroke="#d4b8db"
        strokeWidth="9"
        strokeOpacity=".65"
        strokeDasharray="380 700"
      />
      <circle cx="120" cy="62" r="22" fill="#e5b78f" />
      <path d="M98 63c12 4 25 8 45-5" stroke="#f8d7ba" strokeWidth="6" />
      <circle cx="501" cy="57" r="5" fill="#addbc9" />
      <path
        d="m177 43 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8ZM526 260l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z"
        fill="#d6c8ff"
      />
      <g transform="rotate(-17 240 195)">
        <rect x="174" y="144" width="44" height="89" rx="17" fill="#9b9cbf" />
        <path
          d="m207 216-16 55c-4 17 22 25 28 8l24-50m9-6 6 51c2 17 30 15 28-4l-5-62"
          fill="url(#suit)"
          stroke="#d5dced"
          strokeWidth="4"
        />
        <path
          d="m196 165-25 28-22-15c-14-9-26 9-15 19l32 24c8 5 16 3 22-3l22-24m57-33 20 18 26-22c12-10 26 6 15 18l-34 32c-6 6-12 5-19 1l-22-16"
          fill="url(#suit)"
          stroke="#d5dced"
          strokeWidth="4"
        />
        <rect x="194" y="144" width="83" height="91" rx="31" fill="url(#suit)" />
        <rect
          x="212"
          y="185"
          width="46"
          height="30"
          rx="8"
          fill="#e7eaf4"
          stroke="#a1acc3"
          strokeWidth="2"
        />
        <circle cx="224" cy="195" r="4" fill="#edac8a" />
        <circle cx="237" cy="195" r="4" fill="#91cbb7" />
        <path d="M221 206h26" stroke="#8c97af" strokeWidth="3" />
        <circle cx="235" cy="132" r="52" fill="#e8eaf2" />
        <rect x="192" y="105" width="87" height="59" rx="29" fill="url(#helmet)" />
        <path
          d="M206 124c5-10 14-12 27-12"
          stroke="#8bafcd"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path d="M267 125v10" stroke="#c7cde0" strokeWidth="5" strokeLinecap="round" />
        <circle cx="183" cy="136" r="9" fill="#abb5cd" />
        <circle cx="286" cy="136" r="9" fill="#abb5cd" />
        <path
          d="M195 229c-31 6-52 16-53 38s-32 25-49 4"
          stroke="#e3cfad"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      <g fill="#f1e8ff">
        <circle cx="70" cy="150" r="2" />
        <circle cx="352" cy="43" r="2" />
        <circle cx="480" cy="302" r="2" />
        <circle cx="148" cy="316" r="2" />
        <circle cx="554" cy="147" r="2" />
      </g>
      <g transform="rotate(12 360 70)">
        <rect x="331" y="49" width="56" height="35" rx="9" fill="#343350" stroke="#6d648c" />
        <text x="344" y="72" fill="#d2c0fc" fontFamily="sans-serif" fontSize="20">
          x+2
        </text>
      </g>
    </svg>
  );
}
