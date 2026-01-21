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
      slug: "simba",                          
      title: "SIMBA",
      description:
        "SIMBA is a web-based system that enables the comprehensive integration of asset management and inventory control processes, including general warehouse management.",
      image: Simba,
      role: "Backend Developer",
      technologies: ["Laravel", "PHP"],
      color: "#FF2D55",
      githubLink: "https://github.com/fauzul91/inventory-rsud",
    },
    {
      id: 2,
      slug: "simbako",                          
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
      id: 3,
      slug: "sepadu",
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
      id: 4,
      slug: "it-convert",
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
      id: 5,
      slug: "profile-website",
      title: "Profile Website",
      description:
        "A personal portfolio website designed to showcase personal profile, completed projects, technical skills, and organizational experience.",
      image: Portfolio,
      role: "Front-End Developer",
      technologies: ["React", "Tailwind"],
      color: "#FF2D55",
      githubLink: "https://github.com/ahmadrahardan/portfolio-web",
    },
    {
      id: 6,
      slug: "hey-brew",
      title: "Hey Brew",
      description:
        "A Web-Based Coffee Bean Management and Recommendation System for Dopy Coffee",
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
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.fromTo(
        ".section-subtitle",
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.05 }
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
    left1: { x: -280, scale: 0.75, zIndex: 3, opacity: 0.9 },
    left: { x: -520, scale: 0.6, zIndex: 2, opacity: 0.6 },
    right: { x: 520, scale: 0.6, zIndex: 2, opacity: 0.6 },
    right1: { x: 280, scale: 0.75, zIndex: 3, opacity: 0.9 },
  };

  // Variants mobile
  const cardVariantsMobile: Record<PosKey, any> = {
    center: { x: 0, scale: 1, zIndex: 5, opacity: 1 },
    left1: { x: -200, scale: 0.88, zIndex: 3, opacity: 0.95 },
    left: { x: -340, scale: 0.78, zIndex: 2, opacity: 0.6 },
    right: { x: 340, scale: 0.78, zIndex: 2, opacity: 0.6 },
    right1: { x: 200, scale: 0.88, zIndex: 3, opacity: 0.95 },
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
                  onClick={() => openDetail(p.slug)}                 
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openDetail(p.slug)}
                  className={`cursor-pointer rounded-2xl overflow-hidden shadow-xl border ${
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

                        <div className="pt-4 flex gap-3">
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
                        </div>
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
                  onClick={() => openDetail(p.slug)}                 
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && openDetail(p.slug)}
                  className={`cursor-pointer rounded-2xl overflow-hidden ${
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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
                        </div>
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
