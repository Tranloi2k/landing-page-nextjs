"use client";

import { useRef, useEffect } from "react";

const About = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const elementNeedObser = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        console.log("see it");
      }
    };

    const options: IntersectionObserverInit = {
      root: null, // Theo dõi trong viewport
      rootMargin: "0px",
      threshold: 1.0, // Gọi khi phần tử cuối cùng hoàn toàn nằm trong viewport
    };

    observer.current = new IntersectionObserver(callback, options);

    const currentRef = elementNeedObser.current;
    if (currentRef) {
      observer.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observer.current) {
        observer.current.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div>
      <div className="h-[900px]">about</div>
      <p ref={elementNeedObser}>need observe</p>
    </div>
  );
};

export default About;
