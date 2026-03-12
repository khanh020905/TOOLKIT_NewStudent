import React from 'react';
import { Link } from 'react-router-dom';
import { GoArrowRight } from 'react-icons/go';

const Hero = () => {
  return (
    <section className="relative pt-20 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center space-y-8 max-w-4xl mx-auto relative z-10">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm animate-fade-in-up">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500"></span>
          </span>
          <span className="text-sm font-semibold text-primary-950 font-(family-name:--font-display) tracking-wide">
            Liêm chính học thuật - Đại học FPT
          </span>
        </div>

        {/* Huge Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-[80px] font-extrabold text-primary-950 font-(family-name:--font-heading) leading-[1.1] tracking-tight">
          Luôn học hỏi và nâng cao <span className="text-accent-500">kiến thức</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto font-medium">
          Bộ công cụ thiết yếu giúp bạn phòng tránh đạo văn, trích dẫn chuẩn xác và sử dụng AI một cách có đạo đức. Bắt đầu hành trình học thuật tự tin ngay hôm nay.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link
            to="/quiz"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-950 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-primary-900 hover:scale-105 active:scale-95 shadow-xl shadow-primary-950/20"
          >
            Bắt đầu làm bài test
            <GoArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#tools"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-950 border border-surface-200 font-semibold rounded-xl transition-all duration-300 hover:bg-surface-50 hover:border-surface-300"
          >
            Khám phá công cụ
          </a>
        </div>

        {/* Social Proof / Stats */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-left max-w-2xl mx-auto">
          <div className="flex -space-x-3">
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=1" alt="Student" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=2" alt="Student" />
            <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://i.pravatar.cc/100?img=3" alt="Student" />
            <div className="w-10 h-10 rounded-full border-2 border-white bg-accent-100 flex items-center justify-center text-accent-700 text-xs font-bold z-10">
              +2k
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-accent-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <p className="text-sm text-surface-600 font-medium">Truy cập bởi hơn 2000+ sinh viên FPT</p>
          </div>
        </div>

      </div>

      {/* Hero Visuals / Background elements */}
      <div className="absolute top-[20%] right-[-5%] w-64 h-64 bg-accent-400/20 rounded-full blur-[80px] -z-10" />
      <div className="absolute bottom-[20%] left-[-5%] w-72 h-72 bg-primary-400/20 rounded-full blur-[80px] -z-10" />
    </section>
  );
};

export default Hero;
