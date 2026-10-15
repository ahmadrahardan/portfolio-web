import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../context/ThemeContext";
import Lanyard from "./Lanyard";
import cvPdf from "../assets/CV Ahmad Rahardan ATS.pdf";

const HomeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lanyardRef = useRef<HTMLDivElement>(null);
  const introTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const { darkMode } = useTheme();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvPdf;
    link.download = "CV Ahmad Rahardan.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Animasi intro GSAP
  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const textElements = Array.from(textRef.current!.children);

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Animasi Lanyard pada mobile
      if (lanyardRef.current) {
        timeline.fromTo(
          lanyardRef.current,
          {
            opacity: 0,
            y: -35,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          },
        );
      }

      // Animasi teks masuk satu per satu
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
        },
        "-=0.5",
      );

      introTimelineRef.current = timeline;
    }, sectionRef);

    // Jalankan ulang animasi saat Navbar Home diklik
    const replayIntro = () => {
      const timeline = introTimelineRef.current;

      if (!timeline) return;

      timeline.restart();
    };

    window.addEventListener("portfolio-home-intro", replayIntro);

    return () => {
      window.removeEventListener("portfolio-home-intro", replayIntro);

      introTimelineRef.current = null;
      ctx.revert();
    };
  }, []);

  // Efek typewriter
  useEffect(() => {
    const toRotate = [
      "Information Systems Student",
      "Website Developer",
      "Tech Enthusiast",
    ];

    const period = 2000;

    let loopNum = 0;
    let txt = "";
    let isDeleting = false;
    let typewriterTimeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const fullTxt = toRotate[loopNum % toRotate.length];

      txt = isDeleting
        ? fullTxt.substring(0, txt.length - 1)
        : fullTxt.substring(0, txt.length + 1);

      const el = sectionRef.current?.querySelector(".typewrite");

      if (el) {
        const textSpan = el.querySelector(".typewrite-text");

        if (textSpan) {
          textSpan.textContent = txt;
        }
      }

      let delta = 150 - Math.random() * 100;

      if (isDeleting) {
        delta /= 2;
      }

      if (!isDeleting && txt === fullTxt) {
        delta = period;
        isDeleting = true;
      } else if (isDeleting && txt === "") {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }

      typewriterTimeout = setTimeout(tick, delta);
    };

    tick();

    return () => {
      clearTimeout(typewriterTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="
        relative isolate
        min-h-[100svh]
        lg:h-[100svh]
        lg:min-h-[650px]
        overflow-hidden
        flex flex-col
        lg:justify-center
        bg-transparent
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: darkMode
            ? `radial-gradient(
                ellipse 55% 65% at 42% 42%,
                rgba(75, 65, 175, 0.20),
                transparent 75%
              )`
            : `radial-gradient(
                ellipse 60% 60% at 40% 40%,
                rgba(130, 150, 255, 0.12),
                transparent 75%
              )`,
        }}
      />

      {/* MOBILE & TABLET LANYARD */}
      <div
        ref={lanyardRef}
        className="
    relative z-20
    w-full
    h-[560px]
    sm:h-[600px]
    md:h-[650px]
    lg:hidden
    mt-4
    mb-4
    sm:mb-6
    overflow-hidden
    shrink-0
    pointer-events-auto
  "
      >
        <Lanyard />
      </div>

      {/* DESKTOP LANYARD: BACKGROUND */}
      {/* DESKTOP LANYARD */}
      <div
        className="
    hidden lg:block
    absolute inset-0
    z-0
    overflow-hidden
    pointer-events-auto
  "
      >
        <Lanyard />
      </div>

      {/* CONTENT */}
      <div
        className="
    relative z-10
    w-full max-w-[1920px] mx-auto
    px-6 sm:px-8 lg:px-[8%]
    pb-16 pt-5 lg:py-16
    lg:pointer-events-none
  "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            items-center
            gap-y-10
          "
        >
          {/* INTRO TEXT */}
          <div
            ref={textRef}
            className="
    lg:col-span-6
    flex flex-col
    items-center text-center
    lg:items-start lg:text-left
    lg:pointer-events-auto
  "
          >
            {/* GREETING */}
            <p
              className={`
                mb-4
                text-base
                sm:text-2xl
                tracking-[.18em]
                font-semibold
                ${darkMode ? "text-white" : "text-slate-900"}
              `}
            >
              HELLO THERE, I'M
            </p>

            {/* NAME */}
            <h1
              className={`
                font-extrabold
                leading-[1.1]
                tracking-tight
                text-4xl
                sm:text-5xl
                md:text-6xl
                xl:text-7xl
                ${darkMode ? "text-white" : "text-slate-900"}
              `}
            >
              Ahmad <span className="text-[#FF2D55]">Rahardan</span>
            </h1>

            {/* TYPEWRITER */}
            <div
              className="
                mt-3
                md:mt-4
                text-lg
                sm:text-2xl
                md:text-3xl
                font-extrabold
              "
            >
              <div
                className="
                  typewrite
                  min-h-[1.4em]
                  mx-auto
                  lg:mx-0
                "
              >
                <span className="typewrite-text text-[#FF2D55]" />

                <span className={darkMode ? "text-white/80" : "text-black/70"}>
                  |
                </span>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p
              className={`
                mt-4
                mb-4
                text-sm
                sm:text-base
                md:text-lg
                leading-relaxed
                tracking-[.05em]
                font-semibold
                ${darkMode ? "text-slate-100" : "text-slate-600"}
              `}
            >
              A highly motivated sixth-semester Information Systems student at
              the Faculty of Computer Science, University of Jember with a
              strong interest in information technology development.
            </p>

            {/* DOWNLOAD BUTTON */}
            <div
              className="
                mt-5
                flex
                flex-wrap
                items-center
                justify-center
                lg:justify-start
                gap-3
              "
            >
              <button
                onClick={handleDownload}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  px-5
                  py-3
                  text-base
                  sm:text-lg
                  font-medium
                  bg-[#FF2D55]
                  text-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:bg-white
                  hover:text-[#FF2D55]
                  hover:-translate-y-1
                "
              >
                Download CV
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
