import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Projects from './components/Projects';
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
          <Projects />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
