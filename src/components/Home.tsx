import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import profilePhoto from "../assets/RHD.jpg";
import cvPdf from "../assets/CV Ahmad Rahardan.pdf";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const HomeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cvPdf;
    link.download = 'CV Ahmad Rahardan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 }
      ).fromTo(
        photoRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.7"
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [darkMode]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(photoRef.current, {
        y: 16,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const toRotate = [
      "Information Systems Student",
      "Fullstack Developer",
      "Back-End Developer",
      "Business Enthusiast",
      "Tech Enthusiast",
    ];
    const period = 2000;

    let loopNum = 0;
    let txt = "";
    let isDeleting = false;
    let typewriterTimeout: any;

    const wrapClass = darkMode ? "text-[#FF2D55]" : "text-white";
    const cursorClass = darkMode ? "text-white/80" : "text-white/90";

    const tick = () => {
      const fullTxt = toRotate[loopNum % toRotate.length];
      txt = isDeleting
        ? fullTxt.substring(0, txt.length - 1)
        : fullTxt.substring(0, txt.length + 1);

      const el = document.querySelector(".typewrite");
      if (el) {
        (el as HTMLElement).innerHTML =
          `<span class="wrap ${wrapClass}">${txt}</span>` +
          `<span class="cursor ${cursorClass}">|</span>`;
      }

      let delta = 150 - Math.random() * 100;
      if (isDeleting) delta /= 2;

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
    return () => clearTimeout(typewriterTimeout);
  }, [darkMode]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-screen overflow-hidden flex items-center"
    >
      <div
        className={`absolute inset-0 -z-30 bg-gradient-to-br ${
          darkMode
            ? "from-[#0B1020] via-[#111B40] to-[#132A6E]"
            : "from-[#d97706] via-[#dc2626] to-[#a21caf]"
        }`}
      />

      <div
        className="pointer-events-none absolute -z-20"
        style={{
          inset: 0,
          background: darkMode
            ? "radial-gradient(600px 420px at 85% 25%, rgba(236,72,153,0.55), transparent 60%), radial-gradient(700px 520px at 10% 80%, rgba(59,130,246,0.35), transparent 60%)"
            : "radial-gradient(1000px 600px at 18% 28%, rgba(255,255,255,0.35), rgba(255,255,255,0.05) 60%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-[149px] py-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-y-10">
          {/* LEFT: text (center on mobile) */}
          <div
            ref={textRef}
            className="lg:col-span-6 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <p className="mb-4 text-md sm:text-2xl tracking-[.18em] font-semibold text-white">
              HELLO THERE, I'M
            </p>

            <h1 className="text-white font-extrabold leading-tight text-4xl sm:text-5xl md:text-7xl">
              Ahmad Rahardan
            </h1>

            <div className="mt-3 md:mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold">
              <div className="typewrite h-[1.4em] mx-auto lg:mx-0 text-white" />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-lg font-medium
                          bg-[#FF2D55] text-white shadow-lg hover:shadow-xl hover:bg-white hover:text-[#FF2D55] transition"
              >
                Download CV
              </button>
            </div>
          </div>

          {/* RIGHT: photo (floating) */}
          <div
            ref={photoRef}
            className="lg:col-span-6 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="p-[6px] rounded-[26px] bg-gradient-to-br from-[#FF2D55] via-[#ff7ab7] to-[#2563eb]">
                <div
                  className={`rounded-[20px] overflow-hidden ${
                    darkMode ? "bg-[#0F1530]" : "bg-white/10"
                  }`}
                >
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="block w-[280px] h-[360px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[460px] object-cover"
                  />
                </div>
              </div>
              <div
                className="pointer-events-none absolute -inset-2 rounded-[30px] opacity-50"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, rgba(255,45,85,0.55), rgba(59,130,246,0.45), rgba(255,45,85,0.55))",
                  filter: "blur(24px)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-5 md:h-8 z-[5]"
        style={{
          background: darkMode
            ? 
              "linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.65) 45%, rgba(15,23,42,0) 100%)"
            : 
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </section>
  );
};

export default HomeSection;
