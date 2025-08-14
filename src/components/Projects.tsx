import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

import BlindSonic from "../assets/Rahardan_.png";
import TourHomie from "../assets/Rahardan_.png";
import Maenklung from "../assets/Rahardan_.png";
import Innovixus from "../assets/Rahardan_.png";
import PakTelang from "../assets/Rahardan_.png";
import Profile from "../assets/Rahardan_.png";
import ApiIndo from "../assets/Rahardan_.png";
import Progress from "../assets/Rahardan_.png";

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
      title: "Blind Sonic",
      description:
        "Blind Sonic adalah aplikasi game interaktif untuk penyandang tunanetra yang memanfaatkan teknologi audio. Pengguna dapat menjelajahi dunia virtual melalui suara dan kontrol sederhana.",
      image: BlindSonic,
      role: "UI/UX Designer",
      technologies: ["Figma", "Adobe Ilustrator"],
      color: "#6A0DAD",
      demoLink:
        "https://www.figma.com/proto/3TuOq7jwQiX3rp5QiBumnp/Blind-Sonic---Game-untuk-Penyandang-Tunanetra?node-id=201-15&t=OdIdqIQEDEOmurhk-1",
    },
    {
      id: 2,
      title: "InnoVixus",
      description:
        "InnoVixus adalah sistem manajemen toko dan e-commerce terintegrasi yang dirancang untuk membantu pelaku usaha khususnya UMKM mengelola aktivitas operasional toko secara efisien, cerdas, dan modern.",
      image: Innovixus,
      role: "Fullstack Developer",
      technologies: ["Laravel", "PHP", "Tailwind", "AJAX"],
      color: "#003B73",
      githubLink: "https://github.com/ChieJuwonsFx/Belajar-PWEB",
    },
    {
      id: 3,
      title: "Pak Telang",
      description:
        "Prelovedia adalah platform online berbasis website yang didedikasikan untuk jual beli barang bekas berkualitas. Pengguna dapat dengan mudah dan aman menjual serta membeli berbagai jenis barang preloved.",
      image: PakTelang,
      role: "Designer",
      technologies: ["Figma", "Laravel", "React"],
      color: "#C39BD3",
      demoLink: "https://paktelang.up.railway.app/",
    },
    {
      id: 4,
      title: "Tour Homie",
      description:
        "TourHomie adalah aplikasi yang membantu wisatawan asing menemukan destinasi wisata sesuai preferensi mereka, menyediakan informasi tentang tempat wisata, kuliner, budaya lokal.",
      image: TourHomie,
      role: "UI/UX Designer",
      technologies: ["React Native", "Firebase", "Maps API"],
      color: "#8CBEDD",
      demoLink:
        "https://www.figma.com/proto/cxxXYJScbiqSmLs6doQtJX/TRAM---TourHomie?node-id=0-1&t=I1pRL1NwgsJGcXzJ-1",
    },
    {
      id: 5,
      title: "MAÉNKLUNG",
      description:
        "MAÉNKLUNG adalah platform web interaktif yang mengenalkan Angklung alat musik tradisional Indonesia melalui pendekatan digital…",
      image: Maenklung,
      role: "UI/UX Designer",
      technologies: ["HTML", "CSS", "JavaScript"],
      color: "#A0522D",
      githubLink: "https://github.com/ChieJuwonsFx/MAENKLUNG",
      demoLink: "https://maenklung.vercel.app/",
    },
    {
      id: 6,
      title: "API Wilayah Indonesia",
      description:
        "Sebuah API yang menyajikan data hierarki wilayah Indonesia mulai dari kabupaten/kota, kecamatan, hingga kelurahan…",
      image: ApiIndo,
      role: "Developer",
      technologies: ["JavaScript"],
      color: "#3498DB",
      githubLink: "https://github.com/ChieJuwonsFx/api-wilayah-indonesia",
      demoLink: "https://chiejuwonsfx.github.io/api-wilayah-indonesia/",
    },
    {
      id: 7,
      title: "Web Portofolio",
      description:
        "Website portofolio pribadi untuk menampilkan profil, proyek, skills, pengalaman, dan pencapaian.",
      image: Profile,
      role: "Front-End Developer",
      technologies: ["React", "Tailwind"],
      color: "#2980B9",
      githubLink: "https://github.com/ChieJuwonsFx/web-profile",
      demoLink: "https://richie-olajuwon-santoso.vercel.app/",
    },
    {
      id: 8,
      title: "CitaNext",
      description: "Pusat informasi lomba, magang, dan beasiswa.",
      image: Progress,
      role: "Fullstack Developer",
      technologies: ["Next", "React", "Tailwind"],
      color: "#2980B9",
    },
    {
      id: 9,
      title: "Eatsential",
      description:
        "Platform untuk mengetahui kandungan gizi & memantau konsumsi harian.",
      image: Progress,
      role: "Fullstack Developer",
      technologies: ["Next", "React", "Tailwind"],
      color: "#2980B9",
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
  useEffect(() => {
    const AUTOPLAY_MS = 3500;
    const id = setInterval(() => {
      if (!pausedRef.current) setActive((i) => (i + 1) % projects.length);
    }, AUTOPLAY_MS);
    const onVisibility = () => {
      pausedRef.current = document.hidden || pausedRef.current;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [projects.length]);

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
                      ${
                        darkMode
                          ? "bg-[#111827] border-white/10"
                          : "bg-white border-gray-200"
                      }
                      ${isCenter ? "shadow-2xl" : "shadow-lg"}`}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
                    <div
                      className="absolute inset-0"
                      style={{ boxShadow: `inset 0 0 120px rgba(0,0,0,.35)` }}
                    />

                    <div className="absolute inset-y-0 left-0 p-5 sm:p-6 md:p-8 flex flex-col justify-end max-w-[75%] sm:max-w-[70%]">
                      <span
                        className="px-3 py-1 w-max rounded-full text-xs text-white shadow mb-3"
                        style={{ backgroundColor: p.color }}
                      >
                        {p.role}
                      </span>
                      <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">
                        {p.title}
                      </h3>
                      <p className="text-white/85 mt-2 text-sm md:text-base line-clamp-3">
                        {p.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-white/15 text-white/90 px-3 py-1 rounded-full text-xs backdrop-blur"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-3">
                        {p.githubLink && (
                          <a
                            href={p.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/15 hover:bg-white/25 text-white px-4 py-2 rounded-md text-sm font-medium backdrop-blur"
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

                    {/* INNER GLOW only active (kurangi intensitas di mobile) */}
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
