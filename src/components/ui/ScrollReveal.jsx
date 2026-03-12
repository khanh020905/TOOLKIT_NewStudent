import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom center",
}) => {
  const containerRef = useRef(null);
  const triggersRef = useRef([]);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="inline-block word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : undefined;

    const scrollerConfig = scroller ? { scroller } : {};

    const t1 = gsap.fromTo(
      el,
      { transformOrigin: "0% 50%", rotate: baseRotation },
      {
        ease: "none",
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          ...scrollerConfig,
          start: "top bottom",
          end: rotationEnd,
          scrub: true,
        },
      },
    );

    const wordElements = el.querySelectorAll(".word");

    const t2 = gsap.fromTo(
      wordElements,
      { opacity: baseOpacity, willChange: "opacity" },
      {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          ...scrollerConfig,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      },
    );

    // Store triggers for cleanup
    triggersRef.current = [t1.scrollTrigger, t2.scrollTrigger];

    if (enableBlur) {
      const t3 = gsap.fromTo(
        wordElements,
        { filter: `blur(${blurStrength}px)` },
        {
          ease: "none",
          filter: "blur(0px)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            ...scrollerConfig,
            start: "top bottom-=20%",
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      );
      triggersRef.current.push(t3.scrollTrigger);
    }

    return () => {
      // Only kill THIS component's scroll triggers
      triggersRef.current.forEach((trigger) => {
        if (trigger) trigger.kill();
      });
      triggersRef.current = [];
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <div ref={containerRef} className={`my-5 ${containerClassName}`}>
      <p
        className={`text-[clamp(1rem,2.5vw,1.25rem)] leading-[1.7] font-medium ${textClassName}`}
      >
        {splitText}
      </p>
    </div>
  );
};

export default ScrollReveal;
