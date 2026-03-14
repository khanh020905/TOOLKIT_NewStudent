import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GoBook,
  GoChevronDown,
  GoChevronUp,
  GoCheckCircle,
  GoLinkExternal,
  GoMortarBoard,
  GoLightBulb,
  GoShield,
  GoTools,
  GoPencil,
} from "react-icons/go";

const COURSES = [
  {
    id: "plagiarism",
    icon: <GoShield className="w-6 h-6" />,
    color: "bg-red-100 text-red-600",
    title: "Đạo văn là gì? Nhận diện & phòng tránh",
    duration: "5 phút đọc",
    sections: [
      {
        heading: "Đạo văn (Plagiarism) là gì?",
        content:
          "Đạo văn là hành vi sử dụng ý tưởng, từ ngữ, dữ liệu, hoặc sản phẩm trí tuệ của người khác mà không ghi nguồn, khiến người đọc hiểu nhầm đó là sản phẩm của bạn.\n\nĐạo văn không chỉ là copy-paste. Nó bao gồm cả việc paraphrase không đúng cách, tự đạo văn (nộp lại bài cũ), và nhờ người khác viết hộ.",
      },
      {
        heading: "Các hình thức đạo văn phổ biến",
        content:
          "• **Direct Plagiarism** — Copy nguyên văn mà không trích nguồn\n• **Self-Plagiarism** — Nộp lại bài cũ của mình cho môn khác\n• **Mosaic Plagiarism** — Ghép nhiều đoạn từ nhiều nguồn mà không trích dẫn\n• **Collusion** — Hai người cùng nộp bài giống nhau (bài cá nhân)\n• **Contract Cheating** — Nhờ/mua bài viết từ người khác",
      },
      {
        heading: "Cách phòng tránh",
        content:
          "1. Luôn ghi nguồn khi sử dụng ý tưởng/dữ liệu của người khác\n2. Sử dụng công cụ kiểm tra đạo văn trước khi nộp\n3. Hiểu rõ quy định liêm chính của trường\n4. Quản lý thời gian tốt — deadline gấp dễ dẫn đến đạo văn\n5. Khi không chắc, hãy hỏi giảng viên!",
      },
    ],
  },
  {
    id: "citation",
    icon: <GoPencil className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-600",
    title: "Hướng dẫn trích dẫn APA 7th Edition",
    duration: "7 phút đọc",
    sections: [
      {
        heading: "Tại sao phải trích dẫn?",
        content:
          "Trích dẫn giúp:\n• Tôn trọng quyền sở hữu trí tuệ\n• Tăng độ tin cậy cho bài viết\n• Người đọc có thể tìm lại nguồn gốc\n• Tránh bị cáo buộc đạo văn",
      },
      {
        heading: "Trích dẫn trong bài (In-text Citation)",
        content:
          '**Trích dẫn trực tiếp (Direct quote):**\nĐặt trong ngoặc kép + ghi (Họ tác giả, năm, tr. số trang)\n→ "Học thuật đòi hỏi sự liêm chính" (Nguyễn, 2024, tr. 15)\n\n**Trích dẫn gián tiếp (Paraphrase):**\nViết lại bằng lời mình + ghi (Họ tác giả, năm)\n→ Theo Nguyễn (2024), liêm chính là yếu tố cốt lõi.\n\n**2 tác giả:** (Nguyễn & Trần, 2024)\n**3+ tác giả:** (Nguyễn et al., 2024)',
      },
      {
        heading: "Danh mục tài liệu tham khảo (References)",
        content:
          "Sắp xếp theo ABC họ tác giả.\n\n**Sách:**\nNguyễn, V. A. (2024). *Tên sách*. Nhà xuất bản.\n\n**Bài báo:**\nTrần, T. B. (2023). Tên bài. *Tên Tạp Chí*, 5(2), 10–25.\n\n**Trang web:**\nLê, H. C. (2024, 15 tháng 3). Tên bài viết. *Tên Website*. https://example.com",
      },
    ],
  },
  {
    id: "harvard",
    icon: <GoMortarBoard className="w-6 h-6" />,
    color: "bg-indigo-100 text-indigo-600",
    title: "Hướng dẫn trích dẫn Harvard",
    duration: "6 phút đọc",
    sections: [
      {
        heading: "Harvard Referencing là gì?",
        content:
          "Harvard là hệ thống trích dẫn **tác giả-năm** (author-date) được sử dụng rộng rãi trong các ngành khoa học xã hội, kinh doanh và nhân văn.\n\nĐặc điểm chính:\n• Trích dẫn trong bài ghi **(Họ tác giả, năm)** — tương tự APA\n• Danh mục tài liệu tham khảo (**Reference List**) đặt ở cuối bài\n• Không dùng footnote như Chicago\n• Đơn giản, dễ áp dụng cho sinh viên",
      },
      {
        heading: "Trích dẫn trong bài (In-text Citation)",
        content:
          '"Liêm chính học thuật là nền tảng của giáo dục" (Nguyễn, 2024, tr. 12).\n\n**Trích dẫn gián tiếp (Paraphrase):**\n→ Theo Nguyễn (2024), liêm chính là yếu tố không thể thiếu.\n→ Liêm chính được xem là yếu tố cốt lõi (Nguyễn, 2024).\n\n**2 tác giả:** (Nguyễn & Trần, 2024)\n**3+ tác giả:** (Nguyễn et al., 2024)\n**Nhiều nguồn:** (Lê, 2022; Nguyễn, 2024; Trần, 2023) — sắp xếp ABC',
      },
      {
        heading: "Danh mục tài liệu tham khảo (Reference List)",
        content:
          "Sắp xếp theo **ABC họ tác giả**. Dùng thụt lề treo (hanging indent).\n\n**Sách:**\nNguyễn, V.A. (2024) *Tên sách*. Nơi xuất bản: Nhà xuất bản.\n\n**Bài báo khoa học:**\nTrần, T.B. (2023) 'Tên bài báo', *Tên Tạp Chí*, 5(2), tr. 10–25.\n\n**Trang web:**\nLê, H.C. (2024) *Tên bài viết*. Available at: https://example.com (Accessed: 15 tháng 3 2024).\n\n**Báo cáo / Tài liệu tổ chức:**\nBộ Giáo dục (2023) *Quy định liêm chính học thuật*. Hà Nội: NXB Giáo dục.",
      },
      {
        heading: "So sánh Harvard vs APA",
        content:
          '**Giống nhau:**\n• Đều dùng hệ thống tác giả-năm\n• In-text citation gần giống: (Họ, năm)\n• Reference List sắp xếp theo ABC\n\n**Khác nhau chính:**\n• APA dùng dấu **phẩy** sau họ tác giả → (Nguyễn, 2024). Harvard có thể bỏ dấu phẩy → (Nguyễn 2024)\n• APA: Tên bài viết trong sách/tạp chí viết thường. Harvard: Tên bài viết đặt trong dấu nháy đơn\n• APA: Ghi "https://doi.org/...". Harvard: Ghi "Available at: URL (Accessed: ngày)"\n\n💡 **Mẹo:** Luôn kiểm tra hướng dẫn của giảng viên vì mỗi trường có thể có biến thể Harvard riêng!',
      },
    ],
  },
  {
    id: "paraphrase",
    icon: <GoBook className="w-6 h-6" />,
    color: "bg-green-100 text-green-600",
    title: "Kỹ thuật Paraphrase đúng cách",
    duration: "5 phút đọc",
    sections: [
      {
        heading: "Paraphrase là gì?",
        content:
          "Paraphrase là viết lại nội dung từ một nguồn bằng ngôn ngữ và cấu trúc câu hoàn toàn của bạn, nhưng vẫn giữ nguyên ý nghĩa gốc. Paraphrase KHÔNG phải là thay vài từ đồng nghĩa!",
      },
      {
        heading: "Quy trình 4 bước",
        content:
          "1. **Đọc và hiểu** — Đọc kỹ đoạn gốc, hiểu ý chính\n2. **Gấp tài liệu** — Đặt tài liệu sang một bên\n3. **Viết lại** — Viết bằng lời của bạn, cấu trúc câu mới\n4. **So sánh** — Đối chiếu với bản gốc, đảm bảo đủ khác biệt",
      },
      {
        heading: "Ví dụ so sánh",
        content:
          '**Gốc:** "Sinh viên cần phát triển kỹ năng tư duy phản biện."\n\n❌ **Sai:** "Sinh viên cần nâng cao kỹ năng tư duy phản biện." (chỉ đổi 1 từ)\n\n✅ **Đúng:** "Việc rèn luyện khả năng phân tích và đánh giá vấn đề là điều cần thiết đối với người học đại học." (Nguyễn, 2024)\n\n⚠️ Luôn nhớ ghi nguồn sau khi paraphrase!',
      },
    ],
  },
  {
    id: "ai-usage",
    icon: <GoLightBulb className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-600",
    title: "Sử dụng AI có trách nhiệm trong học thuật",
    duration: "6 phút đọc",
    sections: [
      {
        heading: "AI trong học thuật — Được và Không được",
        content:
          "✅ **Được phép (thường):**\n• Gợi ý ý tưởng, brainstorm\n• Kiểm tra ngữ pháp, chính tả\n• Giải thích khái niệm phức tạp\n• Tạo dàn ý tham khảo\n\n❌ **Không được phép:**\n• Cho AI viết toàn bộ bài rồi nộp\n• Copy câu trả lời AI mà không ghi chú\n• Dùng AI khi giảng viên cấm",
      },
      {
        heading: "Nguyên tắc minh bạch",
        content:
          "Khi sử dụng AI hỗ trợ:\n1. **Kiểm tra quy định** của giảng viên / môn học\n2. **Ghi chú rõ ràng** phần nào có sử dụng AI\n3. **Tự viết nội dung chính** — AI chỉ là công cụ hỗ trợ\n4. **Kiểm chứng thông tin** — AI có thể sai\n5. Nếu không chắc, **hỏi giảng viên trước**",
      },
      {
        heading: "Cách trích dẫn AI (APA 7th Edition)",
        content:
          'Nếu được phép dùng AI và bạn muốn trích dẫn:\n\n**In-text:** (OpenAI, 2024)\n\n**References:**\nOpenAI. (2024). ChatGPT (phiên bản GPT-4) [Language model]. https://chat.openai.com\n\n💡 Thêm ghi chú trong bài: "Tác giả đã sử dụng ChatGPT để hỗ trợ kiểm tra ngữ pháp."',
      },
    ],
  },
  {
    id: "fpt-rules",
    icon: <GoMortarBoard className="w-6 h-6" />,
    color: "bg-amber-100 text-amber-600",
    title: "Quy định liêm chính tại FPT University",
    duration: "4 phút đọc",
    sections: [
      {
        heading: "Quy định chung",
        content:
          "Mọi sinh viên FPT đều phải cam kết liêm chính học thuật. Điều này áp dụng cho TẤT CẢ hình thức bài nộp: bài tập cá nhân, bài nhóm, bài thi, đồ án, luận văn.",
      },
      {
        heading: "Hình phạt khi vi phạm",
        content:
          "Tùy mức độ nghiêm trọng:\n• **Lần đầu nhẹ:** Cảnh cáo + điểm 0 bài tập\n• **Vi phạm nặng:** Đình chỉ thi / học kỳ\n• **Vi phạm nghiêm trọng:** Buộc thôi học\n\nFPT sử dụng **Turnitin** để kiểm tra đạo văn tự động.",
      },
      {
        heading: "Lời khuyên",
        content:
          "• Quản lý thời gian — bắt đầu bài sớm\n• Sử dụng công cụ trích dẫn (Citation Generator trên web này!)\n• Kiểm tra bài bằng Plagiarism Checker trước khi nộp\n• Khi gặp khó khăn, liên hệ giảng viên thay vì gian lận",
      },
    ],
  },
];

