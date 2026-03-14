import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: -100, opacity: 0.1 },
        {
          y: 0,
          opacity: 0.3,
          ease: "power1.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }
  }, []);

  return (
    <footer
      ref={containerRef}
      className="bg-primary-950 text-white pt-24 pb-12 flex flex-col items-center"
    >
      {/* 1. Pre-Footer / CTA Section */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20 relative z-10 w-full">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-(family-name:--font-heading) italic font-semibold mb-6 tracking-tight text-white">
          Giải pháp toàn diện cho
          <br />
          liêm chính học thuật.
        </h2>
        <p className="text-primary-300/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          TrueStudy Toolkit là hệ thống hỗ trợ sinh viên hiện đại. Nhanh chóng,
          chính xác và được thiết kế cho tương lai của giáo dục tại FPT.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-20">
          <Link
            to="/quiz"
            className="px-8 py-4 bg-accent-500 text-white rounded-2xl font-bold text-lg hover:bg-accent-400 transition-colors duration-300 w-full sm:w-auto text-center"
          >
            Làm bài đánh giá
          </Link>
          <Link
            to="/learnlab"
            className="px-8 py-4 bg-white/10 text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-colors duration-300 border border-white/10 w-full sm:w-auto text-center"
          >
            Khám phá tính năng
          </Link>
        </div>

        {/* Trusted Partners */}
        <div className="mt-20 relative z-20">
          <p className="text-primary-400/50 text-xs font-bold tracking-[0.2em] uppercase mb-8">
            Được tin dùng bởi hơn 2000+ sinh viên FPT
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-primary-300/40 font-semibold text-lg">
            <span>FPT.EDU</span>
            <span>FU.HCM</span>
            <span>FU.Danang</span>
            <span>FU.HaNoi</span>
            <span>GRAMMARLY</span>
          </div>
        </div>
      </div>

      {/* 2. Massive Text + Bottom Links */}
      <div className="relative w-full border-t border-white/10 pt-10 px-6 sm:px-12 flex flex-col justify-end min-h-[30vh] z-10 overflow-hidden">
        {/* Massive Text Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none -z-10">
          <h1
            ref={textRef}
            className="text-[20vw] font-(family-name:--font-heading) font-bold text-accent-500/20 tracking-tighter whitespace-nowrap leading-none"
            style={{ transform: "translateY(10%)" }}
          >
            truestudy
          </h1>
        </div>

        {/* Bottom Links Row */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 pb-4 relative z-20">
          <div className="text-primary-400/50 text-sm font-semibold tracking-wide order-3 lg:order-1 text-center lg:text-left">
            © 2026 FPT UNIVERSITY Danang.
            <br />
            ALL RIGHTS RESERVED.
          </div>

          <div className="flex flex-wrap justify-center gap-6 lg:gap-10 text-white text-sm font-bold tracking-widest uppercase order-1 lg:order-2">
            <Link to="/" className="hover:text-accent-400 transition-colors">
              Trang chủ
            </Link>
            <Link
              to="/quiz"
              className="hover:text-accent-400 transition-colors"
            >
              Đánh giá
            </Link>
            <Link
              to="/learnlab"
              className="hover:text-accent-400 transition-colors"
            >
              Học tập
            </Link>
            <Link
              to="/support"
              className="hover:text-accent-400 transition-colors"
            >
              Hỗ trợ
            </Link>
          </div>

          <div className="flex items-center gap-6 text-white order-2 lg:order-3">
            <a
              href="https://www.facebook.com/profile.php?id=61583706310530"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-400 transition-colors text-sm font-bold tracking-widest uppercase"
            >
              FACEBOOK
            </a>
            <a
              href="#"
              className="hover:text-accent-400 transition-colors text-sm font-bold tracking-widest uppercase"
            >
              TIKTOK
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
