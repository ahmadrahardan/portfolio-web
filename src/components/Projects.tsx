import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

import Simbako from "../assets/Simbako.webp";
import Sepadu from "../assets/Sepadu.webp";
import ITC from "../assets/ITC.webp";
import Portfolio from "../assets/Portfolio.webp";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  role: string;
  technologies: string[];
  color: string;
  githubLink?: string;
  demoLink?: string;
};

const ProjectsSection: React.FC = () => {
  const { darkMode } = useTheme();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  const projects: Project[] = [
    {
      id: 1,
      title: "Simbako",
      description:
        "Simbako is a training and education submission system for the tobacco industry in Jember, designed to facilitate training applications and enhance industry knowledge.",
      image: Simbako,
      role: "Fullstack Developer",
      technologies: ["Laravel", "PHP", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://github.com/ahmadrahardan/simbako",
    },
    {
      id: 2,
      title: "Sepadu",
      description:
        "Sepadu is an integrated training system for industries in Jember Regency, designed to help business owners submit training requests to the Department of Trade and Industry.",
      image: Sepadu,
      role: "Fullstack Developer",
      technologies: ["Laravel", "PHP", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://github.com/ahmadrahardan/sepadu",
    },
    {
      id: 3,
      title: "IT Convert",
      description:
        "IT Convert is a website by the Information Systems Student Association for participating in and submitting competition proposals in the field of Information and Communication Technology.",
      image: ITC,
      role: "Fullstack Developer",
      technologies: ["Laravel", "PHP", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://itconvert.himasif.id/",
    },
    {
      id: 4,
      title: "Profile Website",
      description:
        "A personal portfolio website designed to showcase personal profile, completed projects, technical skills, and organizational experience.",
      image: Portfolio,
      role: "Front-End Developer",
      technologies: ["React", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://github.com/ahmadrahardan/portfolio-web",
    },
  ];

  // responsive flag
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // entrance anim (run on mount & when theme changes)
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-title",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
      // gsap.fromTo(
      //   ".project-card",
      //   { y: 18, opacity: 0 },
      //   { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.04, delay: 0.05 }
      // );
    }, sectionRef);
    return () => ctx.revert();
  }, [darkMode]);

  // keyboard & wheel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % projects.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + projects.length) % projects.length);
    };
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (d > 10) setActive((i) => (i + 1) % projects.length);
      if (d < -10)
        setActive((i) => (i - 1 + projects.length) % projects.length);
    };
    window.addEventListener("keydown", onKey);
    stageRef.current?.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      stageRef.current?.removeEventListener("wheel", onWheel as any);
    };
  }, [projects.length]);

  // autoplay
  // useEffect(() => {
  //   const AUTOPLAY_MS = 3500;
  //   const id = setInterval(() => {
  //     if (!pausedRef.current) setActive((i) => (i + 1) % projects.length);
  //   }, AUTOPLAY_MS);
  //   const onVisibility = () => {
  //     pausedRef.current = document.hidden || pausedRef.current;
  //   };
  //   document.addEventListener("visibilitychange", onVisibility);
  //   return () => {
  //     clearInterval(id);
  //     document.removeEventListener("visibilitychange", onVisibility);
  //   };
  // }, [projects.length]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  // geometry / coverflow spacing (responsive)
  const CARD_W = isMobile ? 360 : 720;
  const stepX = useMemo(
    () => CARD_W * (isMobile ? 0.5 : 0.52),
    [CARD_W, isMobile]
  );
  const maxVisible = isMobile ? 2 : 3;

  const styleFor = (idx: number) => {
    const off = idx - active;
    const abs = Math.abs(off);
    const tx = off * stepX;
    const ty = abs * (isMobile ? 3 : 6);
    const rotY = -(off * (isMobile ? 6 : 10));
    const scale = Math.max(isMobile ? 0.78 : 0.7, 1 - abs * 0.1);
    const opacity = abs > maxVisible ? 0 : 1 - abs * 0.08;
    const z = 100 - abs;
    return {
      transform: `translateX(${tx}px) translateY(${ty}px) scale(${scale}) rotateY(${rotY}deg)`,
      zIndex: z,
      opacity,
      filter: abs === 0 ? "none" : "blur(0.6px)",
    };
  };

  const dragX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX;
    pause();
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current == null) return;
    const dx = e.clientX - dragX.current;
    if (dx < -60) setActive((i) => (i + 1) % projects.length);
    if (dx > 60) setActive((i) => (i - 1 + projects.length) % projects.length);
    dragX.current = null;
    resume();
  };

  const themeGlow = darkMode
    ? "from-[#FF2D55] via-[#ff7ab7] to-[#2563eb]"
    : "from-[#d97706] via-[#dc2626] to-[#a21caf]";

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } transition-colors relative duration-500 py-14 sm:py-16 md:py-20`}
    >
      {/* ======= CORNER GLOWS ======= */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
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
              ? "rgba(59,130,246,0.85)"
              : "rgba(59,130,246,0.5)",
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
            bottom: "-18rem",
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
              ? "rgba(255,45,85,0.9)"
              : "rgba(255,45,85,0.6)",
          }}
        />
      </div>
      {/* ======= /CORNER GLOWS ======= */}

      <div className="container mx-auto px-5 md:px-10 max-w-screen-xl">
        {/* Head */}
        <div className="text-center">
          <h2
            className={`section-title text-4xl md:text-6xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            <span className="relative inline-block">
              My{" "}
              <span className={darkMode ? "text-[#FF2D55]" : "text-[#FF2D55]"}>
                Project
              </span>
              <span
                className={`absolute -bottom-1 z-[-1] left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
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
            Dive Into My Work
          </p>
        </div>

        {/* STAGE */}
        <div
          ref={stageRef}
          className="relative h-[360px] sm:h-[420px] md:h-[560px] overflow-hidden select-none"
          style={{ perspective: "1400px" }}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={pause}
          onMouseLeave={resume}
        >
          {/* ARROWS */}
          <button
            onClick={() =>
              setActive((i) => (i - 1 + projects.length) % projects.length)
            }
            onFocus={pause}
            onBlur={resume}
            className={`group absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-[999]
                        w-10 h-10 sm:w-12 sm:h-12 rounded-full
                        ${
                          darkMode
                            ? "bg-white/10 text-white"
                            : "bg-gray-200 text-gray-900"
                        }
                        border ${
                          darkMode ? "border-white/20" : "border-black/10"
                        } backdrop-blur
                        transition hover:scale-110 active:scale-95`}
            aria-label="Previous slide"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => setActive((i) => (i + 1) % projects.length)}
            onFocus={pause}
            onBlur={resume}
            className={`group absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-[999]
                        w-10 h-10 sm:w-12 sm:h-12 rounded-full
                        ${
                          darkMode
                            ? "bg-white/10 text-white"
                            : "bg-gray-200 text-gray-900"
                        }
                        border ${
                          darkMode ? "border-white/20" : "border-black/10"
                        } backdrop-blur
                        transition hover:scale-110 active:scale-95`}
            aria-label="Next slide"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 sm:w-6 sm:h-6 mx-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* CARDS */}
          <div className="absolute inset-0 flex items-center justify-center">
            {projects.map((p, i) => {
              const isCenter = i === active;
              return (
                <motion.div
                  key={p.id}
                  className="project-card absolute max-w-[94vw] w-[86vw] sm:w-[560px] md:w-[720px] aspect-video origin-center will-change-transform"
                  initial={false}
                  animate={styleFor(i) as any}
                  transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  onClick={() => setActive(i)}
                >
                  {/* OUTER GLOW only active (lebih kecil di mobile) */}
                  {isCenter && (
                    <div
                      className={`pointer-events-none absolute -inset-1 sm:-inset-1 md:-inset-2
                                  rounded-[16px] sm:rounded-[18px] md:rounded-[20px]
                                  blur-[10px] sm:blur-[14px] md:blur-[18px]
                                  opacity-40 sm:opacity-45 md:opacity-50 z-0 bg-gradient-to-r ${themeGlow}`}
                    />
                  )}

                  <div
                    className={`relative z-10 w-full h-full rounded-2xl overflow-hidden border
    ${darkMode ? "bg-[#111827] border-white/10" : "bg-white border-gray-200"}
    ${isCenter ? "shadow-2xl" : "shadow-lg"}`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
                    <div
                      className="absolute inset-0"
                      style={{ boxShadow: `inset 0 0 120px rgba(0,0,0,.35)` }}
                    />

                    {/* Role & Technologies di pojok kiri atas */}
                    <div className="absolute top-0 left-0 p-5 sm:p-6 md:p-8 flex flex-col gap-2 z-20">
                      <span
                        className="px-3 py-1 w-max rounded-full text-xs text-white shadow"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.role}
                      </span>
                      
                    </div>

                    <div className="absolute top-0 right-0 p-5 sm:p-6 md:p-8 flex flex-col gap-2 z-20">
                      <div className="flex flex-wrap gap-2">
                        {p.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-white/35 text-white/90 px-3 py-1 rounded-full text-xs backdrop-blur"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title & Description tetap di bawah */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end max-w-[90%] sm:max-w-[90%]">
                      <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                        {p.title}
                      </h3>
                      <p className="text-white/85 text-sm md:text-base line-clamp-3">
                        {p.description}
                      </p>
                      <div className="mt-2 flex gap-3">
                        {p.githubLink && (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#FF2D55] hover:bg-white hover:text-[#FF2D55] text-white px-4 py-2 rounded-md text-sm font-medium backdrop-blur"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Code
                          </a>
                        )}
                        {p.demoLink && (
                          <a
                            href={p.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white px-4 py-2 rounded-md text-sm font-medium"
                            style={{ backgroundColor: p.color }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Inner glow */}
                    {isCenter && (
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{
                          boxShadow: `0 0 ${isMobile ? 60 : 90}px ${
                            p.color
                          }33 inset`,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* indicators */}
        <div className="mt-6 md:mt-8 flex items-center justify-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              onFocus={pause}
              onBlur={resume}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-8" : "w-2"
              }
                ${
                  darkMode
                    ? i === active
                      ? "bg-white"
                      : "bg-white/30"
                    : i === active
                    ? "bg-gray-900"
                    : "bg-gray-400/50"
                }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
