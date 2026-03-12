import React from 'react';
import { Link } from 'react-router-dom';
import { GoCheckCircle, GoFileDirectory, GoVideo, GoCode } from 'react-icons/go';

const Features = () => {
  return (
    <section id="tools" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-(family-name:--font-heading) text-primary-950 mb-4 tracking-tight">
          Mọi thứ bạn cần để <span className="text-accent-500">thành công</span>
        </h2>
        <p className="text-lg text-surface-600">
          Bốn công cụ mạnh mẽ được thiết kế riêng cho sinh viên Đại học FPT nhằm đảm bảo bài tập của bạn luôn nguyên bản, trích dẫn đúng chuẩn và tuân thủ đạo đức học thuật.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Tool 1: Plagiarism Checker (Large Card) */}
        <div className="lg:col-span-2 group relative bg-white border border-surface-200 rounded-3xl p-8 hover:shadow-2xl hover:border-primary-300 transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/50 rounded-bl-[100px] -z-10 transition-transform group-hover:scale-110" />
          
          <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6">
            <GoCheckCircle className="w-7 h-7" />
          </div>
          
          <h3 className="text-2xl font-bold text-primary-950 mb-3 font-(family-name:--font-heading)">
            Kiểm tra đạo văn & AI
          </h3>
          <p className="text-surface-600 mb-6 max-w-md">
            Kiểm tra bài tập của bạn với hàng triệu nguồn tài liệu ngay lập tức. Nhận báo cáo chi tiết về tỷ lệ trùng lặp và phát hiện nội dung AI trước khi nộp lên Coursera.
          </p>
          
          <Link to="/plagiarism-checker" className="inline-flex items-center gap-2 font-semibold text-primary-600 hover:text-primary-700 transition-colors">
            Dùng thử ngay <span aria-hidden="true">&rarr;</span>
          </Link>
          
          {/* Mockup UI illustration */}
          <div className="mt-8 border border-surface-200 rounded-xl bg-surface-50 p-4 shadow-inner relative overflow-hidden h-32 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-surface-200 rounded w-3/4"></div>
                <div className="h-2 bg-surface-200 rounded w-full"></div>
                <div className="h-2 bg-primary-400 rounded w-5/6"></div>
                <div className="h-2 bg-surface-200 rounded w-4/5"></div>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-success flex items-center justify-center font-bold text-success text-sm bg-white shrink-0">
                0%
              </div>
            </div>
          </div>
        </div>

        {/* Tool 2: Citation Generator */}
        <div className="group relative bg-primary-950 text-white border border-primary-900 rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-500/20 rounded-tl-[80px] -z-10 transition-transform group-hover:scale-110" />
          
          <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
            <GoCode className="w-7 h-7" />
          </div>
          
          <h3 className="text-2xl font-bold mb-3 font-(family-name:--font-heading)">
            Trình tạo trích dẫn
          </h3>
          <p className="text-primary-200 mb-6">
            Không còn nỗi lo mất điểm vì sai định dạng. Tự động tạo trích dẫn APA hoặc Harvard ngay lập tức từ một đường link hoặc mã ISBN sách.
          </p>
          
          <Link to="/citation-generator" className="inline-flex items-center gap-2 font-semibold text-accent-400 hover:text-accent-300 transition-colors">
            Tạo trích dẫn <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Tool 3: LearnLab (Video Hub) */}
        <div className="group relative bg-[#fff7ed] border border-accent-200 rounded-3xl p-8 hover:shadow-2xl hover:border-accent-300 transition-all duration-300">
          <div className="w-14 h-14 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mb-6">
            <GoVideo className="w-7 h-7" />
          </div>
          
          <h3 className="text-2xl font-bold text-accent-950 mb-3 font-(family-name:--font-heading)">
            Học tập qua Video
          </h3>
          <p className="text-accent-800/80 mb-6">
            Xem các video hướng dẫn và chia sẻ từ các giảng viên FPT về cách viết lại câu (paraphrase) và duy trì liêm chính học thuật.
          </p>
          
          <Link to="/learnlab" className="inline-flex items-center gap-2 font-semibold text-accent-600 hover:text-accent-700 transition-colors">
            Bắt đầu học <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Tool 4: Support & Mini Courses (Spans 2 cols on LG) */}
        <div className="lg:col-span-2 group relative bg-white border border-surface-200 rounded-3xl p-8 hover:shadow-2xl hover:border-surface-300 transition-all duration-300 flex flex-col md:flex-row gap-8 items-center overflow-hidden">
          <div className="flex-1">
            <div className="w-14 h-14 bg-surface-100 text-surface-600 rounded-2xl flex items-center justify-center mb-6">
              <GoFileDirectory className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-bold text-primary-950 mb-3 font-(family-name:--font-heading)">
              Khóa học ngắn & Hỗ trợ 1-1
            </h3>
            <p className="text-surface-600 mb-6 max-w-md">
              Làm các bài test ngắn để kiểm tra kiến thức. Vẫn còn thắc mắc? Kết nối trực tiếp với đội ngũ hỗ trợ qua Fanpage Facebook để được giải đáp 1 kèm 1.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/quiz" className="px-5 py-2.5 bg-surface-100 text-surface-900 hover:bg-surface-200 font-semibold rounded-xl transition-colors">
                Làm bài test
              </Link>
              <a href="https://www.facebook.com/profile.php?id=61583706310530" target="_blank" rel="noreferrer" className="px-5 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold rounded-xl transition-colors">
                Hỗ trợ qua Facebook
              </a>
            </div>
          </div>
          
          {/* Decorative element */}
          <div className="hidden md:flex w-48 h-48 bg-surface-50 rounded-full border-8 border-white shadow-[0_0_40px_rgba(0,0,0,0.05)] items-center justify-center shrink-0">
             <div className="w-32 h-32 bg-primary-50 rounded-full flex items-center justify-center">
                <span className="text-4xl">🎓</span>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Features;
