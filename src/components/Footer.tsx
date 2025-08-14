import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer: React.FC = () => {
  const { darkMode } = useTheme();

  const grad = darkMode
    ? { from: "#FF2D55", via: "#ff7ab7", to: "#2563eb" }
    : { from: "#d97706", via: "#dc2626", to: "#a21caf" };

  const suf = darkMode ? "dark" : "light";
  const gid = {
    linkedin: `linkedinGradient-${suf}`,
    github: `githubGradient-${suf}`,
    ig: `igGradient-${suf}`,
    email: `emailGradient-${suf}`,
  };

  return (
    <footer
      className={`relative pt-10 pb-10 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-colors duration-500`}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          darkMode
            ? "from-[#FF2D55] via-[#ff7ab7] to-[#2563eb]"
            : "from-[#d97706] via-[#dc2626] to-[#a21caf]"
        }`}
      />

      <div className="container mx-auto px-5 max-w-screen-xl">
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          {[
            {
              name: "LinkedIn",
              href: "",
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id={gid.linkedin}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={grad.from} />
                      <stop offset="50%" stopColor={grad.via} />
                      <stop offset="100%" stopColor={grad.to} />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#${gid.linkedin})`}
                    fillRule="evenodd"
                    d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z"
                    clipRule="evenodd"
                  />
                  <path
                    fill={`url(#${gid.linkedin})`}
                    d="M7.2 8.809H4V19.5h3.2V8.809Z"
                  />
                </svg>
              ),
            },
            {
              name: "GitHub",
              href: "https://github.com/ahmadrahardan",
              icon: (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id={gid.github}
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor={grad.from} />
                      <stop offset="50%" stopColor={grad.via} />
                      <stop offset="100%" stopColor={grad.to} />
                    </linearGradient>
                  </defs>
                  <path
                    fill={`url(#${gid.github})`}
                    fillRule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              ),
            },
            [
              {
                name: "Instagram",
                href: "https://www.instagram.com/rahardan_/",
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id={gid.ig}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={grad.from} />
                        <stop offset="50%" stopColor={grad.via} />
                        <stop offset="100%" stopColor={grad.to} />
                      </linearGradient>
                    </defs>
                    <path
                      fill={`url(#${gid.ig})`}
                      fillRule="evenodd"
                      d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ),
              },
              {
                name: "Email",
                href: "mailto:rahardan313@gmail.com",
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        id={gid.email}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={grad.from} />
                        <stop offset="50%" stopColor={grad.via} />
                        <stop offset="100%" stopColor={grad.to} />
                      </linearGradient>
                    </defs>
                    <path
                      stroke={`url(#${gid.email})`}
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
                    />
                  </svg>
                ),
              },
            ],
          ]
            .flat()
            .map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900"
                } shadow-sm hover:shadow-md`}
                aria-label={item.name}
              >
                <div className="w-6 h-6">{item.icon}</div>
              </a>
            ))}
        </div>

        <div
          className={`text-center ${
            darkMode ? "text-gray-400" : "text-gray-600"
          } text-sm`}
        >
          <p className="mb-2">Made by Rahardan</p>
          <p>© {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
