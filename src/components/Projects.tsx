
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";

import CurvedRibbonGallery from "./CurvedRibbonGallery";

import Simbako from "../assets/Simbako.webp";
import Sepadu from "../assets/Sepadu.webp";
import ITC from "../assets/ITC.webp";
import Portfolio from "../assets/Portfolio.webp";
import HeyBrew from "../assets/HeyBrew.webp";
import SSO from "../assets/SSO.webp";
import Simba from "../assets/Simba.webp";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { slug: "simbako", title: "Simbako", image: Simbako },
  { slug: "sepadu", title: "Sepadu", image: Sepadu },
  { slug: "it-convert", title: "IT Convert", image: ITC },
  {
    slug: "profile-website",
    title: "Profile Website",
    image: Portfolio,
  },
  { slug: "sso", title: "Single Sign-On", image: SSO },
  { slug: "simba", title: "SIMBA", image: Simba },
  { slug: "hey-brew", title: "Hey Brew", image: HeyBrew },
];

export default function ProjectsSection() {
  const { darkMode } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    if (!section || !text) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const textElements = Array.from(text.children);

      // Animasi intro seperti HomeSection
      const timeline = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      timeline.fromTo(
        textElements,
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

      introTimelineRef.current = timeline;

      // Animasi ketika scroll masuk ke Projects
      ScrollTrigger.create({
        trigger: section,
        start: "top 85%",
        end: "bottom top",

        onEnter: () => {
          timeline.restart();
        },

        onEnterBack: () => {
          timeline.restart();
        },
      });
    }, section);

    // Replay ketika menu Projects diklik di Navbar
    const replayIntro = () => {
      const timeline = introTimelineRef.current;
      const section = sectionRef.current;

      if (!timeline || !section) return;

      const rect = section.getBoundingClientRect();

      // Hindari animasi terlalu awal saat smooth scroll
      if (
        rect.top < window.innerHeight * 0.85 &&
        rect.bottom > 0
      ) {
        timeline.restart();
      }
    };

    window.addEventListener(
      "portfolio-projects-intro",
      replayIntro
    );

    return () => {
      window.removeEventListener(
        "portfolio-projects-intro",
        replayIntro
      );

      introTimelineRef.current = null;
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="
        relative
        overflow-hidden
        pt-20
        pb-0
        bg-transparent
        transition-colors
        duration-500
      "
    >
      {/* TITLE */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 md:px-10">
        <div ref={textRef} className="text-center">
          <h2
            className={`mb-4 text-4xl font-extrabold md:text-6xl ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="relative inline-block">
              My{" "}
              <span className="text-[#FF2D55]">
                Project
              </span>

              <span
                className="
                  absolute
                  -bottom-1
                  left-0
                  h-0.5
                  w-full
                  bg-gradient-to-r
                  from-transparent
                  via-red-400
                  to-transparent
                "
              />
            </span>
          </h2>

          <p
            className={`text-lg ${
              darkMode
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            Dive Into My Work
          </p>
        </div>
      </div>

      {/* CURVED RIBBON GALLERY - TIDAK DIANIMASIKAN */}
      <div className="relative -mt-4 h-[440px] w-full md:h-[565px]">
        <CurvedRibbonGallery
          content={{
            source: "Manual",
            images: projects.map((p) => ({
              src: p.image,
              alt: p.title,
              href: `/projects/${p.slug}`,
            })),
            enableLinks: true,
          }}
          interaction={{
            captureScroll: false,
            glide: 3.5,
          }}
          background={{
            showActiveBackground: false,
            bgFadeDuration: 300,
            bgOverlayColor: "rgba(0,0,0,0)",
            backgroundColor: darkMode
              ? "#111827"
              : "#ffffff",
          }}
          layout={{
            orientation: "horizontal",
            responsive: true,
            itemWidth: 350,
            itemHeight: 180,
            gap: 18,
          }}
          effect={{
            bulgeStrength: 1.1,
            bulgeWidth: 0.35,
          }}
        />
      </div>
    </section>
  );
}
