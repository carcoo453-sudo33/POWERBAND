import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = [
      'home',
      'features', 
      'products',
      'pricing',
      'team',
      'reviews',
      'contact'
    ];

    const observerOptions = {
      root: document.querySelector('.main-scroll-container'), // Use our scroll container as root
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sections.includes(sectionId)) {
            setActiveSection(sectionId);
            
            // Update URL hash without scrolling
            const newUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
            window.history.replaceState(null, '', newUrl);
          }
        }
      });
    };

    // Wait for the scroll container to be available
    const initObserver = () => {
      const scrollContainer = document.querySelector('.main-scroll-container');
      if (!scrollContainer) {
        setTimeout(initObserver, 100);
        return;
      }

      const observer = new IntersectionObserver(observerCallback, {
        ...observerOptions,
        root: scrollContainer
      });

      // Observe all sections
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.observe(element);
        }
      });

      // Set initial active section based on URL hash
      const hash = window.location.hash.slice(1);
      if (hash && sections.includes(hash)) {
        setActiveSection(hash);
      }

      // Handle hash changes (back/forward navigation)
      const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        if (hash && sections.includes(hash)) {
          setActiveSection(hash);
        } else if (!hash) {
          setActiveSection('home');
        }
      };

      window.addEventListener('hashchange', handleHashChange);

      return () => {
        observer.disconnect();
        window.removeEventListener('hashchange', handleHashChange);
      };
    };

    const cleanup = initObserver();
    return cleanup;
  }, []);

  return activeSection;
}