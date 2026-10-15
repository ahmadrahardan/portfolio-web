import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

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

function CardContent({
  item,
  darkMode,
  isRight,
}: {
  item: TimelineItem;
  darkMode: boolean;
  isRight: boolean;
}) {
  return (
    <article
      className={`education-card relative min-w-0 rounded-2xl border p-6 shadow-xl md:p-8 ${
        darkMode
          ? "border-white/10 bg-[#1D2338]/90 text-white shadow-black/20"
          : "border-slate-200 bg-white/90 text-slate-900 shadow-slate-200/40"
      }`}
    >
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
    </article>
  );
}

function TimelineCard({
  item,
  index,
  darkMode,
}: {
  item: TimelineItem;
  index: number;
  darkMode: boolean;
}) {
  const isRight = index % 2 === 0;

  return (
    <div className="education-item relative grid grid-cols-[32px_minmax(0,1fr)] gap-x-5 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:gap-x-5">
      <div className={`hidden md:block ${isRight ? "pt-3 text-right" : ""}`}>
        {isRight ? (
          <span
            className={`education-year text-lg font-semibold ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            {item.year}
          </span>
        ) : (
          <CardContent item={item} darkMode={darkMode} isRight={false} />
        )}
      </div>

      <div className="relative flex justify-center pt-5">
        <div className="education-dot relative z-10 h-4 w-4 rounded-full border-[3px] border-[#FF2D55] bg-[#FF2D55] shadow-[0_0_0_7px_rgba(255,45,85,0.12)]" />
      </div>

      <div className="min-w-0">
        <div className="md:hidden">
          <CardContent item={item} darkMode={darkMode} isRight />
        </div>

        <div className="hidden md:block">
          {isRight ? (
            <CardContent item={item} darkMode={darkMode} isRight />
          ) : (
            <span
              className={`education-year inline-block pt-3 text-lg font-semibold ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {item.year}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Education() {
  const { darkMode } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timelineElement = timelineRef.current;
    const progress = progressRef.current;

    if (!section || !timelineElement || !progress) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const headingElements = gsap.utils.toArray<HTMLElement>(
        ".education-heading, .education-subtitle",
      );

      const items = gsap.utils.toArray<HTMLElement>(".education-item");

      const introTimeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      introTimeline.fromTo(
        headingElements,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
        },
      );

      introTimelineRef.current = introTimeline;

      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom top",
        onEnter: () => introTimeline.restart(),
        onEnterBack: () => introTimeline.restart(),
      });

      items.forEach((item) => {
        const elements = item.querySelectorAll<HTMLElement>(
          ".education-card, .education-year, .education-dot",
        );

        const cardTimeline = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
        });

        cardTimeline.fromTo(
          elements,
          {
            opacity: 0,
            y: 35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.12,
          },
        );

        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          end: "bottom top",
          onEnter: () => cardTimeline.restart(),
          onEnterBack: () => cardTimeline.restart(),
        });
      });

      gsap.fromTo(
        progress,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineElement,
            start: "top 75%",
            end: "bottom 75%",
            scrub: 0.3,
          },
        },
      );
    }, section);

    const replayIntro = () => {
      const section = sectionRef.current;
      const timeline = introTimelineRef.current;

      if (!section || !timeline) return;

      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        timeline.restart();
      }
    };

    window.addEventListener("portfolio-education-intro", replayIntro);

    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("load", refreshTriggers);

    return () => {
      window.removeEventListener("portfolio-education-intro", replayIntro);

      window.removeEventListener("load", refreshTriggers);

      introTimelineRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative overflow-hidden bg-transparent px-5 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2
            className={`education-heading text-4xl md:text-6xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            <span className="relative inline-block">
              Education
              <span className="absolute -bottom-1 z-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" />
            </span>
          </h2>
          <p
            className={`education-subtitle text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
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

          <div
            ref={progressRef}
            style={{ transformOrigin: "top center" }}
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
