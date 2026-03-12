import React, { useState } from "react";
import {
  GoShieldCheck,
  GoAlert,
  GoCheckCircle,
  GoXCircle,
  GoSync,
  GoUpload,
  GoTrash,
  GoInfo,
  GoLightBulb,
} from "react-icons/go";
import { analyzePlagiarism } from "../services/groqService";
import { useAuth } from "../contexts/AuthContext";

const PlagiarismChecker = () => {
  const { logActivity } = useAuth();
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const handleAnalyze = async () => {
    if (wordCount < 20) {
      setError("Vui lòng nhập ít nhất 20 từ để phân tích chính xác.");
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzePlagiarism(text);
      setResult(data);
      logActivity("plagiarism_check", `Analyzed ${wordCount} words`);
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi khi phân tích.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setResult(null);
    setError(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setText(ev.target.result);
        setResult(null);
        setError(null);
      };
      reader.readAsText(file);
    } else {
      setError(
        "Chỉ hỗ trợ tệp .txt. Vui lòng copy-paste nội dung từ file .docx.",
      );
    }
    e.target.value = "";
  };

  const getScoreColor = (score, inverted = false) => {
    const s = inverted ? 100 - score : score;
    if (s >= 70)
      return {
        ring: "#22c55e",
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
      };
    if (s >= 40)
      return {
        ring: "#f59e0b",
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
      };
    return {
      ring: "#ef4444",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
    };
  };

  const getRiskBadge = (risk) => {
    const map = {
      low: {
        label: "Rủi ro thấp",
        cls: "bg-green-100 text-green-700 border-green-200",
      },
      medium: {
        label: "Rủi ro trung bình",
        cls: "bg-amber-100 text-amber-700 border-amber-200",
      },
      high: {
        label: "Rủi ro cao",
        cls: "bg-red-100 text-red-700 border-red-200",
      },
    };
    return map[risk] || map.medium;
  };

  const getSeverityIcon = (severity) => {
    if (severity === "high")
      return <GoXCircle className="w-5 h-5 text-red-500 shrink-0" />;
    if (severity === "medium")
      return <GoAlert className="w-5 h-5 text-amber-500 shrink-0" />;
    return <GoCheckCircle className="w-5 h-5 text-green-500 shrink-0" />;
  };

  const ScoreCircle = ({ score, label, inverted = false }) => {
    const displayScore = inverted ? 100 - score : score;
    const color = getScoreColor(score, inverted);
    const circumference = 2 * Math.PI * 40;
    const dashOffset = circumference - (displayScore / 100) * circumference;

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-24 h-24">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke={color.ring}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-primary-950">
              {displayScore}%
            </span>
          </div>
        </div>
        <span className="text-sm font-semibold text-surface-600 text-center">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-4">
          <GoShieldCheck className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-semibold text-primary-800">
            Công cụ kiểm tra
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-950 font-(family-name:--font-heading) mb-3">
          Kiểm tra đạo văn & AI
        </h1>
        <p className="text-surface-600 text-lg max-w-2xl mx-auto">
          Phân tích văn bản của bạn để phát hiện dấu hiệu đạo văn, nội dung do
          AI tạo, và đánh giá chất lượng trích dẫn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Input Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3 bg-surface-50 border-b border-surface-200">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-primary-950">
                  Nhập văn bản
                </span>
                <span className="text-xs text-surface-500 bg-surface-100 px-2.5 py-1 rounded-full">
                  {wordCount} từ · {charCount} ký tự
                </span>
              </div>
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-surface-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg cursor-pointer transition-colors">
                  <GoUpload className="w-4 h-4" />
                  <span className="hidden sm:inline">Tải file .txt</span>
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {text && (
                  <button
                    onClick={handleClear}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <GoTrash className="w-4 h-4" />
                    <span className="hidden sm:inline">Xóa</span>
                  </button>
                )}
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Dán văn bản bài viết của bạn vào đây để kiểm tra...&#10;&#10;Lưu ý: Cần ít nhất 20 từ để phân tích chính xác."
              className="w-full h-72 lg:h-96 px-5 py-4 text-[15px] text-surface-800 placeholder-surface-400 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <GoXCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || wordCount < 20}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary-950 text-white font-bold text-lg rounded-2xl hover:bg-primary-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary-900/15"
          >
            {loading ? (
              <>
                <GoSync className="w-5 h-5 animate-spin" />
                Đang phân tích...
              </>
            ) : (
              <>
                <GoShieldCheck className="w-5 h-5" />
                Phân tích văn bản
              </>
            )}
          </button>
        </div>

        {/* Right: Info Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-primary-950 flex items-center gap-2">
              <GoInfo className="w-5 h-5 text-primary-600" />
              Công cụ phân tích gì?
            </h3>
            <div className="space-y-3 text-sm text-surface-600">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-50">
                <span className="text-lg">🔍</span>
                <div>
                  <p className="font-semibold text-surface-800">
                    Phát hiện đạo văn
                  </p>
                  <p>
                    Nhận diện dấu hiệu copy-paste và nội dung không nhất quán
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-50">
                <span className="text-lg">🤖</span>
                <div>
                  <p className="font-semibold text-surface-800">Phát hiện AI</p>
                  <p>
                    Đánh giá khả năng nội dung được tạo bởi ChatGPT, Gemini...
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-50">
                <span className="text-lg">📝</span>
                <div>
                  <p className="font-semibold text-surface-800">
                    Chất lượng trích dẫn
                  </p>
                  <p>Kiểm tra xem bạn đã trích dẫn nguồn đúng cách chưa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6">
            <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-2">
              <GoAlert className="w-5 h-5" />
              Lưu ý quan trọng
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              Kết quả phân tích chỉ mang tính <strong>tham khảo</strong> và dựa
              trên AI. Không thể thay thế hoàn toàn cho phần mềm kiểm tra đạo
              văn chuyên nghiệp như Turnitin.
            </p>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-10 space-y-6 animate-fade-in-up">
          {/* Score Cards */}
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-surface-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary-950 font-(family-name:--font-heading)">
                Kết quả phân tích
              </h2>
              {(() => {
                const badge = getRiskBadge(result.overallRisk);
                return (
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${badge.cls}`}
                  >
                    {badge.label}
                  </span>
                );
              })()}
            </div>

            <div className="p-6 md:p-8">
              {/* Score Circles */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <ScoreCircle
                  score={result.plagiarismScore}
                  label="Nguyên bản"
                  inverted={true}
                />
                <ScoreCircle
                  score={result.aiScore}
                  label="Do người viết"
                  inverted={true}
                />
                <ScoreCircle
                  score={result.citationScore}
                  label="Trích dẫn"
                  inverted={false}
                />
              </div>

              {/* Summary */}
              <div className="p-5 rounded-2xl bg-primary-50 border border-primary-100 mb-6">
                <p className="text-primary-900 font-medium leading-relaxed">
                  {result.summary}
                </p>
              </div>

              {/* Details */}
              {result.details && result.details.length > 0 && (
                <div className="space-y-3 mb-6">
                  <h3 className="font-bold text-primary-950 text-sm uppercase tracking-wider">
                    Chi tiết phân tích
                  </h3>
                  {result.details.map((detail, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-xl border ${
                        detail.severity === "high"
                          ? "bg-red-50 border-red-200"
                          : detail.severity === "medium"
                            ? "bg-amber-50 border-amber-200"
                            : "bg-green-50 border-green-200"
                      }`}
                    >
                      {getSeverityIcon(detail.severity)}
                      <p className="text-sm text-surface-800 leading-relaxed">
                        {detail.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-bold text-primary-950 text-sm uppercase tracking-wider flex items-center gap-2">
                    <GoLightBulb className="w-4 h-4 text-accent-500" />
                    Gợi ý cải thiện
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {result.suggestions.map((suggestion, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-surface-50 border border-surface-200"
                      >
                        <span className="text-accent-500 font-bold text-sm shrink-0">
                          {i + 1}.
                        </span>
                        <p className="text-sm text-surface-700">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlagiarismChecker;
