import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  GoCheckCircle,
  GoXCircle,
  GoTrophy,
  GoSync,
  GoRocket,
  GoStopwatch,
  GoZap,
} from "react-icons/go";
import { submitGameResult } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";

const gameStatements = [
  {
    id: 1,
    text: "Copy nguyên một đoạn văn từ Wikipedia và dán vào bài tập mà không trích nguồn là đạo văn.",
    answer: true,
  },
  {
    id: 2,
    text: "Nếu bạn paraphrase (viết lại) một đoạn văn thì không cần trích nguồn.",
    answer: false,
  },
  {
    id: 3,
    text: "Sử dụng ChatGPT để viết toàn bộ bài essay rồi nộp dưới tên mình là vi phạm liêm chính học thuật.",
    answer: true,
  },
  {
    id: 4,
    text: "Trích dẫn APA yêu cầu ghi tên tác giả và năm xuất bản.",
    answer: true,
  },
  {
    id: 5,
    text: "Bạn có thể dùng AI để kiểm tra ngữ pháp và chính tả mà không vi phạm đạo đức học thuật.",
    answer: true,
  },
  {
    id: 6,
    text: "Self-plagiarism (tự đạo văn) là khi bạn nộp lại bài cũ của chính mình cho môn học khác mà không xin phép.",
    answer: true,
  },
  {
    id: 7,
    text: "Nếu thông tin là 'kiến thức phổ biến' (common knowledge), bạn không cần trích nguồn.",
    answer: true,
  },
  {
    id: 8,
    text: "Chỉ cần ghi link URL ở cuối bài là đã trích dẫn đúng chuẩn.",
    answer: false,
  },
  {
    id: 9,
    text: "FPT University sử dụng phần mềm Turnitin để kiểm tra đạo văn.",
    answer: true,
  },
  {
    id: 10,
    text: "Dùng AI để gợi ý dàn ý (outline) cho bài viết là hoàn toàn được phép.",
    answer: true,
  },
];

