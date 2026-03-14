import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GoArrowRight, GoRocket } from "react-icons/go";

import BlurText from "../ui/BlurText";
import TargetCursor from "../ui/TargetCursor";

const Hero = () => {
  const heroRef = useRef(null);
  const [inHero, setInHero] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      window.matchMedia
        ? !window.matchMedia("(hover: hover) and (pointer: fine)").matches
        : false,
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setInHero(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showCursor = inHero && !isMobile;

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ cursor: showCursor ? "none" : "auto" }}
    >
      {/* Target Cursor — only on desktop when in hero viewport */}
      {showCursor && (
        <TargetCursor
          targetSelector=".cursor-target"
          spinDuration={2}
          hideDefaultCursor={false}
          parallaxOn
          hoverDuration={0.2}
        />
      )}

      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          willChange: "transform",
          backfaceVisibility: "hidden",
          background: "#0f1647",
        }}
        src="/videos/hero.mp4"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-950/70 via-primary-950/50 to-primary-950/80" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Huge Headline */}
        <BlurText
          text="Luôn học hỏi và nâng cao kiến thức"
          delay={100}
          animateBy="words"
          direction="top"
          className="text-5xl sm:text-6xl md:text-[80px] font-extrabold text-white font-(family-name:--font-heading) leading-[1.1] tracking-tight drop-shadow-lg justify-center"
          highlightWords={["kiến", "thức"]}
          highlightClassName="text-accent-400"
        />

        {/* Subtitle */}
        <BlurText
          text="Bộ công cụ thiết yếu giúp bạn phòng tránh đạo văn, trích dẫn chuẩn xác và sử dụng AI một cách có đạo đức."
          delay={30}
          animateBy="words"
          direction="bottom"
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium drop-shadow-sm justify-center"
          stepDuration={0.3}
        />

        {/* CTA Buttons */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#tools"
            className="cursor-target group inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-sm font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/30 text-lg"
          >
            Khám phá công cụ
            <GoArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to="/login"
            className="cursor-target group inline-flex items-center justify-center gap-2 px-10 py-4 bg-accent-500 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-accent-400 text-lg shadow-lg shadow-accent-500/30"
          >
            Bắt đầu
            <GoRocket className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
