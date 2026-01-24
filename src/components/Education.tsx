import { useTheme } from "../context/ThemeContext";

type Item = {
  year: string;
  desc1: string;
  desc2: string;
};

const experience: Item[] = [
  {
    year: "Dec 2024 - Present",
    desc1: "Media and Technology Division Staff",
    desc2: "Information Systems Student Association (HIMASIF)",
  },
  {
    year: "Aug 2025 - Oct 2025",
    desc1: "Website Division Staff",
    desc2: "Ilkom Developer League (IDLe) 2025",
  },
  {
    year: "Feb 2025 - Sep 2025",
    desc1: "Secretariat Division Staff (Website Administrator)",
    desc2: "IT-CONVERT & PICTURE 2025",
  },
  {
    year: "Jul 2025 - Oct 2025",
    desc1: "Head of Publication, Decoration, and Documentation Committee",
    desc2: "Increase the Horizon of Information System (INHOFIS) 2025 & Sarasehan 2025",
  },
];

const education: Item[] = [
  {
    year: "2020 - 2023",
    desc1: "Senior High School 1 Jember",
    desc2: "Science & Math",
  },
  {
    year: "2023 - Present",
    desc1: "University of Jember",
    desc2: "Bachelor of Information Systems (in progress)",
  },
];

const Card = ({ item }: { item: Item }) => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`rounded-xl p-5 transition
        ${
          darkMode
            ? "bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-[#FF2D55]/40"
            : "bg-white border border-gray-200 hover:border-[#FF2D55]/40"
        }
      `}
    >
      <p className="text-xs uppercase text-[#FF2D55] mb-1">{item.year}</p>
      <h4
        className={`${darkMode ? "text-white" : "text-slate-900"} font-semibold`}
      >
        {item.desc1}
      </h4>
      <p
        className={`${darkMode ? "text-slate-400" : "text-slate-600"} text-sm`}
      >
        {item.desc2}
      </p>
    </div>
  );
};

const ExperienceEducationSection = () => {
  const { darkMode } = useTheme();

  return (
    <section
      id="education"
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } pt-24 pb-20 min-h-screen relative transition-colors duration-500`}
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
        <span
          className="about-glow"
          style={{
            left: "-20rem",
            top: "5rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(255,45,85,0.9)"
              : "rgba(255,45,85,0.6)",
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
        {/* <span
          className="about-glow"
          style={{
            right: "-20rem",
            bottom: "-1rem",
            ["--glowColor" as any]: darkMode
              ? "rgba(59,130,246,0.85)"
              : "rgba(59,130,246,0.5)",
          }}
        /> */}
      </div>
      {/* ======= /CORNER GLOWS ======= */}

      <div className="mx-auto max-w-screen-xl px-5 md:px-10">
        {/* TITLE */}
        {/* <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-6xl font-extrabold mb-3 ${
              darkMode ? "text-white" : "text-slate-900"
            }`}
          >
            <span className="relative inline-block">
              My{" "}
              <span className="text-[#FF2D55]">Journey</span>
              <span className="absolute -bottom-1 z-[-1] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" />
            </span>
          </h2>

          <p
            className={`text-lg ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Experience & Education
          </p>
        </div> */}

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* EDUCATION */}
          <div>
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <span className="relative inline-block">
                My <span className="text-[#FF2D55]">Education</span>
                {/* <span className="absolute -bottom-1 z-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" /> */}
              </span>
            </h3>
            <div className="space-y-4">
              {education.map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div>
            <h3
              className={`text-2xl sm:text-3xl font-bold mb-6 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              <span className="relative inline-block">
                My{" "}
                <span className="text-[#FF2D55]">
                  Organizational Experience
                </span>
                {/* <span className="absolute -bottom-1 z-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" /> */}
              </span>
            </h3>
            <div className="space-y-4">
              {experience.map((item, i) => (
                <Card key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceEducationSection;
