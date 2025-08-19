import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

import sepadu from "../assets/certificates/Sertifikat HKI Sepadu.webp";
import uxLaos from "../assets/certificates/Sertifikat UIUX.webp";
import gitLaos from "../assets/certificates/Sertifikat Pelatihan GIT.webp";
import hkiPdf from "../assets/certificates/Sertifikat_SISTEM PELATIHAN TERPADU UNTUK SELURUH INDUSTRI DI KABUPATEN JEMBER.pdf";
// import fest from "../assets/certificates/Sertifikat Entrepreneurship.webp";

interface Certificate {
  id: string;
  title: string;
  link: string;
  image: string;
}

const CertificateSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  const certificates: Certificate[] = [
    {
      id: "1",
      title: "Sertifikat HKI Sistem Pelatihan Terpadu untuk Seluruh Industri di Kabupaten Jember",
      link: hkiPdf,
      image: sepadu,
    },
    {
      id: "2",
      title: "Pelatihan Dasar UI/UX",
      link: uxLaos,
      image: uxLaos,
    },
    {
      id: "3",
      title: "Pelatihan GIT",
      link: gitLaos,
      image: gitLaos,
    },
    // {
    //   id: "4",
    //   title: "Sertifikat Pelatihan Entrepreneurship",
    //   link: "https://www.dicoding.com/certificates/NVP7483DOPR0",
    //   image: fest,
    // },
  ];

  const handleCertificateClick = (cert: Certificate) => {
    if (cert.link) {
      window.open(cert.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className={`py-20 min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"} relative overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10"></div>
      </div>

      <div className="container mx-auto px-5 md:px-10 max-w-screen-xl relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`section-title text-4xl md:text-6xl font-extrabold ${
              darkMode ? "text-white" : "text-gray-900"
            } mb-4`}
          >
            <span className="relative inline-block">
              Certificates
              <span className="absolute -bottom-1 z-[-1] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent mt-2" />
            </span>
          </h2>
          <p
            className={`section-subtitle text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Certificates I've earned
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {certificates.map((cert) => (
            <div
              key={cert.id}
              onClick={() => handleCertificateClick(cert)}
              className={`certificate-card group relative cursor-pointer rounded-xl overflow-hidden shadow-lg border-2 ${
                darkMode ? "border-white/10 bg-gray-900" : "border-gray-200 bg-white"
              } hover:border-blue-400 transition`}
            >
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>

                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://cdn-icons-png.flaticon.com/512/337/337946.png";
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
              </div>

              <div className="p-6">
                <h3
                  className={`text-lg font-semibold ${
                    darkMode
                      ? "text-white group-hover:text-blue-300"
                      : "text-gray-900 group-hover:text-blue-600"
                  } mb-2 line-clamp-4`}
                >
                  {cert.title}
                </h3>
              </div>

              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/50" />
            </div>
          ))}
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
