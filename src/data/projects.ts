
import Simbako from "../assets/Simbako.webp";
import Sepadu from "../assets/Sepadu.webp";
import ITC from "../assets/ITC.webp";
import Portfolio from "../assets/Portfolio.webp";
import HeyBrew from "../assets/HeyBrew.webp";

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  role: string;
  technologies: string[];
  color: string;
  githubLink?: string;
  demoLink?: string;
  year?: number;
  duration?: string;
  status?: "Almost Done" | "Completed" | "In Progress" | string;
  overview?: string;
  highlights?: string[];
  videoUrl?: string; 
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "simbako",
    title: "Simbako",
    description:
      "Simbako is a comprehensive training and education submission system built to support the tobacco industry in Jember. The platform provides an end-to-end digital solution for managing training programs, starting from the submission of applications by participants, verification and approval by authorized officers, scheduling of sessions, and monitoring the implementation process, up to the preparation of reports and evaluations. By shifting manual workflows into a structured online system, Simbako reduces administrative errors, ensures transparency in every stage of the process, and offers real-time access to training data. This initiative is expected to not only streamline the efficiency of training management but also improve the overall quality of human resources within the tobacco industry ecosystem in Jember and its surrounding regions.",
    image: Simbako,
    role: "Fullstack Developer",
    technologies: ["Laravel", "PHP", "Tailwind"],
    color: "#FF2D55",
    githubLink: "https://github.com/ahmadrahardan/simbako",
    year: 2025,
    duration: "4 months",
    status: "Completed",
    overview:
      "Simbako is an end-to-end training management platform that covers the entire process, from submission and verification to scheduling, implementation, and reporting. It is designed to support the Department of Trade and Industry along with its industry partners in improving training effectiveness. Developed using Laravel, PHP, and Tailwind, Simbako provides a modern, efficient, and accessible digital solution.",
    highlights: [
      "Role-based access (admin, verifikator, pemohon)",
      "Form pengajuan dinamis + upload lampiran",
      "Dashboard KPI & grafik aktivitas",
      "Ekspor laporan (PDF/Excel)",
    ],
  },
  {
    id: 2,
    slug: "sepadu",
    title: "Sepadu",
    description:
      "Sepadu is an integrated training management system developed to streamline the process of industry training in Jember Regency. The platform enables business owners and industry players to easily submit training requests to the Department of Trade and Industry through a centralized digital system. Beyond submission, Sepadu also supports the verification and approval process, scheduling of training sessions, monitoring of implementation, and preparation of comprehensive reports. By digitizing these workflows, Sepadu reduces bureaucratic complexity, increases transparency between stakeholders, and ensures that training programs can be delivered more effectively. In the long run, Sepadu is expected to enhance collaboration between local industries and the government, improve the accessibility of training resources, and strengthen the overall industrial ecosystem in Jember Regency.",
    image: Sepadu,
    role: "Fullstack Developer",
    technologies: ["Laravel", "PHP", "Tailwind"],
    color: "#FF2D55",
    githubLink: "https://github.com/ahmadrahardan/sepadu",
    year: 2025,
    duration: "3 months",
    status: "Completed",
    overview:
      "Sepadu is an integrated system that connects business owners with government institutions to strengthen capacity through scheduled training programs. Built with Laravel, PHP, and Tailwind, Sepadu streamlines the process of submission, verification, and scheduling of training, making it more transparent, efficient, and accessible.",
    highlights: [
      "Manajemen jadwal & kuota pelatihan",
      "Notifikasi email untuk status pengajuan",
      "Rekap kehadiran pelatihan",
    ],
  },
  {
    id: 3,
    slug: "it-convert",
    title: "IT Convert",
    description:
      "IT Convert is a web-based platform initiated by the Information Systems Student Association (HIMASIF) to facilitate participation in competitions and the submission of proposals within the field of Information and Communication Technology (ICT). The system provides students and teams with a structured and user-friendly interface to register for competitions, upload and manage their proposals, and track the progress of their submissions. In addition to streamlining the registration process, IT Convert also includes features for administrators and judges, such as proposal verification, evaluation panels, and archival management, ensuring that the entire competition workflow runs transparently and efficiently. By leveraging this platform, HIMASIF not only promotes student engagement in ICT-related competitions but also nurtures innovation, collaboration, and academic excellence among participants.",
    image: ITC,
    role: "Fullstack Developer",
    technologies: ["Laravel", "PHP", "Tailwind"],
    color: "#FF2D55",
    githubLink: "https://itconvert.himasif.id/",
    demoLink: "https://itconvert.himasif.id/",
    year: 2025,
    duration: "2 months",
    status: "Completed",
    overview:
      "IT Convert is a web-based portal designed for competition registration, proposal management, and activity publication for HIMASIF. Developed using Laravel, PHP, and Tailwind, the system provides a structured registration process, organized proposal management, and a more efficient and transparent way to publish information.",
    highlights: [
      "Multi-step form untuk pendaftaran tim",
      "Preview & arsip proposal",
      "Panel penilaian dewan juri",
    ],
  },
  {
    id: 4,
    slug: "profile-website",
    title: "Profile Website",
    description:
      "A personal portfolio website designed as a comprehensive platform to showcase an individual's professional profile, completed projects, technical expertise, and organizational experience. This website serves as both a digital resume and a personal brand hub, presenting information in a clean, modern, and interactive interface. Visitors can explore detailed descriptions of projects, view technical skills categorized by area of expertise, and gain insights into organizational involvement or achievements. The platform is also responsive and optimized for accessibility, ensuring a seamless experience across devices. Beyond functioning as a static profile, the portfolio website highlights the individual's adaptability, creativity, and commitment to continuous learning, making it an effective medium for networking, professional opportunities, and academic recognition.",
    image: Portfolio,
    role: "Front-End Developer",
    technologies: ["React", "Tailwind"],
    color: "#FF2D55",
    githubLink: "https://github.com/ahmadrahardan/portfolio-web",
    year: 2025,
    duration: "ongoing",
    status: "In Progress",
    overview:
      "Profile Website is a modern portfolio featuring interactive animations powered by Framer Motion, dark mode support via context, and an interactive project section to showcase works in an engaging way. Built with React and Tailwind, the website delivers a responsive, modern, and accessible design across different devices.",
    highlights: [
      "Framer Motion animation",
      "Dark/Light theme",
      "Aksesibilitas & SEO dasar",
    ],
  },
  {
    id: 5,
    slug: "hey-brew",
    title: "Hey Brew",
    description:
      "HeyBrew is a web-based Coffee Bean Management and Recommendation System developed for Dopy Coffee. This system is designed to help the business manage its coffee bean inventory more efficiently while also providing intelligent recommendations tailored to customer needs. By integrating digital management with recommendation features, HeyBrew aims to streamline daily operations, reduce errors in stock control, and enhance the overall customer experience at Dopy Coffee.",
    image: HeyBrew,
    role: "System Analyst",
    technologies: ["Enterprise Architect"],
    color: "#FF2D55",
    year: 2024,
    duration: "4 months",
    status: "Completed",
    overview:
      "HeyBrew is a web-based Coffee Bean Management and Recommendation System developed specifically for Dopy Coffee. The platform helps manage coffee bean inventory while also providing tailored recommendations based on customer needs. Built with Enterprise Architect.",
    highlights: [
      "Framer Motion animation",
      "Dark/Light theme",
      "Aksesibilitas & SEO dasar",
    ],
  },
];
