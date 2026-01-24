import Home from "../components/Home";
import About from "../components/About";
import Education from "../components/Education";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Certificates from "../components/Certificates";

export default function Landing() {
    return (
    <main>
        <Home />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certificates />
    </main>
    );
}
