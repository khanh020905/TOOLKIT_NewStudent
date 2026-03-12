import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  GoArrowRight,
  GoArrowLeft,
  GoCheckCircle,
  GoXCircle,
  GoTrophy,
  GoSync,
} from "react-icons/go";
import quizData from "../data/quizQuestions.json";
import { useAuth } from "../contexts/AuthContext";

const Quiz = () => {
  const { logActivity } = useAuth();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizDone, setQuizDone] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  // Shuffle and pick 10 questions on mount
  useEffect(() => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const question = shuffledQuestions[currentQ];
  const totalQuestions = shuffledQuestions.length;
  const progress =
    totalQuestions > 0
      ? ((currentQ + (showResult ? 1 : 0)) / totalQuestions) * 100
      : 0;

  const handleSelect = (index) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setShowResult(true);
    setAnswers([
      ...answers,
      { questionId: question.id, selected, correct: question.correctIndex },
    ]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= totalQuestions) {
      setQuizDone(true);
      logActivity("quiz_complete", `Score: ${score}/${totalQuestions}`);
    } else {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setAnswers([]);
    setQuizDone(false);
  };

  const score = answers.filter((a) => a.selected === a.correct).length;

  const getLevel = () => {
    const pct = (score / totalQuestions) * 100;
    if (pct >= 80)
      return {
        label: "Nâng cao",
        color: "text-green-500",
        bg: "bg-green-500/10 border-green-500/20",
        emoji: "🏆",
        desc: "Xuất sắc! Bạn có kiến thức vững vàng về liêm chính học thuật.",
      };
    if (pct >= 50)
      return {
        label: "Trung bình",
        color: "text-accent-500",
        bg: "bg-accent-500/10 border-accent-500/20",
        emoji: "📚",
        desc: "Khá tốt! Bạn nên xem thêm video hướng dẫn để nâng cao kiến thức.",
      };
    return {
      label: "Cơ bản",
      color: "text-red-500",
      bg: "bg-red-500/10 border-red-500/20",
      emoji: "⚡",
      desc: "Bạn cần tìm hiểu thêm về liêm chính học thuật. Hãy xem các khóa học của chúng tôi!",
    };
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Results Screen
  if (quizDone) {
    const level = getLevel();
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl border border-surface-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-primary-950 to-primary-800 p-8 md:p-12 text-center">
            <div className="text-6xl mb-4">{level.emoji}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white font-(family-name:--font-heading) mb-2">
              Kết quả bài đánh giá
            </h1>
            <p className="text-primary-200/80 text-lg">
              Bạn đã hoàn thành bài test!
            </p>
          </div>

          {/* Score */}
          <div className="p-8 md:p-12 space-y-8">
            {/* Score circle */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 120 120"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={
                      score / totalQuestions >= 0.8
                        ? "#22c55e"
                        : score / totalQuestions >= 0.5
                          ? "#ff7a12"
                          : "#ef4444"
                    }
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${(score / totalQuestions) * 314} 314`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-primary-950">
                    {score}/{totalQuestions}
                  </span>
                  <span className="text-sm text-surface-500 font-medium">
                    câu đúng
                  </span>
                </div>
              </div>
            </div>

            {/* Level badge */}
            <div className={`p-6 rounded-2xl border text-center ${level.bg}`}>
              <p
                className={`text-sm font-bold tracking-wide uppercase mb-1 ${level.color}`}
              >
                Trình độ: {level.label}
              </p>
              <p className="text-surface-700 font-medium">{level.desc}</p>
            </div>

            {/* Answer review */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-primary-950 font-(family-name:--font-heading)">
                Chi tiết câu trả lời
              </h3>
              {answers.map((a, i) => {
                const q = shuffledQuestions[i];
                const isCorrect = a.selected === a.correct;
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-4 rounded-xl border ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                  >
                    {isCorrect ? (
                      <GoCheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <GoXCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className="font-semibold text-sm text-surface-800">
                        Câu {i + 1}: {q.question}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-surface-600 mt-1">
                          Đáp án đúng: {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary-950 text-white font-bold rounded-2xl hover:bg-primary-900 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <GoSync className="w-5 h-5" />
                Làm lại bài test
              </button>
              <Link
                to="/learnlab"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-accent-500 text-white font-bold rounded-2xl hover:bg-accent-400 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Xem video hướng dẫn
                <GoArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl border border-surface-200 shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="bg-surface-50 px-8 py-5 border-b border-surface-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-primary-950">
              Câu {currentQ + 1} / {totalQuestions}
            </span>
            <span className="text-xs font-semibold text-surface-500 bg-surface-100 px-3 py-1 rounded-full">
              {question.category}
            </span>
          </div>
          <div className="w-full h-2.5 bg-surface-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-accent-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-primary-950 font-(family-name:--font-heading) mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {question.options.map((option, i) => {
              let classes =
                "w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 font-medium text-[15px] leading-relaxed ";

              if (showResult) {
                if (i === question.correctIndex) {
                  classes += "border-green-500 bg-green-50 text-green-800";
                } else if (i === selected && i !== question.correctIndex) {
                  classes += "border-red-400 bg-red-50 text-red-700";
                } else {
                  classes +=
                    "border-surface-200 bg-surface-50 text-surface-400";
                }
              } else {
                if (i === selected) {
                  classes +=
                    "border-primary-500 bg-primary-50 text-primary-900 shadow-md shadow-primary-500/10";
                } else {
                  classes +=
                    "border-surface-200 bg-white text-surface-700 hover:border-primary-300 hover:bg-primary-50/50 cursor-pointer";
                }
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={classes}
                  disabled={showResult}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
                        showResult
                          ? i === question.correctIndex
                            ? "bg-green-500 text-white"
                            : i === selected
                              ? "bg-red-400 text-white"
                              : "bg-surface-200 text-surface-500"
                          : i === selected
                            ? "bg-primary-500 text-white"
                            : "bg-surface-100 text-surface-600"
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="pt-1">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showResult && (
            <div
              className={`p-5 rounded-2xl border mb-8 ${
                selected === question.correctIndex
                  ? "bg-green-50 border-green-200"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className="flex items-start gap-3">
                {selected === question.correctIndex ? (
                  <GoCheckCircle className="w-6 h-6 text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <GoXCircle className="w-6 h-6 text-amber-500 mt-0.5 shrink-0" />
                )}
                <div>
                  <p
                    className={`font-bold mb-1 ${selected === question.correctIndex ? "text-green-700" : "text-amber-700"}`}
                  >
                    {selected === question.correctIndex
                      ? "Chính xác!"
                      : "Chưa đúng!"}
                  </p>
                  <p className="text-sm text-surface-700 leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                if (currentQ > 0 && !showResult) {
                  setCurrentQ(currentQ - 1);
                  setSelected(answers[currentQ - 1]?.selected ?? null);
                  setShowResult(true);
                }
              }}
              disabled={currentQ === 0 || showResult}
              className="inline-flex items-center gap-2 px-5 py-3 text-surface-500 font-semibold rounded-xl hover:bg-surface-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <GoArrowLeft className="w-4 h-4" />
              Quay lại
            </button>

            {!showResult ? (
              <button
                onClick={handleConfirm}
                disabled={selected === null}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-950 text-white font-bold rounded-xl hover:bg-primary-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                Xác nhận
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="group inline-flex items-center gap-2 px-8 py-3.5 bg-accent-500 text-white font-bold rounded-xl hover:bg-accent-400 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {currentQ + 1 >= totalQuestions
                  ? "Xem kết quả"
                  : "Câu tiếp theo"}
                <GoArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
