import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
// import logo from "../assets/logoo.png";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "aboutme", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
];

const NAVBAR_HEIGHT = 72;

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const ThemeToggle: React.FC<{
  checked: boolean;
  onChange: () => void;
  className?: string;
}> = ({ checked, onChange, className = "" }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative h-9 w-16 rounded-full border transition-colors duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2
        ${
          checked
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-100 border-gray-200"
        } ${className}`}
      aria-label="Toggle theme"
    >
      <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
        <SunIcon className="h-4 w-4 text-gray-400" />
      </span>
      <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <MoonIcon className="h-4 w-4 text-gray-400" />
      </span>
      <span
        className={`pointer-events-none absolute top-1 left-1 h-7 w-7 rounded-full bg-indigo-600
          transform transition-transform duration-300 shadow-sm
          ${checked ? "translate-x-7" : "translate-x-0"}`}
      >
        <span className="flex h-full w-full items-center justify-center text-white">
          {checked ? (
            <MoonIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
        </span>
      </span>
    </button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const { darkMode, toggleDarkMode } = useTheme();

  const toggleMenu = () => setIsOpen((s) => !s);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    e.preventDefault();
    setActiveLink(link);
    setIsOpen(false);

    if (history.pushState) {
      history.pushState(null, "", link === "home" ? "#" : `#${link}`);
    }

    if (link === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const el = document.getElementById(link);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset; // no offset
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Observer untuk highlight nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveLink(e.target.id);
        });
      },
      {
        root: null,
        // top dikurangi tinggi navbar, supaya highlight terasa pas saat bagian atas
        rootMargin: `-${NAVBAR_HEIGHT}px 0px -55% 0px`,
        threshold: 0,
      }
    );

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-[100] py-1 shadow-sm transition-colors duration-300 backdrop-blur-sm
        ${
          darkMode ? "bg-gray-900/80 text-white" : "bg-white/80 text-gray-800"
        }`}
    >
      <div className="mx-auto max-w-screen-xl px-6 sm:px-1 lg:px-1">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          
          {/* <a
            href="#home"
            className="flex items-center gap-4"
            onClick={(e) => handleLinkClick(e, "home")}
          >
            <img src={logo} alt="Logo" className="h-8 w-auto object-contain" />
            <span className="hidden lg:block text-xl font-medium tracking-tight">
              Ahmad{" "}
              <span
                className={`${darkMode ? "text-[#FF2D55]" : "text-[#FF2D55]"}`}
              >
                Rahardan
              </span>
            </span>
          </a> */}

          <a
            href="#home"
            className="flex items-center gap-4"
            onClick={(e) => handleLinkClick(e, "home")}
          >
            {/* <span className="text-2xl font-mono font-bold">&lt;/&gt;</span> */}
            <span className="hidden lg:block text-xl font-medium tracking-tight">
              Ahmad{" "}
              <span
                className={`${darkMode ? "text-[#FF2D55]" : "text-[#FF2D55]"}`}
              >
                Rahardan
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeLink === item.id;
                const textClass = isActive
                  ? darkMode
                    ? "text-white"
                    : "text-gray-900"
                  : darkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-600 hover:text-gray-900";
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleLinkClick(e, item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-block px-2 py-2 text-md font-medium transition-colors duration-200 ${textClass}`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] w-full transform transition-transform duration-300
                          ${
                            isActive
                              ? "opacity-100 scale-x-100"
                              : "opacity-0 scale-x-0"
                          }
                          origin-center bg-gradient-to-r
                          ${
                            darkMode
                              ? "from-[#FF2D55] via-[#ff7ab7] to-[#2563eb]"
                              : "from-[#d97706] via-[#dc2626] to-[#a21caf]"
                          }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <ThemeToggle checked={darkMode} onChange={toggleDarkMode} />
          </div>

          {/* Mobile burger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors
                ${
                  darkMode
                    ? "text-white hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 transform transition ${
                  isOpen ? "rotate-90" : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 w-full z-50 shadow-lg"
          id="mobile-menu"
        >
          <div
            className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 rounded-b-lg shadow-md
              ${darkMode ? "bg-gray-900/95" : "bg-white/95"}`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeLink === item.id;
              const textClass = isActive
                ? darkMode
                  ? "text-white"
                  : "text-gray-900"
                : darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900";
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative block px-3 py-3 text-base font-medium transition-colors ${textClass}`}
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full transform transition-transform duration-300
                      ${
                        isActive
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      }
                      ${darkMode ? "bg-white" : "bg-gray-900"}`}
                  />
                </a>
              );
            })}

            <div className="px-1 pt-1">
              <ThemeToggle
                checked={darkMode}
                onChange={toggleDarkMode}
                className="w-16"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
