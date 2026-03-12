import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GoArrowRight,
  GoArrowLeft,
  GoCheckCircle,
  GoRocket,
  GoPerson,
} from "react-icons/go";
import { submitSurvey } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";

const surveyQuestions = [
  {
    id: 1,
    question: "Bạn hiểu thế nào về 'đạo văn' (plagiarism)?",
    options: [
      "Sao chép toàn bộ bài viết của người khác",
      "Dùng ý tưởng của người khác mà không trích nguồn",
      "Cả hai đáp án trên đều đúng",
      "Không có đáp án nào đúng",
    ],
  },
  {
    id: 2,
    question: "Theo bạn, khi nào cần trích dẫn nguồn tài liệu trong bài viết?",
    options: [
      "Chỉ khi copy nguyên văn",
      "Khi sử dụng ý tưởng, dữ liệu, hoặc từ ngữ của người khác",
      "Không cần thiết nếu đã paraphrase",
      "Chỉ khi giảng viên yêu cầu",
    ],
  },
  {
    id: 3,
    question: "Bạn đã từng nghe về chuẩn trích dẫn APA hoặc Harvard chưa?",
    options: [
      "Chưa bao giờ nghe",
      "Có nghe nhưng không biết cách dùng",
      "Biết cơ bản và đã dùng thử",
      "Sử dụng thành thạo",
    ],
  },
  {
    id: 4,
    question: "Bạn nghĩ việc dùng AI (ChatGPT/Gemini) để làm bài tập là?",
    options: [
      "Hoàn toàn bình thường, không có vấn đề gì",
      "Được phép nếu chỉ dùng để tham khảo ý tưởng",
      "Không được phép trong mọi trường hợp",
      "Tùy thuộc vào quy định của từng môn học",
    ],
  },
  {
    id: 5,
    question: "Paraphrase (viết lại câu) đúng cách nghĩa là gì?",
    options: [
      "Đổi vài từ đồng nghĩa trong câu gốc",
      "Hiểu nội dung rồi diễn đạt lại hoàn toàn bằng lời của mình + trích nguồn",
      "Dùng AI để viết lại",
      "Dịch từ ngôn ngữ khác sang tiếng Việt",
    ],
  },
  {
    id: 6,
    question:
      "Nếu bạn nộp bài bị phát hiện đạo văn tại FPT University, hậu quả có thể là gì?",
    options: [
      "Không có hậu quả gì nghiêm trọng",
      "Bị trừ điểm bài tập đó",
      "Có thể bị cấm thi hoặc đình chỉ học tập",
      "Không biết / Chưa tìm hiểu",
    ],
  },
  {
    id: 7,
    question:
      "Bạn có biết FPT University sử dụng phần mềm nào để kiểm tra đạo văn không?",
    options: [
      "Turnitin",
      "Grammarly",
      "Không biết",
      "FPT không kiểm tra đạo văn",
    ],
  },
  {
    id: 8,
    question:
      "Bạn đánh giá mức độ tự tin của mình về kiến thức liêm chính học thuật?",
    options: [
      "Rất tự tin — Hiểu rõ và thực hành tốt",
      "Khá tự tin — Biết cơ bản nhưng cần học thêm",
      "Không tự tin — Chưa biết nhiều",
      "Hoàn toàn không biết gì",
    ],
  },
];

const Survey = () => {
  const { logActivity } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState("info"); // 'info' | 'survey' | 'done'
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({
    studentId: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInfoChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const startSurvey = () => {
    if (!userInfo.studentId || !userInfo.name || !userInfo.email) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setError("");
    setStep("survey");
  };

  const selectAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [surveyQuestions[currentQ].id]: answer,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...userInfo,
        answers: surveyQuestions.map((q) => ({
          questionId: q.id,
          answer: answers[q.id] || "",
        })),
      };
      await submitSurvey(payload);
      setStep("done");
      logActivity("survey_complete", "Completed academic integrity survey"); // Call logActivity here
    } catch {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const progress = Object.keys(answers).length / surveyQuestions.length;

  // Step: Student info form
  if (step === "info") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GoPerson className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-(family-name:--font-heading) text-primary-950 mb-3">
            Khảo sát nhận thức
          </h1>
          <p className="text-surface-600 text-lg">
            Giúp chúng tôi hiểu rõ hơn về nhận thức của bạn về liêm chính học
            thuật.
          </p>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-primary-950 mb-6">
            Thông tin sinh viên
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Mã sinh viên (MSSV)
              </label>
              <input
                type="text"
                placeholder="VD: SE123456"
                value={userInfo.studentId}
                onChange={(e) => handleInfoChange("studentId", e.target.value)}
                className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                value={userInfo.name}
                onChange={(e) => handleInfoChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Email FPT
              </label>
              <input
                type="email"
                placeholder="tenban@fpt.edu.vn"
                value={userInfo.email}
                onChange={(e) => handleInfoChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            onClick={startSurvey}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
          >
            Bắt đầu khảo sát
            <GoArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Step: Done
  if (step === "done") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <GoCheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold font-(family-name:--font-heading) text-primary-950 mb-4">
          Cảm ơn bạn!
        </h1>
        <p className="text-surface-600 text-lg mb-8 max-w-md mx-auto">
          Bạn đã hoàn thành khảo sát. Hãy thử sức với Mini Game để kiểm tra kiến
          thức nhé!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/mini-game"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-400 transition-colors"
          >
            <GoRocket className="w-5 h-5" />
            Chơi Mini Game
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-100 text-surface-700 font-semibold rounded-xl hover:bg-surface-200 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Step: Survey questions
  const q = surveyQuestions[currentQ];
  const isLast = currentQ === surveyQuestions.length - 1;
  const currentAnswer = answers[q.id];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-surface-500 mb-2">
          <span>
            Câu {currentQ + 1} / {surveyQuestions.length}
          </span>
          <span>{Math.round(progress * 100)}% hoàn thành</span>
        </div>
        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white border border-surface-200 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl md:text-2xl font-bold text-primary-950 mb-6">
          {q.question}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectAnswer(opt)}
              className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all duration-200 cursor-pointer ${
                currentAnswer === opt
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-surface-200 hover:border-primary-200 hover:bg-surface-50 text-surface-700"
              }`}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-100 text-surface-500 text-sm font-bold mr-3">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
            disabled={currentQ === 0}
            className="flex items-center gap-2 px-4 py-2.5 text-surface-600 hover:text-primary-600 font-medium disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <GoArrowLeft className="w-4 h-4" />
            Trước
          </button>

          {isLast ? (
            <button
              onClick={() => {
                if (!currentAnswer) {
                  setError("Vui lòng chọn một đáp án.");
                  return;
                }
                setError("");
                handleSubmit();
              }}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {loading ? "Đang gửi..." : "Nộp khảo sát"}
              <GoCheckCircle className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                if (!currentAnswer) {
                  setError("Vui lòng chọn một đáp án.");
                  return;
                }
                setError("");
                setCurrentQ((p) => p + 1);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Tiếp theo
              <GoArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Survey;
