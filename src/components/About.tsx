import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import fotoFormalku from '../assets/Rahar_3.png';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  const hexClip =
    'polygon(25% 6%, 75% 6%, 94% 50%, 75% 94%, 25% 94%, 6% 50%)';

  const hexGrad = darkMode
    ? 'from-[#FF2D55] via-[#ff7ab7] to-[#2563eb]'
    : 'from-[#d97706] via-[#dc2626] to-[#a21caf]';

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        photoRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0 }
      );

      if (contentRef.current) {
        tl.from(
          Array.from(contentRef.current.children),
          { y: 24, opacity: 0, duration: 0.9, stagger: 0.12 },
          '-=0.8'
        );
      }

      gsap.to(photoRef.current, {
        y: 12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert(); 
  }, [darkMode]); 

  return (
    <section
      ref={sectionRef}
      id="aboutme"
      className={`${darkMode ? 'bg-slate-900' : 'bg-white'} py-16 sm:py-20 md:py-28 lg:py-40 min-h-screen flex items-center justify-center transition-colors duration-500`}
    >
      <div className="mx-auto max-w-screen-xl px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* FOTO – hexagon dengan gradient dinamis */}
          <div ref={photoRef} className="md:col-span-5 flex justify-center md:justify-start will-change-transform">
            <div className="relative w-[400px] h-[360px] sm:w-[420px] sm:h-[380px] md:w-[500px] md:h-[430px]">
              {/* Border hexagon (gradient + glow ringan) */}
              <div
                className={`absolute inset-0 p-[8px] bg-gradient-to-tr ${hexGrad}`}
                style={{
                  clipPath: hexClip,
                  borderRadius: 24,
                  filter: 'drop-shadow(0 0 20px rgba(0,0,0,.25))',
                }}
              />
              {/* Isi hexagon + foto */}
              <div
                className={`${darkMode ? 'bg-slate-900' : 'bg-white'} absolute inset-[8px] overflow-hidden`}
                style={{ clipPath: hexClip, borderRadius: 20 }}
              >
                <img
                  src={fotoFormalku}
                  alt="Profile"
                  className="w-full h-full object-cover object-top"
                />
                {/* vignette halus */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(80% 60% at 50% 20%, transparent, rgba(0,0,0,.15) 70%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* TEKS */}
          <div ref={contentRef} className="md:col-span-7 text-center md:text-left">
            <h2 className={`text-4xl sm:text-6xl font-extrabold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              About <span className="text-[#FF2D55]">Me</span>
            </h2>
            <h3 className={`text-2xl sm:text-3xl font-semibold mb-5 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Frontend Developer!
            </h3>
            <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} leading-8 max-w-4xl text-md sm:text-xl`}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex delectus iste,
              aliquid officiis quasi obcaecati dolorem consequuntur suscipit ducimus tenetur
              molestiae vel commodi veniam dignissimos nihil praesentium delectus fugiat officia
              cupiditate in illum, modi unde recusandae, molestiae excepturi voluptatem temporibus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
