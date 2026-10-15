import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

type TextRevealProps = {
  text?: string;
};

export default function TextRevealSection({
  text = "I turn ideas into meaningful digital experiences through thoughtful design and modern web development.",
}: TextRevealProps) {
  const { darkMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");

  return (
    <section
      ref={containerRef}
      className={`relative h-[200vh] transition-colors duration-500`}
      style={{
        background: darkMode
          ? "linear-gradient(115deg, #08091A 0%, #171D42 42%, #10263A 100%)"
          : "#ffffff",
      }}
    >
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden px-6 sm:px-10 md:px-16">
        <div className="mx-auto w-full max-w-5xl">
          <p
            className={`mb-6 text-sm font-semibold uppercase tracking-[0.3em] ${
              darkMode ? "text-[#FF2D55]" : "text-[#FF2D55]"
            }`}
          >
            My Philosophy
          </p>

          <h2
            className="flex flex-wrap gap-x-[0.3em] gap-y-1 text-left text-[clamp(1.9rem,5vw,5rem)] font-bold leading-[1.25] tracking-tight"
            aria-label={text}
          >
            {words.map((word, wordIndex) => {
              const start = wordIndex / words.length;
              const end = (wordIndex + 1) / words.length;

              return (
                <RevealWord
                  key={`${wordIndex}-${word}`}
                  word={word}
                  start={start}
                  end={end}
                  progress={scrollYProgress}
                  darkMode={darkMode}
                />
              );
            })}
          </h2>
        </div>
      </div>
    </section>
  );
}

type RevealWordProps = {
  word: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  darkMode: boolean;
};

function RevealWord({ word, start, end, progress, darkMode }: RevealWordProps) {
  const letters = Array.from(word);

  return (
    <span className="inline-block whitespace-nowrap">
      {letters.map((letter, letterIndex) => (
        <RevealLetter
          key={letterIndex}
          letter={letter}
          start={start + ((end - start) * letterIndex) / letters.length}
          end={start + ((end - start) * (letterIndex + 1)) / letters.length}
          progress={progress}
          darkMode={darkMode}
        />
      ))}
    </span>
  );
}

type RevealLetterProps = {
  letter: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  darkMode: boolean;
};

function RevealLetter({
  letter,
  start,
  end,
  progress,
  darkMode,
}: RevealLetterProps) {
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <span className="relative inline-block">
      <span
        aria-hidden="true"
        className={darkMode ? "text-gray-600" : "text-gray-300"}
      >
        {letter}
      </span>

      <motion.span
        aria-hidden="true"
        style={{ opacity }}
        className={`absolute inset-0 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {letter}
      </motion.span>
    </span>
  );
}
