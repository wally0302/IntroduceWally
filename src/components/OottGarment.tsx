type OottGarmentProps = {
  category: "top" | "bottom" | "outer" | "shoes";
  color: string;
  name: string;
  variant?: string;
};

const line = "#20252f";
const stitch = "#59616e";

/**
 * Small, original flatlay illustrations for the OOTT portfolio demo.
 * These are interface artwork, not product photography or virtual try-on output.
 */
export function OottGarment({
  category,
  color,
  name,
  variant = "",
}: OottGarmentProps) {
  const cue = `${name} ${variant}`.toLowerCase();
  const isBlazer = /blazer|西裝/.test(cue);
  const isJacket = /jacket|wind|風衣|夾克/.test(cue);
  const isTee = /tee|t-shirt|短袖|t恤/.test(cue);

  return (
    <svg
      viewBox="0 0 240 220"
      width="240"
      height="220"
      role="img"
      aria-label={name}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{name}</title>
      <ellipse
        cx="120"
        cy="194"
        rx="78"
        ry="10"
        fill="#1F2937"
        opacity="0.11"
      />
      {category === "top" && (
        <g
          stroke={line}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {isTee ? (
            <path
              d="M81 61 49 78l14 30 20-10v57c11 8 72 8 74 0v-57l20 10 14-30-32-17-18-10H99L81 61Z"
              fill={color}
            />
          ) : (
            <path
              d="m93 51-28 13-21 34 24 18 13-18v58c18 8 73 8 91 0V98l13 18 24-18-21-34-28-13-10-13H103L93 51Z"
              fill={color}
            />
          )}
          <path d={isTee ? "M99 51c2 13 40 13 42 0" : "M103 38c2 13 32 13 34 0"} stroke={stitch} />
          <path d="M81 91v29M159 91v29" stroke={stitch} strokeDasharray="3 4" />
          {!isTee && <path d="M120 49v99M113 56h14" stroke={stitch} />}
        </g>
      )}
      {category === "bottom" && (
        <g
          stroke={line}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path
            d="M72 42h96l8 51-22 93h-32l-4-75-4 75H82L64 93l8-51Z"
            fill={color}
          />
          <path
            d="M72 43h96M120 44v67M96 50l-3 52M144 50l3 52"
            stroke={stitch}
          />
          <path d="M72 58h25M143 58h25" stroke={line} />
          <path d="M70 94h27M143 94h27" stroke={stitch} strokeDasharray="3 4" />
        </g>
      )}
      {category === "outer" && (
        <g
          stroke={line}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {isBlazer ? (
            <path
              d="m90 40-24 17-24 41 25 17 14-24v55c19 9 69 9 78 0V91l14 24 25-17-24-41-24-17-12-11h-18L90 40Z"
              fill={color}
            />
          ) : (
            <path
              d="m91 42-29 18-17 35 23 17 13-20v57c12 10 72 10 78 0V92l13 20 23-17-17-35-29-18-10-11H101L91 42Z"
              fill={color}
            />
          )}
          <path d="M102 32c3 13 33 13 36 0M120 45v104" stroke={stitch} />
          {isBlazer ? (
            <>
              <path
                d="m105 46 15 28 15-28M120 74l-12 16h24l-12-16Z"
                fill="#F7F5EF"
              />
              <path
                d="M77 100h20M143 100h20M85 129h18M137 129h18"
                stroke={stitch}
                strokeDasharray="3 4"
              />
            </>
          ) : (
            <>
              <path
                d="M91 52h58M78 106h19M143 106h19"
                stroke={stitch}
                strokeDasharray="3 4"
              />
              {isJacket && <path d="M91 53 105 73h30l14-20" stroke={stitch} />}
            </>
          )}
        </g>
      )}
      {category === "shoes" && (
        <g
          stroke={line}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path
            d="M49 132c20 3 32-10 42-32l20 8c-2 17-12 32-26 44-11 10-25 19-42 19-11 0-17-6-15-14 2-8 10-17 21-25Z"
            fill={color}
          />
          <path
            d="M191 132c-20 3-32-10-42-32l-20 8c2 17 12 32 26 44 11 10 25 19 42 19 11 0 17-6 15-14-2-8-10-17-21-25Z"
            fill={color}
          />
          <path
            d="M31 163c17 8 49 5 66-11M209 163c-17 8-49 5-66-11"
            stroke={stitch}
          />
          <path
            d="m87 111 13 17M153 111l-13 17M71 137l18 6M169 137l-18 6"
            stroke={stitch}
            strokeDasharray="3 4"
          />
          <path d="M29 173h65M146 173h65" stroke="#fff" strokeWidth="4" />
        </g>
      )}
    </svg>
  );
}
