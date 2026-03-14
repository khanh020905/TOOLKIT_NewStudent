import React from "react";
import { Link } from "react-router-dom";
import {
  GoArrowRight,
  GoMortarBoard,
  GoChecklist,
  GoShield,
} from "react-icons/go";
import BlurText from "../ui/BlurText";
import ScrollReveal from "../ui/ScrollReveal";

const QuizCTA = () => {
  const stats = [
    {
      icon: GoChecklist,
      label: "20 câu hỏi",
      desc: "Trắc nghiệm đa dạng",
      gradient: "linear-gradient(135deg, #2545ea, #7c3aed)",
    },
    {
      icon: GoMortarBoard,
      label: "3 cấp độ",
      desc: "Cơ bản → Nâng cao",
      gradient: "linear-gradient(135deg, #f97316, #f59e0b)",
    },
    {
      icon: GoShield,
      label: "Miễn phí",
      desc: "Không giới hạn lần làm",
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
    },
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eff3ff 30%, #fdf4ff 70%, #fff7ed 100%)",
          border: "1px solid rgba(37, 69, 234, 0.08)",
        }}
      >
        {/* Decorative colour blobs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(37,69,234,0.1), transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.1), transparent 70%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full backdrop-blur-md"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(37,69,234,0.08), rgba(124,58,237,0.08))",
                  border: "1px solid rgba(37,69,234,0.12)",
                }}
              >
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent-500"></span>
                </span>
                <span className="text-primary-800 text-sm font-semibold tracking-wide">
                  Bài đánh giá kiến thức
                </span>
              </div>

              <BlurText
                text="Bạn hiểu bao nhiêu về liêm chính học thuật?"
                delay={80}
                animateBy="words"
                direction="top"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-950 font-(family-name:--font-heading) leading-tight tracking-tight"
                highlightWords={["liêm", "chính", "học", "thuật?"]}
                highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-500 to-accent-500"
              />

              <ScrollReveal
                baseOpacity={0.15}
                enableBlur
                baseRotation={2}
                blurStrength={3}
                containerClassName="my-0"
                textClassName="text-surface-600 text-lg md:text-xl leading-relaxed max-w-lg font-medium"
              >
                Làm bài test ngắn để kiểm tra kiến thức của bạn về đạo văn,
                trích dẫn nguồn và sử dụng AI đúng cách. Nhận kết quả phân loại
                ngay lập tức!
              </ScrollReveal>

              <Link
                to="/quiz"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto"
                style={{
                  background:
                    "linear-gradient(135deg, #0f1647 0%, #2545ea 100%)",
                  boxShadow:
                    "0 8px 30px rgba(37,69,234,0.25), 0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                Làm bài đánh giá ngay
                <GoArrowRight className="group-hover:translate-x-1 transition-transform text-xl" />
              </Link>
            </div>

            {/* Right: Stats Cards */}
            <div className="space-y-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 p-5 rounded-2xl hover:shadow-lg transition-all duration-300 group backdrop-blur-sm hover:-translate-y-0.5"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform"
                    style={{ background: stat.gradient }}
                  >
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-primary-950 font-bold text-lg">
                      {stat.label}
                    </p>
                    <p className="text-surface-600 text-sm font-medium">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizCTA;
