import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
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
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-6 pb-24">
        {/* ===== Back ===== */}
        {/* <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm hover:opacity-80 text-[#FF2D55]"
        >
          ← Back to Projects
        </Link> */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm hover:opacity-80 text-[#FF2D55]"
        >
          ← Back to Projects
        </button>

        {/* ===== HERO ===== */}
        <div className="mt-10 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT */}
          <div>
            <div className={`flex items-center gap-4 text-sm ${textSub}`}>
              {p.status && (
                <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                  {p.status}
                </span>
              )}
              {p.year && <span>{p.year}</span>}
              {p.duration && (
                <>
                  <span>•</span>
                  <span>{p.duration}</span>
                </>
              )}
            </div>

            <h1 className={`mt-6 text-4xl md:text-6xl font-bold ${textMain}`}>
              {p.title}
            </h1>

            <p className={`mt-6 max-w-xl leading-relaxed ${textSub}`}>
              {p.description}
            </p>

            {p.githubLink && (
              <a
                href={p.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-md font-medium text-white hover:opacity-80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z"></path>
                </svg>{" "}
                View Code
              </a>
            )}
          </div>

          {/* RIGHT */}
          <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-xl">
            {/* <img
              src={p.image}
              alt={p.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            /> */}
            <video
              src={p.video}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="mt-24 grid md:grid-cols-[2fr_1fr] gap-20">
          {/* LEFT CONTENT */}
          <div>
            <h2 className={`text-2xl font-semibold ${textMain}`}>Overview</h2>

            <p className={`mt-5 leading-relaxed ${textSub}`}>{p.overview}</p>

            {/* Key Features */}
            {p.keyfeatures && (
              <div className="mt-14">
                <h3
                  className={`flex items-center gap-2 text-2xl font-semibold ${textMain}`}
                >
                  Key Features
                </h3>

                <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {p.keyfeatures.map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${textSub}`}>
                      <span className="mt-[0.7rem] w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="mt-16">
              <h3
                className={`flex items-center gap-2 text-2xl font-semibold ${textMain}`}
              >
                Technologies
              </h3>

              {/* Backend */}
              {p.technologiesDetail?.backend?.length ? (
                <div className="mt-6">
                  <p className={`mb-3 text-sm font-medium ${textSub}`}>
                    Backend
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.technologiesDetail.backend.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-4 py-1.5 rounded-full text-sm ${textSub} border border-black/10 dark:border-white/10`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Frontend */}
              {p.technologiesDetail?.frontend?.length ? (
                <div className="mt-6">
                  <p className={`mb-3 text-sm font-medium ${textSub}`}>
                    Frontend
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {p.technologiesDetail.frontend.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-4 py-1.5 rounded-full text-sm ${textSub} border border-black/10 dark:border-white/10`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Tools & Services */}
              <div className="mt-6">
                <p className={`mb-3 text-sm font-medium ${textSub}`}>
                  Tools & Services
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.technologiesDetail?.tools?.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-4 py-1.5 rounded-full text-sm ${textSub} border border-black/10 dark:border-white/10`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden md:block space-y-10 md:sticky md:top-10 self-start">
            {/* Project Details */}
            <div>
              <h3 className={`text-2xl font-semibold ${textMain}`}>
                Project Details
              </h3>

              <ul className={`mt-4 space-y-3 text-sm ${textSub}`}>
                {p.year && (
                  <li className="flex items-center justify-between">
                    <span>Year</span>
                    <span>{p.year}</span>
                  </li>
                )}
                {p.duration && (
                  <li className="flex items-center justify-between">
                    <span>Duration</span>
                    <span>{p.duration}</span>
                  </li>
                )}
                {p.status && (
                  <li className="flex items-center justify-between">
                    <span>Status</span>
                    <span className="flex items-center gap-2">{p.status}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Tech Stack */}
            {p.technologies && (
              <div>
                <h3 className={`text-2xl font-semibold ${textMain}`}>
                  Tech Stack
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-md text-xs ${textSub} bg-black/5 dark:bg-white/5`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {p.githubLink && (
              <div>
                <h3 className={`text-2xl font-semibold ${textMain}`}>Links</h3>

                <a
                  href={p.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-md text-white hover:opacity-80"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M5.88401 18.6533C5.58404 18.4526 5.32587 18.1975 5.0239 17.8369C4.91473 17.7065 4.47283 17.1524 4.55811 17.2583C4.09533 16.6833 3.80296 16.417 3.50156 16.3089C2.9817 16.1225 2.7114 15.5499 2.89784 15.0301C3.08428 14.5102 3.65685 14.2399 4.17672 14.4263C4.92936 14.6963 5.43847 15.1611 6.12425 16.0143C6.03025 15.8974 6.46364 16.441 6.55731 16.5529C6.74784 16.7804 6.88732 16.9182 6.99629 16.9911C7.20118 17.1283 7.58451 17.1874 8.14709 17.1311C8.17065 16.7489 8.24136 16.3783 8.34919 16.0358C5.38097 15.3104 3.70116 13.3952 3.70116 9.63971C3.70116 8.40085 4.0704 7.28393 4.75917 6.3478C4.5415 5.45392 4.57433 4.37284 5.06092 3.15636C5.1725 2.87739 5.40361 2.66338 5.69031 2.57352C5.77242 2.54973 5.81791 2.53915 5.89878 2.52673C6.70167 2.40343 7.83573 2.69705 9.31449 3.62336C10.181 3.41879 11.0885 3.315 12.0012 3.315C12.9129 3.315 13.8196 3.4186 14.6854 3.62277C16.1619 2.69 17.2986 2.39649 18.1072 2.52651C18.1919 2.54013 18.2645 2.55783 18.3249 2.57766C18.6059 2.66991 18.8316 2.88179 18.9414 3.15636C19.4279 4.37256 19.4608 5.45344 19.2433 6.3472C19.9342 7.28337 20.3012 8.39208 20.3012 9.63971C20.3012 13.3968 18.627 15.3048 15.6588 16.032C15.7837 16.447 15.8496 16.9105 15.8496 17.4121C15.8496 18.0765 15.8471 18.711 15.8424 19.4225C15.8412 19.6127 15.8397 19.8159 15.8375 20.1281C16.2129 20.2109 16.5229 20.5077 16.6031 20.9089C16.7114 21.4504 16.3602 21.9773 15.8186 22.0856C14.6794 22.3134 13.8353 21.5538 13.8353 20.5611C13.8353 20.4708 13.836 20.3417 13.8375 20.1145C13.8398 19.8015 13.8412 19.599 13.8425 19.4094C13.8471 18.7019 13.8496 18.0716 13.8496 17.4121C13.8496 16.7148 13.6664 16.2602 13.4237 16.051C12.7627 15.4812 13.0977 14.3973 13.965 14.2999C16.9314 13.9666 18.3012 12.8177 18.3012 9.63971C18.3012 8.68508 17.9893 7.89571 17.3881 7.23559C17.1301 6.95233 17.0567 6.54659 17.199 6.19087C17.3647 5.77663 17.4354 5.23384 17.2941 4.57702L17.2847 4.57968C16.7928 4.71886 16.1744 5.0198 15.4261 5.5285C15.182 5.69438 14.8772 5.74401 14.5932 5.66413C13.7729 5.43343 12.8913 5.315 12.0012 5.315C11.111 5.315 10.2294 5.43343 9.40916 5.66413C9.12662 5.74359 8.82344 5.69492 8.57997 5.53101C7.8274 5.02439 7.2056 4.72379 6.71079 4.58376C6.56735 5.23696 6.63814 5.77782 6.80336 6.19087C6.94565 6.54659 6.87219 6.95233 6.61423 7.23559C6.01715 7.8912 5.70116 8.69376 5.70116 9.63971C5.70116 12.8116 7.07225 13.9683 10.023 14.2999C10.8883 14.3971 11.2246 15.4769 10.5675 16.0482C10.3751 16.2156 10.1384 16.7802 10.1384 17.4121V20.5611C10.1384 21.5474 9.30356 22.2869 8.17878 22.09C7.63476 21.9948 7.27093 21.4766 7.36613 20.9326C7.43827 20.5204 7.75331 20.2116 8.13841 20.1276V19.1381C7.22829 19.1994 6.47656 19.0498 5.88401 18.6533Z"></path>
                  </svg>{" "}
                  View Code
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
