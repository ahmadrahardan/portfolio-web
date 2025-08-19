import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import About from "./components/About";
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Home />
          <About />
          <Skills />
          <Projects />
          <Certificates />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
