
import { useState, useRef, useMemo, useEffect } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import bladeIcon from "../assets/blade.webp";
import canvaIcon from "../assets/canva.webp";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  icon: string;
  type: "tech" | "tools";
  color: string;
};

const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tech" | "tools">("tech");

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);

  const { darkMode } = useTheme();

  const skills: Skill[] = useMemo(
    () => [
      {
        name: "HTML",
        icon: "https://cdn.simpleicons.org/html5/E34F26",
        type: "tech",
        color: "#E34F26",
      },
      {
        name: "CSS",
        icon: "https://cdn.simpleicons.org/css/1572B6",
        type: "tech",
        color: "#1572B6",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        type: "tech",
        color: "#06B6D4",
      },
      {
        name: "Blade",
        icon: bladeIcon,
        type: "tech",
        color: "#FF2D20",
      },
      {
        name: "PHP",
        icon: "https://cdn.simpleicons.org/php/777BB4",
        type: "tech",
        color: "#777BB4",
      },
      {
        name: "Laravel",
        icon: "https://cdn.simpleicons.org/laravel/FF2D20",
        type: "tech",
        color: "#FF2D20",
      },
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react/61DAFB",
        type: "tech",
        color: "#61DAFB",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
        type: "tech",
        color: "#3178C6",
      },
      {
        name: "Python",
        icon: "https://cdn.simpleicons.org/python/3776AB",
        type: "tech",
        color: "#3776AB",
      },
      {
        name: "Jupyter",
        icon: "https://cdn.simpleicons.org/jupyter/F37626",
        type: "tech",
        color: "#F37626",
      },
      {
        name: "C#",
        icon: "https://cdn-icons-png.flaticon.com/512/6132/6132221.png",
        type: "tech",
        color: "#833AB4",
      },
      {
        name: "MySQL",
        icon: "https://cdn.simpleicons.org/mysql/4479A1",
        type: "tech",
        color: "#4479A1",
      },
      {
        name: "phpMyAdmin",
        icon: "https://cdn.simpleicons.org/phpmyadmin/6C78AF",
        type: "tools",
        color: "#6C78AF",
      },
      {
        name: "Laragon",
        icon: "https://cdn.simpleicons.org/laragon/0E83CD",
        type: "tools",
        color: "#0E83CD",
      },
      {
        name: "Figma",
        icon: "https://cdn.simpleicons.org/figma/F24E1E",
        type: "tools",
        color: "#F24E1E",
      },
      {
        name: "Canva",
        icon: canvaIcon,
        type: "tools",
        color: "#00C4CC",
      },
      {
        name: "Trello",
        icon: "https://cdn.simpleicons.org/trello/0079BF",
        type: "tools",
        color: "#0079BF",
      },
      {
        name: "Enterprise Architect",
        icon: "https://images.dwncdn.net/images/t_app-icon-l/p/77f6e337-d359-4228-ab40-ce511f75c0f8/3213945921/2383_4-10049037-imgingest-5589442223185491964.png",
        type: "tools",
        color: "#1E88E5",
      },
    ],
    []
  );

  const themeBorderStops = darkMode
    ? ["#FF2D55", "#ff7ab7", "#2563eb"]
    : ["#d97706", "#dc2626", "#a21caf"];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const tabs = tabsRef.current;
    const grid = gridRef.current;

    if (!section || !heading || !tabs || !grid) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      timeline.fromTo(
        Array.from(heading.children),
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          clearProps: "opacity,transform",
        }
      );

      timeline.fromTo(
        tabs,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          clearProps: "opacity,transform",
        },
        "-=0.5"
      );

      timeline.fromTo(
        Array.from(grid.children),
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.06,
          clearProps: "opacity,transform",
        },
        "-=0.45"
      );

      introTimelineRef.current = timeline;

      const playIntro = () => {
        hasAnimatedRef.current = true;
        timeline.restart();
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom top",
        onEnter: playIntro,
        onEnterBack: playIntro,
      });
    }, section);

    const replayIntro = () => {
      const section = sectionRef.current;
      const timeline = introTimelineRef.current;

      if (!section || !timeline) return;

      const rect = section.getBoundingClientRect();

      if (
        rect.top < window.innerHeight * 0.85 &&
        rect.bottom > 0
      ) {
        hasAnimatedRef.current = true;
        timeline.restart();
      }
    };

    window.addEventListener(
      "portfolio-skills-intro",
      replayIntro
    );

    return () => {
      window.removeEventListener(
        "portfolio-skills-intro",
        replayIntro
      );

      introTimelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const grid = gridRef.current;

    if (!grid || !hasAnimatedRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(grid.children),
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power2.out",
          overwrite: "auto",
          clearProps: "opacity,transform",
        }
      );
    }, grid);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-transparent pb-20 pt-20 transition-colors duration-500"
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <style>
          {`
            .skills-glow {
              position: absolute;
              width: 28rem;
              height: 28rem;
              filter: blur(40px);
              opacity: 0.30;
              background: radial-gradient(
                closest-side,
                var(--glowColor) 0%,
                rgba(0,0,0,0) 70%
              );
            }

            @media (min-width: 768px) {
              .skills-glow {
                width: 44rem;
                height: 44rem;
              }
            }
          `}
        </style>

        <span
          className="skills-glow"
          style={
            {
              right: "-25rem",
              bottom: "-1rem",
              "--glowColor": darkMode
                ? "rgba(255,45,85,0.9)"
                : "rgba(255,45,85,0.6)",
            } as CSSProperties
          }
        />
      </div>

      <style>
        {`
          .border-ring {
            --thickness: 2px;
            position: absolute;
            inset: 0;
            border-radius: inherit;
            padding: var(--thickness);
            pointer-events: none;
            background: linear-gradient(
              135deg,
              var(--c1),
              var(--c2),
              var(--c3)
            );
            -webkit-mask:
              linear-gradient(#000 0 0) content-box,
              linear-gradient(#000 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }

          .skill-card .focusable-card {
            transition:
              transform .2s ease,
              box-shadow .2s ease;
          }

          .skill-card:hover .focusable-card,
          .skill-card:focus-within .focusable-card {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0,0,0,.10);
          }
        `}
      </style>

      <div className="container relative z-10 mx-auto max-w-screen-xl px-5 md:px-10">

        <div
          ref={headingRef}
          className="mb-6 text-center"
        >
          <h2
            className={`section-title mb-4 text-4xl font-extrabold md:text-6xl ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="relative inline-block">
              Tech{" "}
              <span className="text-[#FF2D55]">
                Stack
              </span>

              <span className="absolute -bottom-1 left-0 z-[1] mt-2 h-0.5 w-full bg-gradient-to-r from-transparent via-red-400 to-transparent" />
            </span>
          </h2>

          <p
            className={`section-subtitle text-lg ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Tools & tech that power the projects I build
          </p>
        </div>

        <div
          ref={tabsRef}
          className="mb-12 flex justify-center md:mb-16"
        >
          <div
            className={`relative inline-flex rounded-full p-1 shadow-inner ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <button
              type="button"
              onClick={() => setActiveTab("tech")}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === "tech"
                  ? "bg-[#FF2D55] text-white"
                  : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-900"
              }`}
            >
              Technologies
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tools")}
              className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                activeTab === "tools"
                  ? "bg-[#FF2D55] text-white"
                  : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-900"
              }`}
            >
              Tools
            </button>
          </div>
        </div>

        <div
          ref={gridRef}
          className="
            grid
            grid-cols-2
            gap-4
            sm:grid-cols-3
            sm:gap-6
            md:grid-cols-4
            lg:grid-cols-5
            xl:grid-cols-6
          "
        >
          {skills
            .filter((skill) => skill.type === activeTab)
            .map((skill) => (
              <div
                key={`${activeTab}-${skill.name}`}
                className="skill-card group relative"
              >
                <div
                  tabIndex={0}
                  role="button"
                  aria-label={`Skill ${skill.name}`}
                  className={`focusable-card relative isolate flex h-full flex-col items-center overflow-hidden rounded-xl p-4 shadow-sm hover:shadow-md sm:p-5 ${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-white"
                  }`}
                  style={
                    {
                      "--c1": themeBorderStops[0],
                      "--c2": themeBorderStops[1],
                      "--c3": themeBorderStops[2],
                    } as CSSProperties
                  }
                >
                  <div className="border-ring absolute inset-0 z-0 rounded-xl" />

                  <div className="relative mb-3 flex h-14 w-14 items-center justify-center rounded-lg sm:mb-4 sm:h-16 sm:w-16">

                    <span
                      className="absolute inset-0 rounded-lg opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-70"
                      style={{
                        background: skill.color,
                      }}
                    />

                    <div
                      className={`relative z-10 flex h-full w-full items-center justify-center rounded-lg ${
                        darkMode
                          ? "bg-gray-700"
                          : "bg-gray-100"
                      }`}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="h-8 w-8 object-contain sm:h-10 sm:w-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
