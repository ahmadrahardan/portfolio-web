import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import fotoFormalku from "../assets/Rahar_3.png";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  const hexClip = "polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)";

  const hexGrad = darkMode
    ? "from-[#FF2D55] via-[#ff7ab7] to-[#2563eb]"
    : "from-[#d97706] via-[#dc2626] to-[#a21caf]";

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Foto masuk dari kiri
      tl.fromTo(
        photoRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0 }
      );

      // Konten teks stagger
      if (contentRef.current) {
        tl.from(
          Array.from(contentRef.current.children),
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.8"
        );
      }

      // Bobbing lembut pada foto
      gsap.to(photoRef.current, {
        y: 12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Napas lembut untuk glow sudut
      gsap.to(".about-glow", {
        opacity: (i) => 0.25 + (i % 2 ? 0.15 : 0.1),
        scale: 1.06,
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 0.4, from: "random" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [darkMode]);

  return (
    <section
      ref={sectionRef}
      id="aboutme"
      className={`${
        darkMode ? "bg-slate-900" : "bg-white"
      } relative overflow-hidden py-16 sm:py-20 md:py-28 lg:py-40 min-h-screen flex items-center justify-center transition-colors duration-500`}
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
            top: "-15rem",
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

      <div className="mx-auto max-w-screen-xl px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* FOTO – hexagon dengan gradient dinamis */}
          <div
            ref={photoRef}
            className="md:col-span-5 flex justify-center md:justify-start will-change-transform"
          >
            <div className="relative w-[400px] h-[360px] sm:w-[420px] sm:h-[380px] md:w-[500px] md:h-[430px]">
              {/* Border hexagon */}
              <div
                className={`absolute inset-0 p-[8px] bg-gradient-to-tr ${hexGrad}`}
                style={{
                  clipPath: hexClip,
                  borderRadius: 24,
                  filter: "drop-shadow(0 0 20px rgba(0,0,0,.25))",
                }}
              />
              {/* Isi hexagon + foto */}
              <div
                className={`${
                  darkMode ? "bg-slate-900" : "bg-white"
                } absolute inset-[8px] overflow-hidden`}
                style={{ clipPath: hexClip, borderRadius: 20 }}
              >
                <img
                  src={fotoFormalku}
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
                {/* Vignette halus */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(80% 60% at 50% 20%, transparent, rgba(0,0,0,.15) 70%)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* TEKS */}
          <div
            ref={contentRef}
            className="md:col-span-7 text-center md:text-left"
          >
            <h2
              className={`text-4xl sm:text-6xl font-extrabold mb-3 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <span className="relative inline-block">
                About{" "}
                <span
                  className={darkMode ? "text-[#FF2D55]" : "text-[#FF2D55]"}
                >
                  Me
                </span>
                <span
                  className={`absolute -bottom-1 z-[-1] left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
                    darkMode ? "via-red-400" : "via-red-400"
                  } to-transparent mt-2`}
                />
              </span>
            </h2>

            <h3
              className={`text-2xl sm:text-3xl font-semibold mb-5 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Step into my journey!
            </h3>

            <p
              className={`${
                darkMode ? "text-slate-300" : "text-slate-600"
              } leading-8 max-w-4xl text-md sm:text-xl`}
            >
              An Information Systems student (GPA 3.95) with a strong focus on
              web development, I am passionate about creating digital products
              that blend usability and aesthetics. I bring designs to life with
              Laravel, Blade, and Tailwind, and structure data and queries
              efficiently using MySQL. Through competitions and team projects, I
              have been a collaborative contributor—skilled at breaking down
              requirements, iterating on feedback, and balancing usability with
              clean implementation to deliver user-centered solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
