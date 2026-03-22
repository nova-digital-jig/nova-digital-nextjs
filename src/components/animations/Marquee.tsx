"use client";

interface MarqueeProps {
  text?: string;
  speed?: number;
  className?: string;
}

export function Marquee({
  text = "DESIGN · DEVELOP · DEPLOY · ",
  speed = 25,
  className = "",
}: MarqueeProps) {
  // Repeat text enough times for seamless loop
  const repeated = text.repeat(8);

  return (
    <div
      className={`w-full overflow-hidden border-y ${className}`}
      style={{
        borderColor: "var(--border)",
        padding: "24px 0",
      }}
    >
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        <span
          className="whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.25)",
          }}
        >
          {repeated}
        </span>
        <span
          className="whitespace-nowrap"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "1.1rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.25)",
          }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
