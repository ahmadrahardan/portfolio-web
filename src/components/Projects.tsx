import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

import Simbako from "../assets/Simbako.webp";
import Sepadu from "../assets/Sepadu.webp";
import ITC from "../assets/ITC.webp";
import Portfolio from "../assets/Portfolio.webp";
import HeyBrew from "../assets/HeyBrew.webp";
import SSO from "../assets/SSO.webp";
import Simba from "../assets/Simba.webp";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  slug: string;
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
  const navigate = useNavigate();

  const projects: Project[] = [
    {
      id: 1,
      slug: "simbako",
      title: "Simbako",
      description:
        "Simbako is a training system for the tobacco industry in Jember, streamlining training applications and improving industry knowledge.",
      image: Simbako,
      role: "Fullstack Developer",
      technologies: ["Laravel", "PHP", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://github.com/ahmadrahardan/simbako",
    },
    {
      id: 2,
      slug: "sepadu",
      title: "Sepadu",
      description:
        "Sepadu is an integrated training platform for industries in Jember Regency to submit training requests.",
      image: Sepadu,
      role: "Fullstack Developer",
      technologies: ["Laravel", "PHP", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://github.com/ahmadrahardan/sepadu",
    },
    {
      id: 3,
      slug: "it-convert",
      title: "IT Convert",
      description:
        "IT Convert is a website developed by the Information Systems Student Association for submitting and managing ICT competition proposals.",
      image: ITC,
      role: "Frontend Developer",
      technologies: ["Laravel", "PHP", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://itconvert.himasif.id/",
    },
    {
      id: 4,
      slug: "profile-website",
      title: "Profile Website",
      description:
        "A personal portfolio website designed to showcase personal profile, completed projects, technical skills, and organizational experience.",
      image: Portfolio,
      role: "Frontend Developer",
      technologies: ["React", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://github.com/ahmadrahardan/portfolio-web",
    },
    {
      id: 5,
      slug: "sso",
      title: "Single Sign-On (SSO)",
      description:
        "SSO (Single Sign-On) is an authentication mechanism that allows users to access multiple applications or systems with a single login.",
      image: SSO,
      role: "Backend Developer",
      technologies: ["Laravel", "PHP"],
      color: "#FF2D55",
      githubLink: "https://github.com/fauzul91/inventory-rsud",
    },
    {
      id: 6,
      slug: "simba",
      title: "SIMBA",
      description:
        "SIMBA is a web-based system that enables the comprehensive integration of asset management and inventory control processes.",
      image: Simba,
      role: "Backend Developer",
      technologies: ["Laravel", "PHP"],
      color: "#FF2D55",
      githubLink: "https://github.com/fauzul91/inventory-rsud",
    },
    {
      id: 7,
      slug: "hey-brew",
      title: "Hey Brew",
      description:
        "Hey Brew is a web-based coffee bean management and recommendation system for Dopy Coffee.",
      image: HeyBrew,
      role: "System Analyst",
      technologies: ["Enterprise Architect"],
      color: "#FF2D55",
    },
  ];

  // Title animation in
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".section-title",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      );
      gsap.fromTo(
        ".section-subtitle",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.05 },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [darkMode]);

  // Slider tanpa loop
  const positions = ["center", "left1", "left", "right", "right1"] as const;
  type PosKey = (typeof positions)[number];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    if (currentIndex < projects.length - 1) setCurrentIndex((p) => p + 1);
  };
  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((p) => p - 1);
  };

  // Navigasi ke detail
  const openDetail = (slug: string) => navigate(`/projects/${slug}`);

  // Variants desktop (asli)
  const cardVariantsDesktop: Record<PosKey, any> = {
    center: { x: 0, scale: 1, zIndex: 5, opacity: 1 },
    left1: { x: -200, scale: 0.85, zIndex: 3, opacity: 0.9 },
    left: { x: -320, scale: 0.75, zIndex: 2, opacity: 0.3 },
    right1: { x: 200, scale: 0.85, zIndex: 3, opacity: 0.9 },
    right: { x: 320, scale: 0.75, zIndex: 2, opacity: 0.3 },
  };

  // Variants mobile
  const cardVariantsMobile: Record<PosKey, any> = {
    center: { x: 0, scale: 1, zIndex: 5, opacity: 1 },
    left1: { x: -140, scale: 0.9, zIndex: 3, opacity: 0.9 },
    left: { x: -220, scale: 0.85, zIndex: 2, opacity: 0.3 },
    right1: { x: 140, scale: 0.9, zIndex: 3, opacity: 0.9 },
    right: { x: 220, scale: 0.85, zIndex: 2, opacity: 0.3 },
  };

  const panelBg = darkMode ? "bg-[#0B1220]" : "bg-white";

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } transition-colors duration-500 pt-20 relative overflow-x-hidden pb-20`}
    >
      {/* ======= CORNER GLOWS ======= */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
            top: "1rem",
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
            bottom: "-18rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(59,130,246,0.85)"
              : "rgba(59,130,246,0.5)",
          }}
        /> */}
        {/* bottom-right */}
        {/* <span
          className="about-glow"
          style={{
            right: "-20rem",
            bottom: "-1rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(59,130,246,0.85)"
              : "rgba(59,130,246,0.5)",
          }}
        /> */}
      </div>
      {/* ======= /CORNER GLOWS ======= */}

      <div className="container mx-auto px-5 md:px-10 max-w-screen-xl">
        {/* TITLE */}
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

        {/* ===== MOBILE (≤ md) ===== */}
        <div className="relative mt-10 min-h-[520px] overflow-visible md:hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {projects.map((p, index) => {
              const posKey = ((): PosKey | null => {
                if (index === currentIndex) return "center";
                if (index === currentIndex - 1) return "left1";
                if (index === currentIndex - 2) return "left";
                if (index === currentIndex + 1) return "right1";
                if (index === currentIndex + 2) return "right";
                return null;
              })();
              if (!posKey) return null;
              const isCenter = posKey === "center";

              return (
                <motion.div
                  key={`m-${p.id}`}
                  initial={false}
                  animate={posKey}
                  variants={cardVariantsMobile}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ position: "absolute" }}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openDetail(p.slug)}
                  className={`rounded-2xl overflow-hidden shadow-xl border ${
                    darkMode ? "border-white/10" : "border-gray-200"
                  } ${
                    isCenter
                      ? "shadow-[0_10px_40px_rgba(255,45,85,0.35)] ring-1 ring-[#FF2D55]/30"
                      : ""
                  }`}
                >
                  {/* Card MOBILE */}
                  <div className="w-[92vw] max-w-[320px] h-[500px] sm:h-[520px] flex flex-col overflow-hidden">
                    <div className="relative w-full basis-[40%] shrink-0">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className={`${panelBg} basis-[60%] p-5 flex flex-col`}>
                      <span
                        className="inline-flex w-max self-start px-2.5 py-0.5 rounded-full text-[11px] text-white"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.role}
                      </span>

                      <div className="flex flex-col items-start justify-center">
                        <h3
                          className={`mt-3 text-xl font-bold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {p.title}
                        </h3>

                        <p
                          className={`mt-2 text-sm leading-snug ${
                            darkMode ? "text-white/80" : "text-gray-600"
                          } line-clamp-5`}
                        >
                          {p.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.technologies.map((t, idx) => (
                            <span
                              key={idx}
                              className={`${
                                darkMode
                                  ? "bg-white/10 text-white/90"
                                  : "bg-gray-100 text-gray-700"
                              } px-2.5 py-0.5 rounded-full text-[11px]`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div
                          className="cursor-pointer pt-4 flex gap-3"
                          onClick={() => openDetail(p.slug)}
                        >
                          <div className="bg-[#FF2D55] hover:bg-white hover:text-[#FF2D55] text-white px-4 py-2 rounded-md text-sm font-medium">
                            View Detail
                          </div>
                        </div>

                        {/* <div className="pt-4 flex gap-3">
                          {p.githubLink && (
                            <a
                              href={p.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#FF2D55] hover:bg-white hover:text-[#FF2D55] text-white px-4 py-2 rounded-md text-sm font-medium"
                              onClick={(e) => e.stopPropagation()} // tetap supaya klik tombol tidak buka detail
                            >
                              View Code
                            </a>
                          )}
                          {p.demoLink && (
                            <a
                              href={p.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 rounded-md text-sm font-medium text-white"
                              style={{ backgroundColor: p.color }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              Live Demo
                            </a>
                          )}
                        </div> */}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden mt-4 flex justify-center gap-3">
          <button
            aria-label="Previous project"
            onClick={handleBack}
            disabled={currentIndex === 0}
            className={`rounded-md py-2 px-4 transition ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            } text-white bg-[#FF2D55]`}
          >
            Back
          </button>
          <button
            aria-label="Next project"
            onClick={handleNext}
            disabled={currentIndex === projects.length - 1}
            className={`rounded-md py-2 px-4 transition ${
              currentIndex === projects.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 active:scale-95"
            } text-white bg-[#FF2D55]`}
          >
            Next
          </button>
        </div>

        <div className="relative -mt-2 min-h-[500px] overflow-visible hidden md:block">
          <div className="absolute inset-0 flex items-center justify-center">
            {projects.map((p, index) => {
              const posKey = ((): PosKey | null => {
                if (index === currentIndex) return "center";
                if (index === currentIndex - 1) return "left1";
                if (index === currentIndex - 2) return "left";
                if (index === currentIndex + 1) return "right1";
                if (index === currentIndex + 2) return "right";
                return null;
              })();
              if (!posKey) return null;
              const isCenter = posKey === "center";

              return (
                <motion.div
                  key={`d-${p.id}`}
                  initial={false}
                  animate={posKey}
                  variants={cardVariantsDesktop}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ position: "absolute" }}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openDetail(p.slug)}
                  className={`rounded-2xl overflow-hidden ${
                    darkMode ? "bg-[#111827]" : "bg-white"
                  } shadow-xl border ${
                    darkMode ? "border-white/10" : "border-gray-200"
                  } ${
                    isCenter
                      ? "shadow-[0_10px_40px_rgba(255,45,85,0.35)] ring-1 ring-[#FF2D55]/30"
                      : ""
                  }`}
                >
                  <div className="relative w-[56vw] max-w-[460px] md:max-w-[700px] h-[380px]">
                    <>
                      <img
                        src={p.image}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
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
                              className="text-white px-3 py-1 rounded-full text-xs"
                              style={{ backgroundColor: p.color }}
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
                        <p className="text-white/95 mt-1 text-sm md:text-base line-clamp-3">
                          {p.description}
                        </p>
                        <div
                          className="
                            mt-3 inline-flex items-center gap-2
                            text-white text-sm md:text-base font-medium
                          "
                        >
                          <span
                            className="
                            relative cursor-pointer
                            group
                            transition-colors duration-300
                            hover:text-[#FF2D55]
                          "
                            onClick={() => openDetail(p.slug)}
                          >
                            View Project Details <span>→</span>
                            <span
                              className="
                              absolute left-0 -bottom-1
                              w-0 h-[1px]
                              bg-[#FF2D55]
                              transition-all duration-300
                              group-hover:w-full
                            "
                            />
                          </span>
                        </div>
                        {/* <div className="mt-3 flex gap-3">
                          {p.githubLink && (
                            <a
                              href={p.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#FF2D55]  hover:bg-white hover:text-[#FF2D55] text-white px-4 py-2 rounded-md text-sm font-medium"
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
                        </div> */}
                      </div>
                    </>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="hidden md:flex flex-row gap-3 absolute left-1/2 -translate-x-1/2 bottom-1 z-50">
            <button
              aria-label="Previous project"
              onClick={handleBack}
              disabled={currentIndex === 0}
              className={`rounded-md py-2 px-4 border backdrop-blur transition ${
                currentIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 active:scale-95"
              } ${
                darkMode
                  ? "text-white bg-[#FF2D55] border-white/20"
                  : "text-white bg-[#FF2D55]"
              }`}
            >
              Back
            </button>
            <button
              aria-label="Next project"
              onClick={handleNext}
              disabled={currentIndex === projects.length - 1}
              className={`rounded-md py-2 px-4 border backdrop-blur transition ${
                currentIndex === projects.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105 active:scale-95"
              } ${
                darkMode
                  ? "text-white bg-[#FF2D55] border-white/20"
                  : "text-white bg-[#FF2D55]"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
