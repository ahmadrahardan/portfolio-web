
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const timeline = [
  {
    year: "2020-2023",
    title: "Senior High School",
    category: "Education",
    description:
      "My high school journey, where I developed academic knowledge, creativity, discipline, and teamwork.",
  },
  {
    year: "2023-Present",
    title: "University of Jember",
    category: "Education",
    description:
      "Studying Information Systems at the University of Jember, focusing on web development, UI/UX design, and technology.",
  },
];

type TimelineItem = (typeof timeline)[number];

function TimelineCard({
  item,
  index,
  darkMode,
}: {
  item: TimelineItem;
  index: number;
  darkMode: boolean;
}) {
  const reduceMotion = useReducedMotion();

  // SMA di kanan, UNEJ di kiri
  const isRight = index % 2 === 0;

  return (
    <div className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-x-5 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-x-5">
      {/* Kolom kiri pada desktop */}
      <div
        className={`hidden md:block ${
          isRight ? "pt-3 text-right" : ""
        }`}
      >
        {isRight ? (
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className={`text-lg font-semibold ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {item.year}
          </motion.span>
        ) : (
          <CardContent
            item={item}
            darkMode={darkMode}
            isRight={false}
            reduceMotion={!!reduceMotion}
          />
        )}
      </div>

      {/* Titik timeline */}
      <div className="relative flex justify-center pt-5">
        <motion.div
          initial={{ scale: 0.5, opacity: 0.4 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="relative z-10 h-4 w-4 rounded-full border-[3px] border-[#FF2D55] bg-[#FF2D55] shadow-[0_0_0_7px_rgba(255,45,85,0.12)]"
        />
      </div>

      {/* Kolom kanan pada desktop, semua kartu di kanan pada mobile */}
      <div className="min-w-0">
        <div className="md:hidden">
          <CardContent
            item={item}
            darkMode={darkMode}
            isRight
            reduceMotion={!!reduceMotion}
          />
        </div>

        <div className="hidden md:block">
          {isRight ? (
            <CardContent
              item={item}
              darkMode={darkMode}
              isRight
              reduceMotion={!!reduceMotion}
            />
          ) : (
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className={`inline-block pt-3 text-lg font-semibold ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {item.year}
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
}

function CardContent({
  item,
  darkMode,
  isRight,
  reduceMotion,
}: {
  item: TimelineItem;
  darkMode: boolean;
  isRight: boolean;
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              x: isRight ? 35 : -35,
              y: 20,
              scale: 0.95,
              filter: "blur(5px)",
            }
      }
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative min-w-0 rounded-2xl border p-6 shadow-xl md:p-8 ${
        darkMode
          ? "border-white/10 bg-[#1D2338]/90 text-white shadow-black/20"
          : "border-slate-200 bg-white/90 text-slate-900 shadow-slate-200/40"
      }`}
    >
      {/* Segitiga mengarah ke garis timeline */}
      <div
        className={`absolute top-5 h-3.5 w-3.5 rotate-45 border ${
          isRight
            ? "-left-[8px] border-r-0 border-t-0"
            : "-right-[8px] border-b-0 border-l-0"
        } ${
          darkMode
            ? "border-white/10 bg-[#1D2338]"
            : "border-slate-200 bg-white"
        }`}
      />

      <span className="mb-3 block text-sm font-bold text-[#FF2D55] md:hidden">
        {item.year}
      </span>

      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF2D55]">
        {item.category}
      </span>

      <h3 className="mt-4 text-xl font-bold leading-tight md:text-2xl">
        {item.title}
      </h3>

      <div className="my-5 h-[2px] w-12 rounded-full bg-[#FF2D55]" />

      <p
        className={`text-sm leading-7 md:text-base ${
          darkMode ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {item.description}
      </p>
    </motion.article>
  );
}

export default function Education() {
  const { darkMode } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="education"
      className="relative overflow-hidden bg-transparent px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-20 text-center">

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`mt-4 text-4xl font-extrabold md:text-6xl ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            <span className="relative inline-block">
                Education
                <span className="absolute -bottom-1 z-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" />
              </span>
          </motion.h2>

          <p
            className={`mx-auto mt-5 max-w-xl text-base ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            A journey through education and personal growth.
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          <div
            className={`absolute bottom-0 left-[16px] top-0 w-[2px] md:left-1/2 md:-translate-x-1/2 ${
              darkMode ? "bg-white/15" : "bg-slate-300"
            }`}
          />

          {/* Garis pink mengikuti scroll */}
          <motion.div
            style={{
              scaleY,
              transformOrigin: "top",
            }}
            className="absolute bottom-0 left-[16px] top-0 w-[2px] bg-[#FF2D55] md:left-1/2 md:-translate-x-1/2"
          />

          <div className="relative space-y-24 md:space-y-36">
            {timeline.map((item, index) => (
              <TimelineCard
                key={item.year}
                item={item}
                index={index}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