const MiniGame = () => {
  const { logActivity } = useAuth();
  const [step, setStep] = useState("info"); // 'info' | 'playing' | 'result'
  const [userInfo, setUserInfo] = useState({ studentId: "", name: "" });
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (step === "playing") {
      timerRef.current = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const startGame = () => {
    if (!userInfo.studentId || !userInfo.name) {
      setError("Vui lòng nhập MSSV và họ tên.");
      return;
    }
    setError("");
    setStep("playing");
    setTimer(0);
  };

  const handleAnswer = (userAnswer) => {
    const q = gameStatements[currentQ];
    const isCorrect = userAnswer === q.answer;

    setAnswers((prev) => [...prev, { id: q.id, correct: isCorrect }]);
    if (isCorrect) setScore((s) => s + 1);

    setFeedback(isCorrect ? "correct" : "wrong");

    setTimeout(() => {
      setFeedback(null);
      if (currentQ < gameStatements.length - 1) {
        setCurrentQ((p) => p + 1);
      } else {
        clearInterval(timerRef.current);
        submitResult(isCorrect ? score + 1 : score);
      }
    }, 800);
  };

  const submitResult = async (finalScore) => {
    setLoading(true);
    try {
      await submitGameResult({
        studentId: userInfo.studentId,
        name: userInfo.name,
        score: finalScore,
        totalQuestions: gameStatements.length,
        timeTaken: timer,
      });
    } catch {
      // still show results even on error
    } finally {
      setLoading(false);
      setStep("result");
      logActivity(
        "game_complete",
        `Score: ${finalScore}/${gameStatements.length}`,
      );
    }
  };

  const getLevel = () => {
    const pct = (score / gameStatements.length) * 100;
    if (pct >= 90)
      return {
        label: "Xuất sắc! 🏆",
        color: "text-yellow-500",
        bg: "bg-yellow-50",
      };
    if (pct >= 70)
      return {
        label: "Giỏi! 🎉",
        color: "text-green-600",
        bg: "bg-green-50",
      };
    if (pct >= 50)
      return {
        label: "Khá tốt 👍",
        color: "text-blue-600",
        bg: "bg-blue-50",
      };
    return {
      label: "Cần cải thiện 📚",
      color: "text-orange-600",
      bg: "bg-orange-50",
    };
  };

  const restart = () => {
    setStep("info");
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setFeedback(null);
    setTimer(0);
  };

  // Step: Info
  if (step === "info") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GoZap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-(family-name:--font-heading) text-primary-950 mb-3">
            Mini Game: Đúng hay Sai?
          </h1>
          <p className="text-surface-600 text-lg">
            10 câu hỏi nhanh về liêm chính học thuật. Bạn sẵn sàng chưa?
          </p>
        </div>

        <div className="bg-white border border-surface-200 rounded-2xl p-8 shadow-sm">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Mã sinh viên (MSSV)
              </label>
              <input
                type="text"
                placeholder="VD: SE123456"
                value={userInfo.studentId}
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, studentId: e.target.value }))
                }
                className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
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
                onChange={(e) =>
                  setUserInfo((p) => ({ ...p, name: e.target.value }))
                }
                className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="mb-4 text-red-500 text-sm font-medium">{error}</p>
          )}

          {/* Rules */}
          <div className="bg-surface-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-surface-900 mb-2">Luật chơi:</h3>
            <ul className="text-sm text-surface-600 space-y-1">
              <li>
                ⚡ 10 câu hỏi dạng <strong>Đúng / Sai</strong>
              </li>
              <li>⏱️ Đồng hồ đếm thời gian — càng nhanh càng tốt!</li>
              <li>🎯 Đạt 7/10 trở lên để nhận đánh giá "Giỏi"</li>
            </ul>
          </div>

          <button
            onClick={startGame}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-400 transition-colors cursor-pointer"
          >
            <GoRocket className="w-5 h-5" />
            Bắt đầu chơi!
          </button>
        </div>
      </div>
    );
  }

  // Step: Result
  if (step === "result") {
    const level = getLevel();
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div
          className={`w-24 h-24 ${level.bg} rounded-full flex items-center justify-center mx-auto mb-6`}
        >
          <GoTrophy className={`w-12 h-12 ${level.color}`} />
        </div>
        <h1 className="text-3xl font-bold font-(family-name:--font-heading) text-primary-950 mb-2">
          {level.label}
        </h1>
        <p className="text-surface-600 text-lg mb-2">
          Bạn trả lời đúng{" "}
          <span className="font-bold text-primary-600">
            {score}/{gameStatements.length}
          </span>{" "}
          câu
        </p>
        <p className="text-surface-500 mb-8">
          <GoStopwatch className="inline w-4 h-4 mr-1" />
          Thời gian: {formatTime(timer)}
        </p>

        {/* Review answers */}
        <div className="bg-white border border-surface-200 rounded-2xl p-6 text-left mb-8 max-h-[400px] overflow-y-auto">
          <h3 className="font-semibold text-surface-900 mb-4">
            Đáp án chi tiết:
          </h3>
          <div className="space-y-3">
            {gameStatements.map((q, i) => {
              const a = answers[i];
              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-xl border ${a?.correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <div className="flex items-start gap-2">
                    {a?.correct ? (
                      <GoCheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    ) : (
                      <GoXCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-surface-800">
                        {q.text}
                      </p>
                      <p className="text-xs text-surface-500 mt-1">
                        Đáp án: {q.answer ? "✅ Đúng" : "❌ Sai"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={restart}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-100 text-surface-700 font-semibold rounded-xl hover:bg-surface-200 transition-colors cursor-pointer"
          >
            <GoSync className="w-5 h-5" />
            Chơi lại
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Về trang chủ
            <GoRocket className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  // Step: Playing
  const q = gameStatements[currentQ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Header: progress + timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-surface-500 text-sm font-medium">
          <GoStopwatch className="w-4 h-4" />
          {formatTime(timer)}
        </div>
        <div className="text-sm text-surface-500 font-semibold">
          {currentQ + 1} / {gameStatements.length}
        </div>
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary-600">
          <GoTrophy className="w-4 h-4" />
          {score}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-surface-100 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-accent-500 rounded-full transition-all duration-500"
          style={{
            width: `${((currentQ + 1) / gameStatements.length) * 100}%`,
          }}
        />
      </div>

      {/* Question card */}
      <div
        className={`bg-white border-2 rounded-2xl p-8 shadow-sm transition-all duration-300 ${
          feedback === "correct"
            ? "border-green-400 bg-green-50"
            : feedback === "wrong"
              ? "border-red-400 bg-red-50"
              : "border-surface-200"
        }`}
      >
        <p className="text-lg md:text-xl font-semibold text-primary-950 mb-8 leading-relaxed">
          {q.text}
        </p>

        {feedback ? (
          <div className="flex items-center justify-center py-4">
            {feedback === "correct" ? (
              <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
                <GoCheckCircle className="w-8 h-8" />
                Đúng rồi!
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 font-bold text-xl">
                <GoXCircle className="w-8 h-8" />
                Sai rồi!
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-green-50 border-2 border-green-200 text-green-700 font-bold text-lg rounded-xl hover:bg-green-100 hover:border-green-300 transition-all cursor-pointer active:scale-95"
            >
              <GoCheckCircle className="w-6 h-6" />
              Đúng
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-red-50 border-2 border-red-200 text-red-700 font-bold text-lg rounded-xl hover:bg-red-100 hover:border-red-300 transition-all cursor-pointer active:scale-95"
            >
              <GoXCircle className="w-6 h-6" />
              Sai
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGame;
