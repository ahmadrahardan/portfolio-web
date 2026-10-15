
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import fotoFormalku from "../assets/RHD.jpg";
import PixelHoverCard from "./PixelHoverCard";
import fotoKedua from "../assets/Rahar_2.png";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { darkMode } = useTheme();

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
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Animasi foto masuk dari kiri
      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          {
            x: -40,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 1,
          }
        );
      }

      // Animasi konten selain heading About Me
      if (contentRef.current) {
        const elements = Array.from(
          contentRef.current.children
        ).filter(
          (element) =>
            !element.classList.contains("about-heading")
        );

        tl.fromTo(
          elements,
          {
            y: 24,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            clearProps: "transform,opacity",
          },
          "-=0.8"
        );
      }

      // Efek foto bergerak naik turun
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          y: 12,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
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
      {/* CORNER GLOW */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <style>
          {`
            .about-glow {
              position: absolute;
              width: 28rem;
              height: 28rem;
              filter: blur(40px);
              opacity: 0.30;
              will-change: transform, opacity;
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

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto w-full max-w-screen-xl px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* FOTO PROFIL */}
          <div
            ref={photoRef}
            className="
              md:col-span-5
              flex
              justify-center
              md:justify-start
              will-change-transform
            "
          >
            <PixelHoverCard
              image={fotoFormalku}
              hoverImage={fotoKedua}
              darkMode={darkMode}
              alt="Foto profil Rahar"
            />
          </div>

          {/* KONTEN ABOUT ME */}
          <div
            ref={contentRef}
            className="
              md:col-span-7
              text-center
              md:text-left
            "
          >
            {/* HEADING ABOUT ME */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.1,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: "easeOut",
              }}
              className={`
                about-heading
                mt-4
                text-4xl
                font-extrabold
                md:text-6xl
                ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              <span className="relative inline-block">
                About{" "}
                <span className="text-[#FF2D55]">
                  Me
                </span>

                {/* Garis gradient bawah heading */}
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
            </motion.h2>

            {/* SUBTITLE */}
            <h3
              className={`
                text-xl
                sm:text-2xl
                font-semibold
                mt-2
                mb-5
                ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }
              `}
            >
              Step into my journey!
            </h3>

            {/* DESCRIPTION */}
            <p
              className={`
                leading-7
                max-w-2xl
                text-base
                sm:text-lg
                tracking-[.05em]
                ${
                  darkMode
                    ? "text-slate-300"
                    : "text-slate-600"
                }
              `}
            >
              A highly motivated sixth-semester Information
              Systems student at the Faculty of Computer
              Science, University of Jember (GPA 3.96)
              with a strong interest in information
              technology development. Experienced in
              building web applications using Laravel,
              Blade, React, and Tailwind, as well as
              managing databases with MySQL. Possesses
              strong teamwork, communication, and
              problem-solving skills.
            </p>

            {/* PASSION BADGES */}
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
