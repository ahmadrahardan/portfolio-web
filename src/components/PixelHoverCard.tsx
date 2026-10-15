
import { useState } from "react";
import type { CSSProperties } from "react";

type PixelHoverCardProps = {
  image: string;
  hoverImage?: string;
  alt?: string;
  darkMode?: boolean;
};

const COLS = 10;
const ROWS = 12;

const tiles = Array.from({ length: COLS * ROWS }, (_, index) => {
  const col = index % COLS;
  const row = Math.floor(index / COLS);

  return {
    index,
    col,
    row,
    delay: ((col * 7 + row * 11) % 23) * 18,
  };
});

export default function PixelHoverCard({
  image,
  hoverImage,
  alt = "Profile photo",
  darkMode = true,
}: PixelHoverCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative w-full max-w-[360px] aspect-[3/4] overflow-hidden
        rounded-[24px] cursor-pointer shadow-2xl
        ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      aria-label={alt}
    >
      {/* Foto utama */}
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Pixel tiles: gambar kedua terungkap per kotak */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {tiles.map(({ index, col, row, delay }) => {
          const style: CSSProperties = {
            left: `${(col / COLS) * 100}%`,
            top: `${(row / ROWS) * 100}%`,
            width: `${100 / COLS + 0.05}%`,
            height: `${100 / ROWS + 0.05}%`,
            backgroundImage: `url("${hoverImage || image}")`,
            backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
            backgroundPosition: `${
              (col / (COLS - 1)) * 100
            }% ${(row / (ROWS - 1)) * 100}%`,
            filter: hoverImage
              ? "none"
              : "grayscale(1) contrast(1.15)",
            opacity: hovered ? 1 : 0,
            transform: hovered
              ? "scale(1)"
              : "scale(0.3)",
            transitionProperty: "opacity, transform",
            transitionDuration: "300ms",
            transitionTimingFunction:
              "cubic-bezier(0.22, 1, 0.36, 1)",
            transitionDelay: `${delay}ms`,
          };

          return (
            <span
              key={index}
              className="absolute block"
              style={style}
            />
          );
        })}
      </div>

      {/* Gradient bagian bawah */}
      <div
        className="pointer-events-none absolute inset-0
          bg-gradient-to-t from-black/50 via-transparent
          to-transparent"
      />

      {/* Border */}
      <div
        className={`pointer-events-none absolute inset-0
          rounded-[24px] border-2
          ${darkMode
            ? "border-[#FF2D55]/50"
            : "border-rose-500/40"}`}
      />

      {/* Label */}
      <div
        className="pointer-events-none absolute bottom-5 left-5
          text-white"
      >
        <p className="text-xs tracking-[0.25em] uppercase opacity-70">
          Hover my Image Profile
        </p>
      </div>
    </div>
  );
}
