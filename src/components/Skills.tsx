import { useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import bladeIcon from "../assets/blade.webp";
import canvaIcon from "../assets/canva.webp";

type Skill = {
  name: string;
  icon: string;
  type: "tech" | "tools";
  color: string;
};

const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tech" | "tools">("tech");
  const techTabRef = useRef<HTMLButtonElement>(null);
  const toolsTabRef = useRef<HTMLButtonElement>(null);
  const { darkMode } = useTheme();

  const skills: Skill[] = useMemo(
    () => [
      {
        name: "HTML",
        icon: "https://cdn.simpleicons.org/html5/E34F26",
        type: "tech",
        color: "#E34F26",
      },
      {
        name: "CSS",
        icon: "https://cdn.simpleicons.org/css/1572B6",
        type: "tech",
        color: "#1572B6",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
        type: "tech",
        color: "#06B6D4",
      },
      { name: "Blade", icon: bladeIcon, type: "tech", color: "#FF2D20" },
      {
        name: "PHP",
        icon: "https://cdn.simpleicons.org/php/777BB4",
        type: "tech",
        color: "#777BB4",
      },
      {
        name: "Laravel",
        icon: "https://cdn.simpleicons.org/laravel/FF2D20",
        type: "tech",
        color: "#FF2D20",
      },
      {
        name: "React",
        icon: "https://cdn.simpleicons.org/react/61DAFB",
        type: "tech",
        color: "#61DAFB",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
        type: "tech",
        color: "#3178C6",
      },
      {
        name: "Python",
        icon: "https://cdn.simpleicons.org/python/3776AB",
        type: "tech",
        color: "#3776AB",
      },
      {
        name: "Jupyter",
        icon: "https://cdn.simpleicons.org/jupyter/F37626",
        type: "tech",
        color: "#F37626",
      },
      {
        name: "C#",
        icon: "https://cdn-icons-png.flaticon.com/512/6132/6132221.png",
        type: "tech",
        color: "#833AB4",
      },
      {
        name: "MySQL",
        icon: "https://cdn.simpleicons.org/mysql/4479A1",
        type: "tech",
        color: "#4479A1",
      },
      {
        name: "phpMyAdmin",
        icon: "https://cdn.simpleicons.org/phpmyadmin/6C78AF",
        type: "tools",
        color: "#6C78AF",
      },
      {
        name: "Laragon",
        icon: "https://cdn.simpleicons.org/laragon/0E83CD",
        type: "tools",
        color: "#0E83CD",
      },
      {
        name: "Figma",
        icon: "https://cdn.simpleicons.org/figma/F24E1E",
        type: "tools",
        color: "#F24E1E",
      },
      {
        name: "Canva",
        icon: canvaIcon,
        type: "tools",
        color: "#00C4CC",
      },
      {
        name: "Trello",
        icon: "https://cdn.simpleicons.org/trello/0079BF",
        type: "tools",
        color: "#0079BF",
      },
      {
        name: "Enterprise Architect",
        icon: "https://images.dwncdn.net/images/t_app-icon-l/p/77f6e337-d359-4228-ab40-ce511f75c0f8/3213945921/2383_4-10049037-imgingest-5589442223185491964.png",
        type: "tools",
        color: "#1E88E5",
      },
    ],
    [],
  );

  const themeBorderStops = darkMode
    ? ["#FF2D55", "#ff7ab7", "#2563eb"]
    : ["#d97706", "#dc2626", "#a21caf"];

  return (
    <section
      id="skills"
      className={`pb-20 pt-20 relative ${
        darkMode ? "bg-gray-900" : "bg-white"
      } transition-colors duration-500`}
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
        {/* <span
          className="about-glow"
          style={{
            left: "-20rem",
            top: "1rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(255,45,85,0.9)"
              : "rgba(255,45,85,0.6)",
          }}
        /> */}
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
            bottom: "-1rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(255,45,85,0.9)"
              : "rgba(255,45,85,0.6)",
          }}
        />
      </div>
      {/* ======= /CORNER GLOWS ======= */}

      <style>{`
        .border-ring {
          --thickness: 2px;
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: var(--thickness);
          pointer-events: none;
          background: linear-gradient(135deg, var(--c1), var(--c2), var(--c3));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
        }
        .skill-card .focusable-card {
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .skill-card:hover .focusable-card,
        .skill-card:focus-within .focusable-card {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 8px 20px rgba(0,0,0,.10);
        }
      `}</style>

      <div className="container mx-auto px-5 md:px-10 max-w-screen-xl">
        <div className="text-center mb-6">
          <h2
            className={`section-title text-4xl md:text-6xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            <span className="relative inline-block">
              Tech <span className="text-[#FF2D55]">Stack</span>
              <span className="absolute -bottom-1 z-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" />
            </span>
          </h2>
          <p
            className={`section-subtitle text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Tools & tech that power the projects I build
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div
            className={`relative inline-flex rounded-full p-1 ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            } shadow-inner`}
          >
            <button
              ref={techTabRef}
              type="button"
              className={`relative px-6 py-2 rounded-full text-sm font-medium z-10 transition-colors duration-200 ${
                activeTab === "tech"
                  ? "text-white bg-[#FF2D55]"
                  : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-900"
              }`}
              onClick={() => setActiveTab("tech")}
            >
              Technologies
            </button>
            <button
              ref={toolsTabRef}
              type="button"
              className={`relative px-6 py-2 rounded-full text-sm font-medium z-10 transition-colors duration-200 ${
                activeTab === "tools"
                  ? "text-white bg-[#FF2D55]"
                  : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-900"
              }`}
              onClick={() => setActiveTab("tools")}
            >
              Tools
            </button>
          </div>
        </div>

        {/* Grid reveal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6"
        >
          {skills
            .filter((s) => s.type === activeTab)
            .map((skill) => (
              <div
                key={`${activeTab}-${skill.name}`}
                className="skill-card relative group"
              >
                <div
                  tabIndex={0}
                  role="button"
                  aria-label={`Skill ${skill.name}`}
                  className={`focusable-card relative isolate h-full flex flex-col items-center p-4 sm:p-5 rounded-xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-sm hover:shadow-md overflow-hidden`}
                  style={
                    {
                      ["--c1" as any]: themeBorderStops[0],
                      ["--c2" as any]: themeBorderStops[1],
                      ["--c3" as any]: themeBorderStops[2],
                    } as React.CSSProperties
                  }
                >
                  <div className="absolute inset-0 rounded-xl z-0 border-ring" />
                  <div className="relative z-10 w-full h-full flex flex-col items-center">
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 mb-3 sm:mb-4 flex items-center justify-center rounded-lg ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                    </div>
                    <h3
                      className={`font-semibold text-center text-sm sm:text-base ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {skill.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
