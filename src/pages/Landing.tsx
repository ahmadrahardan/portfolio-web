import Home from "../components/Home";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";
// import TextRevealSection from "../components/TextRevealSection";
import { useTheme } from "../context/ThemeContext";

export default function Landing() {
  const { darkMode } = useTheme();

  return (
    <main className="relative isolate">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: darkMode
            ? "linear-gradient(115deg, #08091A 0%, #171D42 42%, #10263A 100%)"
            : "#ffffff",
        }}
      />

      <div className="relative z-10">
        <Home />
        {/* <TextRevealSection /> */}
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certificates />
      </div>
    </main>
  );
}
