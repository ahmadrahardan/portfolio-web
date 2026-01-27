import Simbako from "../assets/Simbako.webp";
import Sepadu from "../assets/Sepadu.webp";
import ITC from "../assets/ITC.webp";
import Portfolio from "../assets/Portfolio.webp";
import HeyBrew from "../assets/HeyBrew.webp";
import Simba from "../assets/Simba.webp";
import SSO from "../assets/SSO.webp";
import VSimbako from "../assets/simbakoo.mov";
import VSepadu from "../assets/sepadu.mov";
import VITC from "../assets/itconvert.mov";
import VPortfolio from "../assets/wp.mov";
import VHeyBrew from "../assets/heybrew.mov";
import VSimba from "../assets/Simba.webm";
import VSSO from "../assets/sso.mov";

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  role: string;
  technologies: string[];
  technologiesDetail?: {
    backend?: string[];
    frontend?: string[];
    tools?: string[];
  };
  color: string;
  githubLink?: string;
  demoLink?: string;
  year?: number;
  duration?: string;
  status?: "Almost Done" | "Completed" | "In Progress" | string;
  overview?: string;
  keyfeatures?: string[];
  video?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "simba",
    title: "SIMBA",
    description:
      "SIMBA is a web-based system that enables the comprehensive integration of asset management and inventory control processes, including general warehouse management. In this system, I contribute as backend developer for employee management features and reporting dashboards.",
    image: Simba,
    video: VSimba,
    role: "Backend Developer for employee management features and reporting dashboards",
    technologies: ["Laravel", "PHP"],
    technologiesDetail: {
      backend: ["Laravel", "PHP", "MySQL"],
      frontend: ["React.js", "Tailwind CSS"],
      tools: ["Git"],
    },
    color: "#FF2D55",
    githubLink: "https://github.com/fauzul91/inventory-rsud",
    year: 2025,
    duration: "4 months",
    status: "Completed",
    overview:
      "SIMBA (Sistem Informasi Manajemen Barang dan Aset) is a web-based system designed to support the processes of goods receiving, ordering, stock recording, and inventory reporting in a centralized and digital manner. Through the implementation of this system, RSD Balung can accelerate internal business processes, reduce paper usage, and shorten document confirmation time. Overall, this system is expected to serve as an initial step toward sustainable digital transformation within the RSD Balung environment.",
    keyfeatures: [
      "Goods Inbound and Outbound Management",
      "User Account Management",
      "Automated Notifications and Reporting",
      "Inventory Management",
    ],
  },
  {
    id: 2,
    slug: "simbako",
    title: "Simbako",
    description:
      "Simbako is a training system for the tobacco industry in Jember, streamlining training applications and improving industry knowledge.",
    image: Simbako,
    video: VSimbako,
    role: "Fullstack Developer",
    technologies: ["Laravel", "PHP", "Tailwind"],
    technologiesDetail: {
      backend: ["Laravel", "PHP", "MySQL"],
      frontend: ["Blade", "Alpine.js", "Tailwind CSS"],
      tools: ["Git"],
    },
    color: "#FF2D55",
    githubLink: "https://github.com/ahmadrahardan/simbako",
    year: 2025,
    duration: "4 months",
    status: "Completed",
    overview:
      "Simbako is a comprehensive training and education submission system built to support the tobacco industry in Jember. The platform provides solution for managing training programs, starting from the submission of applications by participants, verification and approval by authorized officers, scheduling of sessions, and monitoring the implementation process, up to the preparation of reports and evaluations. By shifting manual workflows into a structured online system, Simbako reduces administrative errors, ensures transparency in every stage of the process, and offers real-time access to training data. This initiative is expected to not only streamline the efficiency of training management but also improve the overall quality of human resources within the tobacco industry ecosystem in Jember and its surrounding regions.",
    keyfeatures: [
      "Online Training Application Submission",
      "Verification & Approval Workflow",
      "Training Schedule Management",
      "Educational Articles Module",
    ],
  },
  {
    id: 3,
    slug: "sepadu",
    title: "Sepadu",
    description:
      "Sepadu is an integrated training platform for industries in Jember Regency to submit training requests.",
    image: Sepadu,
    video: VSepadu,
    role: "Fullstack Developer",
    technologies: ["Laravel", "PHP", "Tailwind"],
    technologiesDetail: {
      backend: ["Laravel", "PHP", "MySQL"],
      frontend: ["Blade", "Alpine.js", "Tailwind CSS"],
      tools: ["Git"],
    },
    color: "#FF2D55",
    githubLink: "https://github.com/ahmadrahardan/sepadu",
    year: 2025,
    duration: "3 months",
    status: "Completed",
    overview:
      "Sepadu is an integrated training management system developed to streamline the process of industry training in Jember Regency. The platform enables business owners and industry players to easily submit training requests to the Department of Trade and Industry through a centralized digital system. Beyond submission, Sepadu also supports the verification and approval process, scheduling of training sessions, monitoring of implementation, and preparation of comprehensive reports. By digitizing these workflows, Sepadu reduces bureaucratic complexity, increases transparency between stakeholders, and ensures that training programs can be delivered more effectively. In the long run, Sepadu is expected to enhance collaboration between local industries and the government, improve the accessibility of training resources, and strengthen the overall industrial ecosystem in Jember Regency.",
    keyfeatures: [
      "Digital Training Request Submission",
      "Verification & Approval Workflow",
      "Training Schedule Management",
      "Request Status Tracking",
    ],
  },
  {
    id: 4,
    slug: "it-convert",
    title: "IT Convert",
    description:
      "IT Convert is a website developed by the Information Systems Student Association for submitting and managing ICT competition proposals.",
    image: ITC,
    video: VITC,
    role: "Frontend Developer",
    technologies: ["Laravel", "PHP", "Tailwind"],
    technologiesDetail: {
      backend: ["Laravel", "PHP", "MySQL"],
      frontend: ["Blade", "Alpine.js", "Tailwind CSS"],
      tools: ["Git"],
    },
    color: "#FF2D55",
    githubLink: "https://itconvert.himasif.id/",
    demoLink: "https://itconvert.himasif.id/",
    year: 2025,
    duration: "2 months",
    status: "Completed",
    overview:
      "IT Convert is a web-based platform initiated by the Information Systems Student Association (HIMASIF) to facilitate participation in competitions and the submission of proposals within the field of Information and Communication Technology (ICT). The system provides students and teams with a structured and user-friendly interface to register for competitions, upload and manage their proposals, and track the progress of their submissions. In addition to streamlining the registration process, IT Convert also includes features for administrators, such as proposal verification, evaluation panels, and archival management, ensuring that the entire competition workflow runs transparently and efficiently. By leveraging this platform, HIMASIF not only promotes student engagement in ICT-related competitions but also nurtures innovation, collaboration, and academic excellence among participants.",
    keyfeatures: [
      "Online Competition Registration",
      "Proposal Submission & Management",
      "Competition Workflow Management",
    ],
  },
  {
    id: 5,
    slug: "profile-website",
    title: "Profile Website",
    description:
      "A personal portfolio website designed to showcase personal profile, completed projects, technical skills, and organizational experience.",
    image: Portfolio,
    video: VPortfolio,
    role: "Frontend Developer",
    technologies: ["React", "Tailwind"],
    technologiesDetail: {
      backend: [],
      frontend: ["React.js", "Tailwind CSS"],
      tools: ["Git"],
    },
    color: "#FF2D55",
    githubLink: "https://github.com/ahmadrahardan/portfolio-web",
    year: 2026,
    duration: "ongoing",
    status: "In Progress",
    overview:
      "A personal portfolio website designed as a comprehensive platform to showcase an individual's professional profile, completed projects, technical expertise, and organizational experience. This website serves as both a digital resume and a personal brand hub, presenting information in a clean, modern, and interactive interface. Visitors can explore detailed descriptions of projects, view technical skills categorized by area of expertise, and gain insights into organizational involvement or achievements. The platform is also responsive and optimized for accessibility, ensuring a seamless experience across devices. Beyond functioning as a static profile, the portfolio website highlights the individual's adaptability, creativity, and commitment to continuous learning, making it an effective medium for networking, professional opportunities, and academic recognition.",
    keyfeatures: [
      "Project Showcase",
      "Tech Stack Visualization",
      "Experience & Education Timeline",
      "Dark/Light Theme",
    ],
  },
  {
    id: 6,
    slug: "hey-brew",
    title: "Hey Brew",
    description:
      "Hey Brew is a web-based coffee bean management and recommendation system for Dopy Coffee.",
    image: HeyBrew,
    video: VHeyBrew,
    role: "System Analyst",
    technologies: ["Enterprise Architect"],
    technologiesDetail: {
      backend: [],
      frontend: [],
      tools: ["Enterprise Architect", "Oracle Datamodeler"],
    },
    color: "#FF2D55",
    year: 2024,
    duration: "4 months",
    status: "Completed",
    overview:
      "HeyBrew is a web-based Coffee Bean Management and Recommendation System developed for Dopy Coffee. This system is designed to help the business manage its coffee bean inventory more efficiently while also providing intelligent recommendations tailored to customer needs. By integrating digital management with recommendation features, HeyBrew aims to streamline daily operations, reduce errors in stock control, and enhance the overall customer experience at Dopy Coffee.",
    keyfeatures: [
      "Product Catalog Management",
      "Coffee Recipe Notes",
      "Coffee Product Transactions",
      "Product Sales Reports",
    ],
  },
  {
    id: 7,
    slug: "sso",
    title: "Single Sign-On (SSO)",
    description:
      "SSO (Single Sign-On) is an authentication mechanism that allows users to access multiple applications or systems with a single login.",
    image: SSO,
    video: VSSO,
    role: "Backend Developer",
    technologies: ["Laravel", "PHP"],
    technologiesDetail: {
      backend: ["Laravel", "PHP", "MySQL"],
      frontend: ["Blade", "Tailwind CSS"],
      tools: ["Git"],
    },
    color: "#FF2D55",
    githubLink: "https://github.com/ahmadrahardan/sso-passport",
    year: 2025,
    duration: "4 months",
    status: "Completed",
    overview:
      "SSO (Single Sign-On) is a web-based system that provides Single Sign-On (SSO) authentication services, allowing users from various hospital divisions (Super Admin, Warehouse Admin, PPK Team, Person in Charge, and Installation) to access all internal modules with a single login. The system improves work efficiency, data security, and user identity consistency across all integrated applications.",
    keyfeatures: [
      "User management module for Super Admin",
      "Centralized Authentication",
    ],
  },
];
