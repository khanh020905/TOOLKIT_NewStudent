import React from "react";
import { Link } from "react-router-dom";
import {
  GoCheckCircle,
  GoFileDirectory,
  GoVideo,
  GoCode,
  GoArrowRight,
} from "react-icons/go";
import BlurText from "../ui/BlurText";
import ScrollReveal from "../ui/ScrollReveal";

const Features = () => {
  return (
    <section
      id="tools"
      className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="text-center max-w-2xl mx-auto mb-16">
        <BlurText
          text="Mọi thứ bạn cần để thành công"
          delay={80}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-5xl font-bold font-(family-name:--font-heading) text-primary-950 mb-4 tracking-tight justify-center"
        />
        <ScrollReveal
          baseOpacity={0.15}
          enableBlur
          baseRotation={1}
          blurStrength={3}
          containerClassName="my-0"
          textClassName="text-lg text-surface-600"
        >
          Bốn công cụ mạnh mẽ được thiết kế riêng cho sinh viên Đại học FPT nhằm
          đảm bảo bài tập của bạn luôn nguyên bản, trích dẫn đúng chuẩn và tuân
          thủ đạo đức học thuật.
        </ScrollReveal>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Tool 1: Plagiarism Checker (Large Card) */}
        <div
          className="lg:col-span-2 group relative rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-1"
          style={{
            background:
              "linear-gradient(135deg, #eff3ff 0%, #dbe4fe 40%, #e8dff5 100%)",
            border: "1px solid rgba(37, 69, 234, 0.1)",
          }}
        >
          {/* Decorative gradient blob */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full -z-10 transition-transform group-hover:scale-125 blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(37,69,234,0.15), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full -z-10 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.12), transparent 70%)",
            }}
          />

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
            style={{ background: "linear-gradient(135deg, #2545ea, #7c3aed)" }}
          >
            <GoCheckCircle className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-primary-950 mb-3 font-(family-name:--font-heading)">
            Kiểm tra đạo văn & AI
          </h3>
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur
            baseRotation={1}
            blurStrength={3}
            containerClassName="my-0 mb-6"
            textClassName="text-surface-700 max-w-md"
          >
            Kiểm tra bài tập của bạn với hàng triệu nguồn tài liệu ngay lập tức.
            Nhận báo cáo chi tiết về tỷ lệ trùng lặp và phát hiện nội dung AI
            trước khi nộp lên Coursera.
          </ScrollReveal>

          <Link
            to="/plagiarism-checker"
            className="group/link inline-flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            Dùng thử ngay{" "}
            <GoArrowRight className="group-hover/link:translate-x-1 transition-transform" />
          </Link>

          {/* Mockup UI illustration */}
          <div
            className="mt-8 rounded-xl p-4 shadow-inner relative overflow-hidden h-32 opacity-80 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(37,69,234,0.08)",
            }}
          >
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-primary-200/60 rounded w-3/4"></div>
                <div className="h-2 bg-primary-200/40 rounded w-full"></div>
                <div
                  className="h-2 rounded w-5/6"
                  style={{
                    background: "linear-gradient(90deg, #2545ea, #7c3aed)",
                  }}
                ></div>
                <div className="h-2 bg-primary-200/40 rounded w-4/5"></div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-emerald-400 flex items-center justify-center font-bold text-emerald-500 text-sm bg-white shrink-0 shadow-md">
                0%
              </div>
            </div>
          </div>
        </div>

        {/* Tool 2: Citation Generator */}
        <div
          className="group relative rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #0f1647 0%, #1e2a89 50%, #2545ea 100%)",
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full -z-10 blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
            style={{
              background: "radial-gradient(circle, #ff7a12, transparent 70%)",
            }}
          />

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "linear-gradient(135deg, #ff7a12, #ff9639)" }}
          >
            <GoCode className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-3 font-(family-name:--font-heading)">
            Trình tạo trích dẫn
          </h3>
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur
            baseRotation={1}
            blurStrength={3}
            containerClassName="my-0 mb-6"
            textClassName="text-primary-200"
          >
            Không còn nỗi lo mất điểm vì sai định dạng. Tự động tạo trích dẫn
            APA hoặc Harvard ngay lập tức từ một đường link hoặc mã ISBN sách.
          </ScrollReveal>

          <Link
            to="/citation-generator"
            className="group/link inline-flex items-center gap-2 font-semibold text-accent-400 hover:text-accent-300 transition-colors"
          >
            Tạo trích dẫn{" "}
            <GoArrowRight className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tool 3: LearnLab (Video Hub) */}
        <div
          className="group relative rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #fff7ed 0%, #ffeed4 40%, #fef3c7 100%)",
            border: "1px solid rgba(249, 115, 22, 0.12)",
          }}
        >
          {/* Warm glow */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full -z-10 blur-3xl opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(249,115,22,0.15), transparent 70%)",
            }}
          />

          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
            style={{ background: "linear-gradient(135deg, #f97316, #f59e0b)" }}
          >
            <GoVideo className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-2xl font-bold text-amber-950 mb-3 font-(family-name:--font-heading)">
            Học tập qua Video
          </h3>
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur
            baseRotation={1}
            blurStrength={3}
            containerClassName="my-0 mb-6"
            textClassName="text-amber-800/80"
          >
            Xem các video hướng dẫn và chia sẻ từ các giảng viên FPT về cách
            viết lại câu (paraphrase) và duy trì liêm chính học thuật.
          </ScrollReveal>

          <Link
            to="/learnlab"
            className="group/link inline-flex items-center gap-2 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            Bắt đầu học{" "}
            <GoArrowRight className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Tool 4: Support & Mini Courses (Spans 2 cols on LG) */}
        <div
          className="lg:col-span-2 group relative rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col md:flex-row gap-8 items-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 40%, #e0f2fe 100%)",
            border: "1px solid rgba(16, 185, 129, 0.12)",
          }}
        >
          {/* Multi-color glow */}
          <div
            className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full -z-10 blur-3xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(37,69,234,0.12), transparent 70%)",
            }}
          />
          <div
            className="absolute -top-8 -left-8 w-48 h-48 rounded-full -z-10 blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)",
            }}
          />

          <div className="flex-1">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #10b981, #06b6d4)",
              }}
            >
              <GoFileDirectory className="w-7 h-7 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-primary-950 mb-3 font-(family-name:--font-heading)">
              Khóa học ngắn & Hỗ trợ 1-1
            </h3>
            <ScrollReveal
              baseOpacity={0.15}
              enableBlur
              baseRotation={1}
              blurStrength={3}
              containerClassName="my-0 mb-6"
              textClassName="text-surface-700 max-w-md"
            >
              Làm các bài test ngắn để kiểm tra kiến thức. Vẫn còn thắc mắc? Kết
              nối trực tiếp với đội ngũ hỗ trợ qua Fanpage Facebook để được giải
              đáp 1 kèm 1.
            </ScrollReveal>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/quiz"
                className="px-5 py-2.5 bg-white/80 text-emerald-700 hover:bg-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md border border-emerald-200/50"
              >
                Làm bài test
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61583706310530"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-white/80 text-blue-600 hover:bg-white font-semibold rounded-xl transition-all shadow-sm hover:shadow-md border border-blue-200/50"
              >
                Hỗ trợ qua Facebook
              </a>
            </div>
          </div>

          {/* Decorative element */}
          <div
            className="hidden md:flex w-48 h-48 rounded-full items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1))",
              border: "8px solid rgba(255,255,255,0.8)",
              boxShadow: "0 0 40px rgba(16,185,129,0.08)",
            }}
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.08))",
              }}
            >
              <span className="text-4xl">🎓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
