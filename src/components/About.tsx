import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

import fotoFormalku from "../assets/RHD.jpg";
import fotoKedua from "../assets/Rahar_2.png";
import PixelHoverCard from "./PixelHoverCard";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { darkMode } = useTheme();
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const passions = [
    {
      label: "Front-end",
      color: "text-red-400",
      border: "border-red-400/30",
      background: "bg-red-500/10",
    },
    {
      label: "System Analyst",
      color: "text-purple-400",
      border: "border-purple-400/30",
      background: "bg-purple-500/10",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const photo = photoRef.current;
    const content = contentRef.current;

    if (!section || !photo || !content) return;

    const ctx = gsap.context(() => {
      const textElements = Array.from(content.children);

      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      timeline.fromTo(
        photo,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          clearProps: "opacity,transform",
        },
        0,
      );

      timeline.fromTo(
        textElements,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          clearProps: "opacity,transform",
        },
        0.15,
      );

      introTimelineRef.current = timeline;

      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom top",
        onEnter: () => timeline.restart(),
        onEnterBack: () => timeline.restart(),
      });
    }, section);

    const replayIntro = () => {
      const timeline = introTimelineRef.current;
      const section = sectionRef.current;

      if (!timeline || !section) return;

      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
        timeline.restart();
      }
    };

    window.addEventListener("portfolio-about-intro", replayIntro);

    return () => {
      window.removeEventListener("portfolio-about-intro", replayIntro);

      introTimelineRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="aboutme"
      className="
        relative
        overflow-hidden
        pb-16
        pt-28
        flex
        items-center
        justify-center
        transition-colors
        duration-500
        bg-transparent
      "
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <style>
          {`
            .about-glow {
              position: absolute;
              width: 28rem;
              height: 28rem;
              filter: blur(40px);
              opacity: 0.30;
              background: radial-gradient(
                closest-side,
                var(--glowColor) 0%,
                rgba(0, 0, 0, 0) 70%
              );
            }

            @media (min-width: 768px) {
              .about-glow {
                width: 44rem;
                height: 44rem;
              }
            }
          `}
        </style>

        <span
          className="about-glow"
          style={
            {
              right: "-25rem",
              bottom: "-1rem",
              "--glowColor": darkMode
                ? "rgba(255,45,85,0.9)"
                : "rgba(255,45,85,0.6)",
            } as React.CSSProperties
          }
        />
      </div>

      <div
        className="
          relative z-10
          mx-auto
          w-full
          max-w-screen-xl
          px-5
          md:px-10
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-12
            gap-12
            items-center
          "
        >
          {/* FOTO PROFIL */}
          <div
            ref={photoRef}
            className="
              md:col-span-5
              flex
              justify-center
              md:justify-start
            "
          >
            <PixelHoverCard
              image={fotoFormalku}
              hoverImage={fotoKedua}
              darkMode={darkMode}
              alt="Foto profil Rahar"
            />
          </div>

          <div
            ref={contentRef}
            className="
              md:col-span-7
              text-center
              md:text-left
            "
          >
            <h2
              className={`
                mt-4
                text-4xl
                font-extrabold
                md:text-6xl
                ${darkMode ? "text-white" : "text-slate-900"}
              `}
            >
              <span className="relative inline-block">
                About <span className="text-[#FF2D55]">Me</span>
                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    w-full
                    h-0.5
                    bg-gradient-to-r
                    from-transparent
                    via-red-400
                    to-transparent
                  "
                />
              </span>
            </h2>

            <h3
              className={`
                text-xl
                sm:text-2xl
                font-semibold
                mt-2
                mb-5
                ${darkMode ? "text-white" : "text-slate-900"}
              `}
            >
              Step into my journey!
            </h3>

            <p
              className={`
                leading-7
                max-w-2xl
                text-base
                sm:text-lg
                tracking-[.05em]
                ${darkMode ? "text-slate-300" : "text-slate-600"}
              `}
            >
              A highly motivated sixth-semester Information Systems student at
              the Faculty of Computer Science, University of Jember (GPA 3.96)
              with a strong interest in information technology development.
              Experienced in building web applications using Laravel, Blade,
              React, and Tailwind, as well as managing databases with MySQL.
              Possesses strong teamwork, communication, and problem-solving
              skills.
            </p>

            <div
              className="
                mt-8
                flex
                flex-wrap
                justify-center
                gap-3
                md:justify-start
              "
            >
              {passions.map((passion) => (
                <span
                  key={passion.label}
                  className={`
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-sm
                    sm:text-base
                    font-semibold
                    whitespace-nowrap
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:scale-105
                    cursor-default
                    ${passion.color}
                    ${passion.border}
                    ${passion.background}
                  `}
                >
                  {passion.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
