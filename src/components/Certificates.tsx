import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

import sepadu from "../assets/certificates/Sertifikat HKI Sepadu.webp";
import uxLaos from "../assets/certificates/Sertifikat UIUX.webp";
import gitLaos from "../assets/certificates/Sertifikat Pelatihan GIT.webp";
import fest from "../assets/certificates/Sertifikat Entrepreneurship.webp";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link: string;
  image: string;
  category:
    | "frontend"
    | "backend"
    | "design"
    | "data"
    | "business"
    | "github"
    | "project-management"
    | "mobile";
}

const CertificateSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  const certificates: Certificate[] = [
    {
      id: "1",
      title: "Belajar Dasar Manajemen Proyek",
      issuer: "Dicoding Indonesia",
      date: "Oct 2024 · Expires Oct 2027",
      link: "https://www.dicoding.com/certificates/NVP7483DOPR0",
      image: sepadu,
      category: "project-management",
    },
    {
      id: "2",
      title: "Pemrogram Mobil Pratama (Junior Mobile Programmer)",
      issuer: "PT. INIXINDO WIDYA UTAMA",
      date: "Oct 2024",
      link: "https://drive.google.com/file/d/1JXr7w5Byp0gMyY0HjmLR7FUb9hrdVpsu/view?usp=sharing",
      image: uxLaos,
      category: "mobile",
    },
    {
      id: "3",
      title: "Belajar Dasar UX Design",
      issuer: "Dicoding Indonesia",
      date: "Nov 2023 · Expires Nov 2026",
      link: "https://www.dicoding.com/certificates/6RPN4EQG4X2M",
      image: gitLaos,
      category: "design",
    },
    {
      id: "4",
      title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
      issuer: "Dicoding Indonesia",
      date: "Nov 2023 · Expires Nov 2026",
      link: "https://www.dicoding.com/certificates/6RPN4NR95X2M",
      image: fest,
      category: "backend",
    },
  ];

  const categoryColors = {
    frontend: {
      bg: darkMode ? "bg-blue-900" : "bg-blue-50",
      text: darkMode ? "text-blue-400" : "text-blue-600",
      border: darkMode ? "border-blue-400/30" : "border-blue-200",
      hover: darkMode ? "hover:border-blue-400/60" : "hover:border-blue-400",
    },
    backend: {
      bg: darkMode ? "bg-emerald-900" : "bg-emerald-50",
      text: darkMode ? "text-emerald-400" : "text-emerald-600",
      border: darkMode ? "border-emerald-400/30" : "border-emerald-200",
      hover: darkMode
        ? "hover:border-emerald-400/60"
        : "hover:border-emerald-400",
    },
    design: {
      bg: darkMode ? "bg-purple-900" : "bg-purple-50",
      text: darkMode ? "text-purple-400" : "text-purple-600",
      border: darkMode ? "border-purple-400/30" : "border-purple-200",
      hover: darkMode
        ? "hover:border-purple-400/60"
        : "hover:border-purple-400",
    },
    data: {
      bg: darkMode ? "bg-amber-900" : "bg-amber-50",
      text: darkMode ? "text-amber-400" : "text-amber-600",
      border: darkMode ? "border-amber-400/30" : "border-amber-200",
      hover: darkMode ? "hover:border-amber-400/60" : "hover:border-amber-400",
    },
    business: {
      bg: darkMode ? "bg-rose-900" : "bg-rose-50",
      text: darkMode ? "text-rose-400" : "text-rose-600",
      border: darkMode ? "border-rose-400/30" : "border-rose-200",
      hover: darkMode ? "hover:border-rose-400/60" : "hover:border-rose-400",
    },
    github: {
      bg: darkMode ? "bg-orange-900" : "bg-orange-50",
      text: darkMode ? "text-orange-400" : "text-orange-600",
      border: darkMode ? "border-orange-400/30" : "border-orange-200",
      hover: darkMode
        ? "hover:border-orange-400/60"
        : "hover:border-orange-400",
    },
    mobile: {
      bg: darkMode ? "bg-fuchsia-900" : "bg-fuchsia-50",
      text: darkMode ? "text-fuchsia-400" : "text-fuchsia-600",
      border: darkMode ? "border-fuchsia-400/30" : "border-fuchsia-200",
      hover: darkMode
        ? "hover:border-fuchsia-400/60"
        : "hover:border-fuchsia-400",
    },
    "project-management": {
      bg: darkMode ? "bg-teal-900" : "bg-teal-50",
      text: darkMode ? "text-teal-400" : "text-teal-600",
      border: darkMode ? "border-teal-400/30" : "border-teal-200",
      hover: darkMode ? "hover:border-teal-400/60" : "hover:border-teal-400",
    },
  };

  const handleCertificateClick = (cert: Certificate) => {
    if (cert.link) {
      window.open(cert.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className={`py-28 ${
        darkMode ? "bg-gray-900" : "bg-white"
      } relative overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10"></div>
      </div>

      <div className="container mx-auto px-5 md:px-10 max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`section-title text-5xl font-bold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            <span className="relative inline-block">
              Certificates
              <span
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-transparent ${
                  darkMode ? "via-blue-400" : "via-blue-600"
                } to-transparent mt-2`}
              ></span>
            </span>
          </h2>
          <p
            className={`section-subtitle text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } font-light tracking-wider uppercase text-sm`}
          >
            My Professional Certifications & Achievements
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert) => {
            const colors = categoryColors[cert.category];

            return (
              <div
                key={cert.id}
                onClick={() => handleCertificateClick(cert)}
                className={`certificate-card group relative cursor-pointer rounded-xl overflow-hidden shadow-lg border-2 ${
                  colors.border
                } ${colors.hover} ${darkMode ? "bg-gray-900" : "bg-white"}`}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>

                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://cdn-icons-png.flaticon.com/512/337/337946.png";
                      target.className = "w-24 h-24 object-contain opacity-50";
                    }}
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                    <div className="text-center text-white">
                      <ExternalLink className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm font-medium">
                        {cert.link ? "View Certificate" : "Image Preview"}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium capitalize ${colors.bg} ${colors.text} border ${colors.border} z-20 backdrop-blur-sm`}
                  >
                    {cert.category.replace(/-/g, " ")}
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className={`text-xl font-semibold ${
                      darkMode ? "text-white" : "text-gray-900"
                    } mb-2 group-hover:${colors.text} line-clamp-2`}
                  >
                    {cert.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } mb-1 font-medium`}
                  >
                    {cert.issuer}
                  </p>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {cert.date}
                  </p>
                </div>

                <div
                  className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/50`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .certificate-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default CertificateSection;
