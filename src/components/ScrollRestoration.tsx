
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (pathname !== "/") return;

    const storageKey = "portfolio-scroll-position";

    // Matikan pemulihan scroll otomatis browser
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    // Ambil posisi scroll sebelum refresh
    const savedPosition = sessionStorage.getItem(storageKey);

    if (savedPosition !== null) {
      const targetY = Number(savedPosition);

      if (Number.isFinite(targetY)) {
        // Pulihkan posisi setelah halaman siap dirender
        requestAnimationFrame(() => {
          window.scrollTo({
            top: targetY,
            behavior: "instant",
          });
        });
      }
    }

    // Simpan posisi saat pengguna scroll
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        storageKey,
        String(window.scrollY)
      );
    };

    window.addEventListener("scroll", saveScrollPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [pathname]);

  return null;
};

export default ScrollRestoration;
