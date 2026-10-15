// import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import CurvedRibbonGallery from "./CurvedRibbonGallery";
import Simbako from "../assets/Simbako.webp";
import Sepadu from "../assets/Sepadu.webp";
import ITC from "../assets/ITC.webp";
import Portfolio from "../assets/Portfolio.webp";
import HeyBrew from "../assets/HeyBrew.webp";
import SSO from "../assets/SSO.webp";
import Simba from "../assets/Simba.webp";

const projects = [
  { slug: "simbako", title: "Simbako", image: Simbako },
  { slug: "sepadu", title: "Sepadu", image: Sepadu },
  { slug: "it-convert", title: "IT Convert", image: ITC },
  { slug: "profile-website", title: "Profile Website", image: Portfolio },
  { slug: "sso", title: "Single Sign-On", image: SSO },
  { slug: "simba", title: "SIMBA", image: Simba },
  { slug: "hey-brew", title: "Hey Brew", image: HeyBrew },
];

export default function ProjectsSection() {
  // const navigate = useNavigate();
  const { darkMode } = useTheme();
  return (
    <section
      id="projects"
      className={`relative overflow-hidden pt-20 pb-0 transition-colors duration-500 bg-transparent`}
    >

      {/* TITLE */}
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 md:px-10">
        <div className="text-center">
          <h2
            className={`text-4xl md:text-6xl font-extrabold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="relative inline-block">
              My <span className="text-[#FF2D55]">Project</span>
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent" />
            </span>
          </h2>

          <p
            className={`text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Dive Into My Work
          </p>
        </div>
      </div>
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
          interaction={{ captureScroll: false, glide: 3.5 }}
          background={{
            showActiveBackground: false,
            bgFadeDuration: 300,
            bgOverlayColor: "rgba(0,0,0,0)",
            backgroundColor: darkMode ? "#111827" : "#ffffff",
          }}
          layout={{
            orientation: "horizontal",
            responsive: true,
            itemWidth: 350,
            itemHeight: 180,
            gap: 18,
          }}
          effect={{ bulgeStrength: 1.1, bulgeWidth: 0.35 }}
        />
      </div>
      {/* <div className="mx-auto max-w-screen-xl px-5 text-center md:px-10">
        <p className="text-sm opacity-60">Drag to explore projects</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {projects.map((project) => (
            <button
              key={project.slug}
              onClick={() => navigate(`/projects/${project.slug}`)}
              className="rounded-full border border-current/20 px-4 py-2 text-xs transition hover:border-[#FF2D55] hover:text-[#FF2D55]"
            >
              {project.title} ↗
            </button>
          ))}
        </div>
      </div> */}
    </section>
  );
}
