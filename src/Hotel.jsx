export default function Hotel() {
  return (
    <svg
      className="hotel"
      viewBox="0 0 1000 660"
      role="img"
      aria-label="Hotel Aurora à noite, diante do mar e de um farol"
    >
      <defs>
        <linearGradient id="sky" x2="0" y2="1">
          <stop stopColor="#16251f" />
          <stop offset="1" stopColor="#3e4b3b" />
        </linearGradient>
        <linearGradient id="sea" x2="0" y2="1">
          <stop stopColor="#263b34" />
          <stop offset="1" stopColor="#0b1513" />
        </linearGradient>
        <linearGradient id="wall" x2="1" y2="1">
          <stop stopColor="#647063" />
          <stop offset="1" stopColor="#26332a" />
        </linearGradient>
        <radialGradient id="light">
          <stop stopColor="#e2d5a0" stopOpacity=".4" />
          <stop offset="1" stopColor="#dccb90" stopOpacity="0" />
        </radialGradient>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".6"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope=".13" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" mode="soft-light" />
        </filter>
        <pattern
          id="windows"
          width="57"
          height="61"
          patternUnits="userSpaceOnUse"
        >
          <rect x="15" y="13" width="22" height="35" fill="#101b17" />
          <rect
            x="17"
            y="15"
            width="18"
            height="31"
            fill="#d3c185"
            opacity=".42"
          />
          <path d="M26 15v31M17 30h18" stroke="#2e382a" strokeWidth="2" />
        </pattern>
      </defs>
      <g filter="url(#grain)">
        <path fill="url(#sky)" d="M0 0h1000v660H0z" />
        <circle cx="741" cy="132" r="38" fill="#ccd0b2" opacity=".45" />
        <circle cx="741" cy="132" r="115" fill="url(#light)" />
        <path
          d="M0 350Q200 275 360 357T700 350T1000 325V660H0Z"
          fill="#202f26"
        />
        <path fill="url(#sea)" d="M0 431q270-40 510-5t490-15v249H0z" />
        <path
          d="M0 460q210-22 420 0t580-12M0 500q200-15 470 0t530-7M30 551q260-18 510 2t400-2M400 600q260-10 540-1"
          fill="none"
          stroke="#788573"
          opacity=".16"
        />
        <path d="M0 472l141-82 476 8 64 87-261 58-420 9z" fill="#131f19" />
        <path d="M124 202l213-40 228 66v226H124z" fill="url(#wall)" />
        <path d="M124 202l213-40v292H124z" fill="#39483b" />
        <path d="M337 162l228 66v226H337z" fill="#435040" />
        <path d="M111 198l223-55 245 74-14 18-228-60-213 42z" fill="#18271d" />
        <path d="M141 225h177v196H141z" fill="url(#windows)" />
        <path d="M353 232h195v190H353z" fill="url(#windows)" />
        <path d="M261 147v-43h60v52" fill="#263c2c" />
        <path d="M251 110l43-31 41 24z" fill="#1c2b20" />
        <path d="M318 354h290v94H318z" fill="#324133" />
        <path d="M309 352l130-53 180 45-11 14H318z" fill="#15261c" />
        <path
          d="M341 378h47v59h-47zm72 0h47v59h-47zm72 0h47v59h-47"
          fill="#c7b378"
          opacity=".55"
        />
        <path
          d="M337 379v57m54-57v57m18-57v57m54-57v57m18-57v57m54-57v57"
          stroke="#19291d"
          strokeWidth="5"
        />
        <text
          x="430"
          y="279"
          textAnchor="middle"
          fill="#e4d5a5"
          fontFamily="Georgia"
          fontSize="18"
          letterSpacing="5"
          transform="rotate(14 430 279)"
        >
          AURORA
        </text>
        <path d="M790 361l10-114h28l12 114z" fill="#788371" />
        <path d="M794 247h40v-30h-40z" fill="#a4aa8b" />
        <path d="M789 216l25-24 27 24z" fill="#253b2b" />
        <path d="M807 220h13v20h-13z" fill="#ebd99b" />
        <path d="M813 228L1000 145v149z" fill="#e4dcaa" opacity=".055" />
        <path d="M700 400q100-45 210 0" fill="#14291f" />
        <path d="M567 470l162-15v8l-162 17z" fill="#726f53" />
        <path
          d="M591 473v26m45-29v27m44-30v27m43-32v25"
          stroke="#494e3a"
          strokeWidth="5"
        />
        <path
          d="M62 490q30-50 14-117m0 43q-35-35-48-5m50-19q10-45 42-27"
          fill="none"
          stroke="#13271c"
          strokeWidth="12"
        />
      </g>
    </svg>
  );
}
