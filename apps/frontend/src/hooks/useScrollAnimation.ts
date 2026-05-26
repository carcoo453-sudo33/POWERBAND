import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const initObserver = () => {
      const scrollContainer = document.querySelector('.main-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 100);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { 
          threshold: 0.1, 
          rootMargin: "0px 0px -50px 0px",
          root: scrollContainer // Use our scroll container as root
        }
      );

      const selectors = [
        ".animate-on-scroll",
        ".animate-on-scroll-left",
        ".animate-on-scroll-right",
        ".animate-on-scroll-scale",
      ];

      const elements = document.querySelectorAll(selectors.join(","));
      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    const cleanup = initObserver();
    return cleanup;
  }, []);
}
