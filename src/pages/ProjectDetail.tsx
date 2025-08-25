import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useTheme } from "../context/ThemeContext";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { darkMode } = useTheme();

  const p = projects.find((x) => x.slug === slug);
  if (!p) {
    return (
      <div className="max-w-5xl mx-auto px-5 py-16">
        <Link to="/" className="text-[#FF2D55]">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold mt-6">Project not found</h1>
      </div>
    );
  }

  const bg = darkMode ? "bg-[#0b0f15]" : "bg-white";
  const textMain = darkMode ? "text-white" : "text-gray-900";
  const textSub = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`${bg} min-h-screen`}>
      <div className="max-w-5xl mx-auto px-4 md:px-5 pt-4 md:pt-6 pb-20">
        <Link to="/" className="text-[#FF2D55]">
          &larr; Back
        </Link>

        {/* ===== Hero image + title + description ===== */}
        <div className="mt-5">
          <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="mt-4">
            <h1 className={`text-2xl md:text-5xl font-bold ${textMain}`}>
              {p.title}
            </h1>

            <div className={`mt-4 text-xs md:text-sm ${textSub} flex items-center gap-3 flex-wrap`}>
              {p.year && <span>{p.year}</span>}
              {p.duration && (
                <>
                  <span className="opacity-50">•</span>
                  <span>{p.duration}</span>
                </>
              )}
              {p.status && (
                <>
                  <span className="opacity-50">•</span>
                  <span>{p.status}</span>
                </>
              )}
            </div>

            <p className={`mt-4 leading-relaxed text-justify ${textSub}`}>{p.description}</p>
          </div>
        </div>

        {/* ===== Text left + image right ===== */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-20 items-center">
          <div>
            <h2 className={`text-lg md:text-xl font-semibold ${textMain}`}>
              Recruitment With AI For Startup Businesses
            </h2>
            <p className={`mt-3 text-sm md:text-base leading-relaxed text-justify ${textSub}`}>
              {p.overview}
            </p>
          </div>

          <div className="order-first md:order-last rounded-xl overflow-hidden">
            <img
              src={p.image}
              alt={`${p.title} secondary`}
              className="aspect-[16/9] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* ===== Paragraph + CTA link ===== */}
        <div className="mt-20">
          <p className={`${textSub} leading-relaxed`}>
            {p.highlights?.length
              ? `Key highlights: ${p.highlights.join(" • ")}.`
              : "Our solution blends robust back-end architecture with a delightful user experience to ensure scalable, measurable outcomes for your recruitment workflow."}
          </p>

          <div className="mt-5">
            <a
              href={p.githubLink || "#"}
              target={p.githubLink ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="inline-block text-sm md:text-base underline underline-offset-4 hover:opacity-80 text-[#FF2D55]"
            >
              Github Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