const Support = () => {
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [completedSections, setCompletedSections] = useState({});

  const toggleCourse = (id) => {
    setExpandedCourse(expandedCourse === id ? null : id);
  };

  const markComplete = (courseId, sectionIdx) => {
    const key = `${courseId}-${sectionIdx}`;
    setCompletedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getCourseProgress = (course) => {
    const total = course.sections.length;
    const done = course.sections.filter(
      (_, i) => completedSections[`${course.id}-${i}`],
    ).length;
    return { done, total, pct: Math.round((done / total) * 100) };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <GoTools className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-(family-name:--font-heading) text-primary-950 mb-3">
          Khóa học ngắn
        </h1>
        <p className="text-surface-600 text-lg max-w-xl mx-auto">
          6 bài học nhanh giúp bạn nắm vững kiến thức liêm chính học thuật.
        </p>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {COURSES.map((course) => {
          const isOpen = expandedCourse === course.id;
          const progress = getCourseProgress(course);

          return (
            <div
              key={course.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen
                  ? "border-primary-300 shadow-lg"
                  : "border-surface-200 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Course Header */}
              <button
                onClick={() => toggleCourse(course.id)}
                className="w-full flex items-center gap-4 p-5 cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${course.color}`}
                >
                  {course.icon}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-primary-950 text-[15px] leading-snug">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-surface-400">
                      {course.duration}
                    </span>
                    {progress.done > 0 && (
                      <span className="text-xs text-primary-600 font-medium">
                        {progress.done}/{progress.total} hoàn thành
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress ring + chevron */}
                <div className="flex items-center gap-3 shrink-0">
                  {progress.pct === 100 && (
                    <GoCheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {isOpen ? (
                    <GoChevronUp className="w-5 h-5 text-surface-400" />
                  ) : (
                    <GoChevronDown className="w-5 h-5 text-surface-400" />
                  )}
                </div>
              </button>

              {/* Progress bar */}
              {progress.done > 0 && !isOpen && (
                <div className="px-5 pb-3">
                  <div className="h-1 bg-surface-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress.pct}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Sections */}
              {isOpen && (
                <div className="border-t border-surface-100 px-5 pb-5">
                  {course.sections.map((section, i) => {
                    const isDone = completedSections[`${course.id}-${i}`];
                    return (
                      <div key={i} className="mt-5">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => markComplete(course.id, i)}
                            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                              isDone
                                ? "bg-green-500 border-green-500"
                                : "border-surface-300 hover:border-primary-400"
                            }`}
                          >
                            {isDone && (
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                          <h4
                            className={`font-semibold text-sm ${isDone ? "text-surface-400 line-through" : "text-primary-950"}`}
                          >
                            {section.heading}
                          </h4>
                        </div>
                        <div className="ml-8 mt-2 text-sm text-surface-600 leading-relaxed whitespace-pre-line">
                          {section.content.split("**").map((part, j) =>
                            j % 2 === 1 ? (
                              <strong key={j} className="text-surface-800">
                                {part}
                              </strong>
                            ) : (
                              <span key={j}>{part}</span>
                            ),
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA — Fanpage support */}
      <div className="mt-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 text-center text-white">
        <h3 className="text-xl font-bold mb-2">Cần hỗ trợ thêm?</h3>
        <p className="text-primary-100 text-sm mb-4">
          Liên hệ với đội ngũ hỗ trợ qua Fanpage để được giải đáp 1 kèm 1.
        </p>
        <a
          href="https://www.facebook.com/profile.php?id=61583706310530"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
        >
          <GoLinkExternal className="w-4 h-4" />
          Mở Fanpage
        </a>
      </div>
    </div>
  );
};

export default Support;
