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
    { icon: GoChecklist, label: "20 câu hỏi", desc: "Trắc nghiệm đa dạng" },
    { icon: GoMortarBoard, label: "3 cấp độ", desc: "Cơ bản → Nâng cao" },
    { icon: GoShield, label: "Miễn phí", desc: "Không giới hạn lần làm" },
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative bg-white border border-surface-200 rounded-3xl overflow-hidden shadow-2xl shadow-surface-200/50">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-50/80 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 border border-primary-100 backdrop-blur-md">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
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
                highlightClassName="text-accent-500"
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
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-950 text-white font-bold text-lg rounded-2xl hover:bg-primary-900 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 shadow-lg shadow-primary-900/20 w-full sm:w-auto"
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
                  className="flex items-center gap-5 p-5 bg-white border border-surface-200 rounded-2xl hover:border-primary-200 hover:shadow-lg transition-all duration-300 group shadow-sm shadow-black/5"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 border border-primary-100 group-hover:bg-primary-100 transition-colors">
                    <stat.icon className="w-7 h-7 text-primary-600" />
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
