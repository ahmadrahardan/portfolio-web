import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Skill = {
  name: string;
  icon: string;
  type: "tech" | "tools";
  color: string;
};

const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tech" | "tools">("tech");
  const sectionRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const techTabRef = useRef<HTMLButtonElement>(null);
  const toolsTabRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();
  const [hasAnimated, setHasAnimated] = useState(false);

  const skills: Skill[] = [
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
      name: "JavaScript",
      icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
      type: "tech",
      color: "#F7DF1E",
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
      name: "Figma",
      icon: "https://cdn.simpleicons.org/figma/F24E1E",
      type: "tools",
      color: "#F24E1E",
    },
    {
      name: "Canva",
      icon: "https://cdn.simpleicons.org/canva/00C4CC",
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
  ];

  const updateIndicatorBackgroundColor = useCallback(() => {
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        backgroundColor:
          activeTab === "tech"
            ? darkMode
              ? "#FF2D55"
              : "#FF2D55"
            : darkMode
            ? "#FF2D55"
            : "#FF2D55",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [activeTab, darkMode]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (!hasAnimated) {
        gsap.from(".section-title", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        gsap.from(".section-subtitle", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
        });

        gsap.from(".tab-container", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "back.out(1.2)",
        });

        setHasAnimated(true);
      }

      gsap.from(".skill-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out",
      });

      updateIndicatorBackgroundColor();
    }, sectionRef);

    return () => ctx.revert();
  }, [updateIndicatorBackgroundColor, hasAnimated]);

  const handleTabChange = (tab: "tech" | "tools") => setActiveTab(tab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
    hover: {
      y: -5,
      scale: 1.03,
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.15,
      rotate: [0, 5, -2, 0] as [number, number, number, number],
      transition: { duration: 0.6, ease: "easeInOut" as const },
    },
  };

  const themeBorderStops = darkMode
    ? ["#FF2D55", "#ff7ab7", "#2563eb"]
    : ["#d97706", "#dc2626", "#a21caf"];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`py-20 relative ${
        darkMode ? "bg-gray-900" : "bg-white"
      } transition-colors duration-500`}
    >
      {/* ======= CORNER GLOWS ======= */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        <style>{`
    .about-glow{
      position:absolute;
      width:28rem;height:28rem;
      filter:blur(40px);
      opacity:.30;
      will-change:transform,opacity;
      background:radial-gradient(closest-side,var(--glowColor) 0%, rgba(0,0,0,0) 70%);
    }
    @media (min-width:768px){
      .about-glow{width:44rem;height:44rem}
    }
  `}</style>

        {/* top-left */}
        <span
          className="about-glow"
          style={{
            left: "-20rem",
            top: "-5rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(255,45,85,0.9)"
              : "rgba(255,45,85,0.6)",
          }}
        />
        {/* top-right */}
        {/* <span
          className="about-glow"
          style={{
            right: "-10rem",
            top: "-20rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(168,85,247,0.8)"
              : "rgba(168,85,247,0.55)",
          }}
        /> */}
        {/* bottom-left */}
        {/* <span
          className="about-glow"
          style={{
            left: "-14rem",
            bottom: "-5rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(59,130,246,0.85)"
              : "rgba(59,130,246,0.5)",
          }}
        /> */}
        {/* bottom-right */}
        <span
          className="about-glow"
          style={{
            right: "-20rem",
            bottom: "-5rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(59,130,246,0.85)"
              : "rgba(59,130,246,0.5)",
          }}
        />
      </div>
      {/* ======= /CORNER GLOWS ======= */}

      <style>{`
        @property --angle { syntax: '<angle>'; inherits: false; initial-value: 0turn; }
        @keyframes spin { to { --angle: 1turn; } }

        .border-ring, .border-ring::before, .border-ring::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
        }
        .border-ring {
          --thickness: 3px;
          --angle: 0turn;
          background: conic-gradient(from var(--angle), var(--c1), var(--c2), var(--c3), var(--c1));
          padding: var(--thickness);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          animation: spin 14s linear infinite;
          filter: saturate(1.2);
        }
        .border-ring::before {
          --thickness: 2px;
          inset: 6px;
          padding: var(--thickness);
          background: conic-gradient(from calc(-1 * var(--angle)), var(--c3), var(--c2), var(--c1), var(--c3));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0.85;
          animation: spin 20s linear infinite reverse;
        }
        .border-ring::after {
          padding: 3px;
          background: conic-gradient(from calc(var(--angle) + 90deg), transparent 0deg, transparent 330deg, rgba(255,255,255,.9) 345deg, rgba(255,255,255,.9) 360deg);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          mix-blend-mode: screen;
          filter: blur(1px);
          opacity: .9;
          animation: spin 6s linear infinite;
        }
        .group:hover .border-ring { animation-duration: 8s; }
        .group:hover .border-ring::before { animation-duration: 12s; }
        .group:hover .border-ring::after { animation-duration: 3.5s; }

        .focusable-card {
          outline: none;
          -webkit-tap-highlight-color: transparent;
        }
        .focusable-card:focus,
        .focusable-card:focus-visible,
        .focusable-card:focus-within {
          outline: none;
        }

        .icon-wrap {
          position: relative;
          border-radius: 0.5rem;
          isolation: isolate;
          z-index: 1;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .icon-wrap::after {
          content: "";
          position: absolute;
          inset: -18px;
          border-radius: inherit;
          z-index: 0;
          opacity: 0;
          transform: scale(0.95);
          filter: blur(10px);
          background: radial-gradient(60% 60% at 50% 50%, var(--glow) 0%, transparent 70%);
          transition: opacity .25s ease, transform .25s ease, filter .25s ease;
        }

        .focusable-card:hover .icon-wrap,
        .focusable-card:focus .icon-wrap,
        .focusable-card:focus-visible .icon-wrap,
        .focusable-card:focus-within .icon-wrap {
          box-shadow:
            0 0 24px var(--glow),
            0 0 60px rgba(0,0,0,.10);
          transform: translateY(-2px);
        }
        .focusable-card:hover .icon-wrap::after,
        .focusable-card:focus .icon-wrap::after,
        .focusable-card:focus-visible .icon-wrap::after,
        .focusable-card:focus-within .icon-wrap::after {
          opacity: 0.5;
          transform: scale(1);
          filter: blur(8px);
        }

        @media (prefers-reduced-motion: reduce) {
          .border-ring, .border-ring::before, .border-ring::after { animation: none !important; }
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-10">
          <h2
            className={`section-title text-4xl md:text-6xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            <span className="relative inline-block">
              Tech{" "}
              <span className={darkMode ? "text-[#FF2D55]" : "text-[#FF2D55]"}>
                Stack
              </span>
              <span
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
                  darkMode ? "via-red-400" : "via-red-400"
                } to-transparent mt-2`}
              />
            </span>
          </h2>
          <p
            className={`section-subtitle text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tools & tech that power the products I build
          </p>
        </div>

        <div className="flex justify-center mb-12 md:mb-16 tab-container">
          <div
            ref={tabsRef}
            className={`relative inline-flex rounded-full p-1 ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            } shadow-inner`}
          >
            <button
              ref={techTabRef}
              type="button"
              className={`relative px-6 py-2 rounded-full text-sm font-medium z-10 transition-colors duration-300 ${
                activeTab === "tech"
                  ? "text-white"
                  : `${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-900"
                    }`
              }`}
              onClick={() => handleTabChange("tech")}
            >
              Technologies
            </button>
            <button
              ref={toolsTabRef}
              type="button"
              className={`relative px-6 py-2 rounded-full text-sm font-medium z-10 transition-colors duration-300 ${
                activeTab === "tools"
                  ? "text-white"
                  : `${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-900"
                    }`
              }`}
              onClick={() => handleTabChange("tools")}
            >
              Tools
            </button>

            <div
              ref={indicatorRef}
              className="absolute top-1 h-[calc(100%-0.5rem)] rounded-full z-0"
              style={{
                width:
                  activeTab === "tech"
                    ? techTabRef.current?.offsetWidth
                    : toolsTabRef.current?.offsetWidth,
                left:
                  activeTab === "tech"
                    ? "0.25rem"
                    : `${(techTabRef.current?.offsetWidth || 0) + 4}px`,
                transition: "width 0.3s ease, left 0.3s ease",
                backgroundColor: darkMode ? "#2563eb" : "#3b82f6",
              }}
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="wait">
            {skills
              .filter((skill) => skill.type === activeTab)
              .map((skill) => (
                <motion.div
                  key={`${activeTab}-${skill.name}`}
                  variants={itemVariants}
                  whileHover="hover"
                  className="skill-card relative group"
                  layout
                >
                  <div
                    tabIndex={0}
                    role="button"
                    aria-label={`Skill ${skill.name}`}
                    className={`focusable-card relative isolate h-full flex flex-col items-center p-4 sm:p-5 rounded-xl transition-all duration-300 ${
                      darkMode ? "bg-gray-800" : "bg-white"
                    } shadow-md hover:shadow-lg overflow-hidden`}
                    style={
                      {
                        ["--c1" as any]: themeBorderStops[0],
                        ["--c2" as any]: themeBorderStops[1],
                        ["--c3" as any]: themeBorderStops[2],
                      } as React.CSSProperties
                    }
                  >
                    <div className="absolute inset-0 rounded-xl z-0 border-ring" />

                    <div className="relative z-10 w-full h-full flex flex-col items-center">
                      <motion.div
                        className={`icon-wrap w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center rounded-lg transition-all duration-300 ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                        style={
                          {
                            ["--glow" as any]: skill.color,
                          } as React.CSSProperties
                        }
                        variants={iconVariants}
                        whileHover="hover"
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                      </motion.div>

                      <h3
                        className={`font-semibold text-center text-sm sm:text-base ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
