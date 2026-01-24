// App.tsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import Landing from "./pages/Landing";
import ProjectDetail from "./pages/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop";

function Layout() {
  const location = useLocation();

  // halaman detail project: /projects/:slug
  const hideNavbar = location.pathname.startsWith("/projects/");

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
      {!hideNavbar && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
