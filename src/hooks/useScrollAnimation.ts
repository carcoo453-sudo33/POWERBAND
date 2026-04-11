import { useEffect } from "react";

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
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
  }, []);
}
