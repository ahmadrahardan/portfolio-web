
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

import sepadu from "../assets/certificates/Sertifikat HKI Sepadu.webp";
import uxLaos from "../assets/certificates/Sertifikat UIUX.webp";
import gitLaos from "../assets/certificates/Sertifikat Pelatihan GIT.webp";
import hkiPdf from "../assets/certificates/Sertifikat_SISTEM PELATIHAN TERPADU UNTUK SELURUH INDUSTRI DI KABUPATEN JEMBER.pdf";
import simba from "../assets/certificates/Sertifikat HKI SIMBA.webp";
import hkiSIMBA from "../assets/certificates/Sertifikat_SIMBA.pdf";
import expo from "../assets/certificates/Sertifikat Expo Capstone.webp";

interface Certificate {
  id: string;
  title: string;
  link: string;
  image: string;
  description: string;
}

const certificates: Certificate[] = [
  {
    id: "01",
    title: "Sistem Pelatihan Terpadu",
    description:
      "Hak Kekayaan Intelektual sistem pelatihan terpadu untuk industri di Kabupaten Jember.",
    link: hkiPdf,
    image: sepadu,
  },
  {
    id: "02",
    title: "SIMBA",
    description:
      "Hak Kekayaan Intelektual Sistem Informasi Manajemen Barang dan Aset.",
    link: hkiSIMBA,
    image: simba,
  },
  {
    id: "03",
    title: "Expo Capstone Project",
    description:
      "Sertifikat partisipasi dalam kegiatan Expo Capstone Project.",
    link: expo,
    image: expo,
  },
  {
    id: "04",
    title: "UI/UX Design",
    description:
      "Sertifikat pelatihan dasar User Interface dan User Experience.",
    link: uxLaos,
    image: uxLaos,
  },
  {
    id: "05",
    title: "Git Training",
    description:
      "Sertifikat pelatihan dasar penggunaan Git dan version control.",
    link: gitLaos,
    image: gitLaos,
  },
];

type FolderCardProps = {
  cert: Certificate;
  darkMode: boolean;
};

function FolderCard({ cert, darkMode }: FolderCardProps) {
  const folderColor = darkMode ? "#101827" : "#E5E7EB";
  const textColor = darkMode ? "#FFFFFF" : "#111827";
  const secondaryColor = darkMode ? "#9CA3AF" : "#6B7280";

  return (
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View certificate: ${cert.title}`}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap="hover"
      animate="rest"
      className="group relative block w-full cursor-pointer"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Outer Card */}
      <motion.div
        variants={{
          rest: { y: 0 },
          hover: { y: -6 },
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
        }}
        className="relative h-[370px] sm:h-[400px] overflow-hidden rounded-[25px] border-[7px] border-[#FF2D55] bg-[#FF2D55] shadow-xl"
      >
        {/* IMAGE BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden rounded-[18px] bg-gray-800">
          <motion.img
            src={cert.image}
            alt={cert.title}
            loading="lazy"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.08 },
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full w-full object-cover object-top"
          />

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/35" />
        </div>

        {/* FOLDER FRONT - SLIDES DOWN */}
        <motion.div
          variants={{
            rest: { y: "0%" },
            hover: { y: "43%" },
          }}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 17,
            mass: 0.9,
          }}
          className="absolute bottom-0 left-0 right-0 z-20 h-[72%]"
        >
          {/* Folder silhouette */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: folderColor,
              clipPath:
                "polygon(0 0, 23% 0, 32% 9%, 100% 9%, 100% 100%, 0 100%)",
              borderRadius: "0 18px 16px 16px",
            }}
          />

          {/* Soft highlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              background:
                "linear-gradient(145deg, rgba(255,255,255,.25), transparent 60%)",
              clipPath:
                "polygon(0 0, 23% 0, 32% 9%, 100% 9%, 100% 100%, 0 100%)",
            }}
          />

          {/* Number */}
          <div
            className="absolute left-5 top-[12%] sm:left-6"
            style={{ color: textColor }}
          >
            <span className="text-[46px] font-medium leading-none tracking-tight sm:text-[54px]">
              {cert.id}
            </span>
          </div>

          {/* Arrow */}
          <div
            className="absolute right-5 top-[15%] sm:right-6"
            style={{ color: textColor }}
          >
            <ArrowUpRight
              size={24}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </div>

          {/* Text content */}
          <div className="absolute bottom-6 left-5 right-5 sm:left-6 sm:right-6">
            <h3
              className="mb-2 line-clamp-2 text-lg font-bold leading-snug sm:text-xl"
              style={{ color: textColor }}
            >
              {cert.title}
            </h3>

            <p
              className="line-clamp-3 text-xs leading-relaxed sm:text-sm"
              style={{ color: secondaryColor }}
            >
              {cert.description}
            </p>
          </div>
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          variants={{
            rest: { opacity: 0, y: 8 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md"
        >
          View Certificate ↗
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

export default function CertificateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { darkMode } = useTheme();

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className={`relative overflow-hidden py-20 transition-colors duration-500 bg-transparent`}
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -right-72 bottom-0 h-[600px] w-[600px] rounded-full blur-[90px]"
          style={{
            background: darkMode
              ? "radial-gradient(circle, rgba(255,45,85,0.23), transparent 70%)"
              : "radial-gradient(circle, rgba(255,45,85,0.15), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 md:px-10">
        {/* SECTION TITLE */}
        <div className="mb-14 text-center">
          <h2
            className={`mb-4 text-4xl font-extrabold md:text-6xl ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="relative inline-block">
              Certificates
              <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-red-400 to-transparent" />
            </span>
          </h2>

          <p
            className={`text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Certificates I've earned
          </p>
        </div>

        {/* FOLDER CARDS */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {certificates.map((cert) => (
            <FolderCard
              key={cert.id}
              cert={cert}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
