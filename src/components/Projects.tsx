import React, { useEffect, useMemo, useRef, useState, memo } from "react";
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

  // entrance anim
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-title",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [darkMode]);

  // ====== INPUT THROTTLE (ringan) ======
  const canSlideRef = useRef(true);
  const slide = (dir: number) => {
    if (!canSlideRef.current) return;
    canSlideRef.current = true;
    setActive((i) => (i + dir + projects.length) % projects.length);
    // throttle ~250ms
    canSlideRef.current = false;
    setTimeout(() => (canSlideRef.current = true), 250);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") slide(1);
      if (e.key === "ArrowLeft") slide(-1);
    };
    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (d > 14) slide(1);
      if (d < -14) slide(-1);
    };
    window.addEventListener("keydown", onKey);
    stageRef.current?.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      stageRef.current?.removeEventListener("wheel", onWheel as any);
    };
  }, [projects.length]);

  // ====== GEOMETRY (dipermudah) ======
  const CARD_W = isMobile ? 330 : 720;
  const stepX = useMemo(
    () => CARD_W * (isMobile ? 0.56 : 0.52),
    [CARD_W, isMobile]
  );
  const maxVisible = isMobile ? 2 : 3;

  const styleFor = (idx: number) => {
    const off = idx - active;
    const abs = Math.abs(off);
    const tx = off * stepX;
    const ty = abs * 6;
    const scale = Math.max(isMobile ? 0.92 : 0.82, 1 - abs * 0.1);
    const opacity = abs > maxVisible ? 0 : 1 - abs * 0.08;
    const zIndex = 100 - abs;
    // transform ringan (tanpa rotateY/blur)
    return {
      transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  // Render hanya sekitar slide aktif
  const windowRange = 2; // kiri/kanan
  const visibleIndices = useMemo(() => {
    const arr: number[] = [];
    for (let i = active - windowRange; i <= active + windowRange; i++) {
      const idx = (i + projects.length) % projects.length;
      if (!arr.includes(idx)) arr.push(idx);
    }
    return arr;
  }, [active, projects.length]);

  // ====== RESPONSIVE HELPERS ======
  // const cardAspectClass = isMobile ? "h-[480px] flex flex-col" : "aspect-video";
  const stageHeightClass = isMobile ? "h-[640px]" : "h-[560px]";

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } transition-colors relative duration-500 py-14 sm:py-16 md:py-20`}
    >
      <div className="container mx-auto px-5 md:px-10 max-w-screen-xl">
        {/* Head */}
        <div className="text-center">
          <h2
            className={`section-title text-4xl md:text-6xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            <span className="relative inline-block">
              My <span className="text-[#FF2D55]">Project</span>
              <span className="absolute -bottom-1 z-[-1] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" />
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
          className={`relative ${stageHeightClass} sm:h-[420px] md:h-[560px] overflow-hidden select-none`}
          style={{ perspective: "1000px" }}
        >
          {/* ARROWS */}
          <button
            onClick={() => slide(-1)}
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
            onClick={() => slide(1)}
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
              // render hanya kartu di jendela
              if (!visibleIndices.includes(i)) return null;
              const isCenter = i === active;
              return (
                <LightProjectCard
                  key={p.id}
                  project={p}
                  isCenter={isCenter}
                  isMobile={isMobile}
                  darkMode={darkMode}
                  styleFor={() => styleFor(i)}
                  onClick={() => setActive(i)}
                />
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

type CardProps = {
  project: Project;
  isCenter: boolean;
  isMobile: boolean;
  darkMode: boolean;
  styleFor: () => React.CSSProperties;
  onClick: () => void;
};

const LightProjectCard = memo<CardProps>(
  ({ project: p, isCenter, isMobile, darkMode, styleFor, onClick }) => {
    // kelas responsif
    const cardAspectClass = isMobile
      ? "h-[480px] flex flex-col"
      : "aspect-video";

    return (
      <motion.div
        className={`project-card absolute max-w-[94vw] w-[65vw] sm:w-[560px] md:w-[720px] ${cardAspectClass} origin-center`}
        initial={false}
        animate={styleFor() as any}
        transition={{ duration: 0.25, ease: "easeOut" }} // tween ringan
        onClick={onClick}
        style={{ willChange: "transform, opacity" }}
      >
        <div
          className={`relative z-10 w-full h-full rounded-2xl overflow-hidden border ${
            darkMode
              ? "bg-[#111827] border-white/10"
              : "bg-white border-gray-200"
          } ${isCenter ? "shadow-xl" : "shadow"} transition-shadow`}
        >
          {/* ====== MOBILE: SPLIT (ringan) ====== */}
          {isMobile ? (
            <div className="flex flex-col h-full">
              {/* image (1/3) */}
              <div className="h-1/3 w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* text (2/3) */}
              <div className="h-2/3 w-full p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-[11px] text-white"
                    style={{ backgroundColor: p.color }}
                  >
                    {p.role}
                  </span>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {p.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 dark:bg-white/15 text-gray-700 dark:text-white/90 px-2 py-1 rounded-full text-[11px] shrink-0"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3
                    className={`${
                      darkMode ? "text-white" : "text-gray-900"
                    } text-2xl font-bold`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`pt-2 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    } text-sm line-clamp-6`}
                  >
                    {p.description}
                  </p>
                </div>

                <div className="mt-1 flex gap-3">
                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FF2D55] hover:bg-white hover:text-[#FF2D55] text-white px-3 py-2 rounded-md text-sm font-medium"
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
                      className="px-3 py-2 rounded-md text-sm font-medium text-white"
                      style={{ backgroundColor: p.color }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* ====== DESKTOP: OVERLAY (tanpa shadow/blur berat) ====== */
            <>
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              {/* gradient tipis saja */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute top-0 left-0 p-6 flex flex-col gap-2 z-20">
                <span
                  className="px-3 py-1 w-max rounded-full text-xs text-white"
                  style={{ backgroundColor: p.color }}
                >
                  {p.role}
                </span>
              </div>
              <div className="absolute top-0 right-0 p-6 flex flex-col gap-2 z-20">
                <div className="flex flex-wrap gap-2">
                  {p.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="bg-white/35 text-white/90 px-3 py-1 rounded-full text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end max-w-[90%] z-20">
                <h3 className="text-white text-2xl md:text-3xl font-bold">
                  {p.title}
                </h3>
                <p className="text-white/85 text-sm md:text-base line-clamp-3">
                  {p.description}
                </p>

                <div className="mt-3 flex gap-3">
                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FF2D55] hover:bg-white hover:text-[#FF2D55] text-white px-4 py-2 rounded-md text-sm font-medium"
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
            </>
          )}
        </div>
      </motion.div>
    );
  }
);

LightProjectCard.displayName = "LightProjectCard";

export default ProjectsSection;
