import React, { useState, useRef, useEffect } from "react";
import { GoX, GoPaperAirplane } from "react-icons/go";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

/* ── Custom Bot Avatar SVG ───────────────────────────── */
const BotAvatar = ({ size = 40, className = "" }) => (
  <div
    className={`shrink-0 rounded-2xl flex items-center justify-center ${className}`}
    style={{
      width: size,
      height: size,
      background:
        "linear-gradient(135deg, #2545ea 0%, #7c3aed 50%, #f97316 100%)",
    }}
  >
    <svg
      width={size * 0.55}
      height={size * 0.55}
      viewBox="0 0 24 24"
      fill="none"
    >
      {/* Brain / sparkle icon */}
      <path
        d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z"
        fill="white"
        opacity="0.95"
      />
      <circle cx="12" cy="11" r="2.5" fill="rgba(255,255,255,0.3)" />
    </svg>
  </div>
);

/* ── Floating chat bubble icon ───────────────────────── */
const ChatBubbleIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
      fill="white"
    />
    {/* Three dots */}
    <circle cx="9" cy="12" r="1" fill="#2545ea" />
    <circle cx="12" cy="12" r="1" fill="#7c3aed" />
    <circle cx="15" cy="12" r="1" fill="#f97316" />
  </svg>
);

const SYSTEM_PROMPT = `Bạn là "Trợ lý TrueStudy" — trợ lý AI thông minh của nền tảng TrueStudy Toolkit, được phát triển dành riêng cho sinh viên Đại học FPT.

## Về TrueStudy Toolkit
TrueStudy Toolkit là hệ thống hỗ trợ sinh viên hiện đại, tập trung vào liêm chính học thuật và nâng cao chất lượng học tập tại FPT University. Website: truestudy.io.vn

## Các tính năng chính của nền tảng:

1. **Kiểm tra đạo văn** (/plagiarism-checker): Phân tích văn bản để phát hiện dấu hiệu đạo văn, khả năng viết bởi AI, và chất lượng trích dẫn. Sử dụng AI để đánh giá mức độ rủi ro (thấp/trung bình/cao).

2. **Tạo trích dẫn** (/citation-generator): Hỗ trợ tạo trích dẫn theo các chuẩn APA, MLA, Chicago, Harvard, IEEE. Sinh viên chỉ cần nhập thông tin nguồn tài liệu và hệ thống sẽ tự động format đúng chuẩn.

3. **Kiểm tra kiến thức - Quiz** (/quiz): Hệ thống quiz trắc nghiệm về liêm chính học thuật với nhiều câu hỏi đa dạng. Giúp sinh viên kiểm tra và củng cố kiến thức.

4. **Video hướng dẫn - LearnLab** (/learnlab): Thư viện video bài giảng về liêm chính học thuật, kỹ năng viết học thuật, và cách sử dụng AI đúng đắn trong học tập.

5. **Bài khảo sát** (/survey): Khảo sát ý kiến sinh viên về liêm chính học thuật và trải nghiệm học tập.

6. **Mini Game: Đúng hay Sai?** (/mini-game): 10 câu hỏi nhanh dạng đúng/sai về liêm chính học thuật. Có đồng hồ đếm thời gian, bảng xếp hạng.

7. **Khóa học ngắn** (/support): Các khóa học ngắn về kỹ năng học thuật.

8. **Bảng điều khiển** (/dashboard): Theo dõi lịch sử hoạt động, thống kê cá nhân, và cấp độ người dùng (Mới bắt đầu → Trung cấp → Nâng cao → Chuyên gia).

## Kiến thức về liêm chính học thuật:
- Đạo văn (Plagiarism): Sao chép ý tưởng hoặc nội dung của người khác mà không trích nguồn
- Tự đạo văn (Self-plagiarism): Nộp lại bài cũ của chính mình cho môn học khác mà không xin phép
- Trích dẫn đúng cách: APA (tên tác giả, năm), MLA (tên tác giả, trang), Chicago (footnote)
- Sử dụng AI hợp lý: Dùng AI để kiểm tra ngữ pháp, gợi ý outline thì OK. Dùng AI viết toàn bộ bài rồi nộp thì vi phạm.
- FPT University sử dụng Turnitin để kiểm tra đạo văn
- Kiến thức phổ biến (common knowledge) không cần trích nguồn
- Paraphrase vẫn cần trích nguồn

## Quy tắc trả lời:
- LUÔN trả lời bằng tiếng Việt
- Thân thiện, gần gũi, dùng emoji phù hợp (không quá nhiều)
- Trả lời ngắn gọn, súc tích (tối đa 3-4 câu cho câu hỏi đơn giản)
- Khi cần giải thích dài, dùng bullet points
- Nếu câu hỏi liên quan đến tính năng cụ thể, hướng dẫn sinh viên đến đúng trang
- Nếu câu hỏi ngoài phạm vi (không liên quan đến học thuật/nền tảng), nhẹ nhàng từ chối và gợi ý quay lại chủ đề
- Xưng "mình" và gọi người dùng là "bạn"
- Nếu không chắc chắn, nói thẳng thay vì bịa đặt`;

const WELCOME_MSG = {
  role: "assistant",
  content:
    "Chào bạn! 👋 Mình là Trợ lý TrueStudy — sẵn sàng giúp bạn về liêm chính học thuật, hướng dẫn sử dụng các công cụ, hay bất kỳ câu hỏi nào về học tập. Hỏi mình nhé! ✨",
};

const QUICK_QUESTIONS = [
  "TrueStudy có những tính năng gì?",
  "Đạo văn là gì?",
  "Cách trích dẫn APA?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    setHasInteracted(true);
    const userMsg = { role: "user", content: msg };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey) throw new Error("API key chưa được cấu hình.");

      const historyForAPI = newMessages
        .filter((m) => m.role !== "system")
        .slice(-20)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...historyForAPI,
          ],
          temperature: 0.6,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) throw new Error(`Lỗi API: ${response.status}`);

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content;

      if (reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } else {
        throw new Error("Không nhận được phản hồi.");
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Xin lỗi, mình gặp lỗi rồi 😅 ${err.message || "Vui lòng thử lại sau."}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ─── Chat Window ─────────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-[97] w-[calc(100vw-2rem)] sm:w-[400px] transition-all duration-500 origin-bottom-right ${
          isOpen
            ? "scale-100 opacity-100 pointer-events-auto translate-y-0"
            : "scale-90 opacity-0 pointer-events-none translate-y-4"
        }`}
      >
        <div
          className="rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          style={{
            maxHeight: "min(560px, 75vh)",
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(37, 69, 234, 0.08)",
            boxShadow:
              "0 24px 80px rgba(37, 69, 234, 0.12), 0 8px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* ── Header ──────────────────────────────────── */}
          <div
            className="px-5 py-4 flex items-center justify-between shrink-0 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, #0f1647 0%, #1e2a89 40%, #2545ea 70%, #7c3aed 100%)",
            }}
          >
            {/* Subtle animated orbs in header */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/5 blur-sm" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent-500/10 blur-sm" />

            <div className="flex items-center gap-3 relative z-10">
              <BotAvatar size={42} className="shadow-lg" />
              <div>
                <h3 className="text-white font-bold text-[15px] leading-tight tracking-tight">
                  Trợ lý TrueStudy
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  <span className="text-white/50 text-[11px] font-medium">
                    Online
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer relative z-10 backdrop-blur-sm"
              aria-label="Đóng chat"
            >
              <GoX className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* ── Messages ────────────────────────────────── */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-[220px]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(0,0,0,0.08) transparent",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                style={{
                  animation: `chatFadeIn 0.35s ease-out ${i === messages.length - 1 ? "0s" : "0s"} both`,
                }}
              >
                {/* Avatar for bot only */}
                {msg.role === "assistant" && <BotAvatar size={30} />}

                <div
                  className={`max-w-[80%] px-4 py-3 text-[13.5px] leading-[1.65] whitespace-pre-wrap break-words ${
                    msg.role === "user"
                      ? "rounded-[20px] rounded-br-lg text-white font-medium"
                      : "rounded-[20px] rounded-bl-lg text-surface-800"
                  }`}
                  style={
                    msg.role === "user"
                      ? {
                          background:
                            "linear-gradient(135deg, #2545ea 0%, #7c3aed 100%)",
                          boxShadow: "0 4px 16px rgba(37, 69, 234, 0.2)",
                        }
                      : {
                          background: "rgba(243, 244, 246, 0.8)",
                          border: "1px solid rgba(0,0,0,0.04)",
                        }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div
                className="flex items-end gap-2"
                style={{ animation: "chatFadeIn 0.3s ease-out both" }}
              >
                <BotAvatar size={30} />
                <div
                  className="rounded-[20px] rounded-bl-lg px-5 py-3.5 flex items-center gap-2"
                  style={{
                    background: "rgba(243, 244, 246, 0.8)",
                    border: "1px solid rgba(0,0,0,0.04)",
                  }}
                >
                  <span className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <span
                        key={dot}
                        className="w-[7px] h-[7px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, #2545ea, #7c3aed)",
                          animation: `typingDot 1.4s ease-in-out ${dot * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ── Quick questions (only before first interaction) ─ */}
          {!hasInteracted && (
            <div className="px-4 pb-2 flex gap-2 flex-wrap">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full transition-all cursor-pointer hover:scale-[1.03] active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(37,69,234,0.06), rgba(124,58,237,0.06))",
                    border: "1px solid rgba(37,69,234,0.12)",
                    color: "#2545ea",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* ── Input ───────────────────────────────────── */}
          <div className="px-4 pb-4 pt-2 shrink-0">
            <div
              className="flex items-center gap-2 p-1.5 rounded-2xl transition-all"
              style={{
                background: "rgba(243, 244, 246, 0.6)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi của bạn..."
                disabled={isLoading}
                className="flex-1 px-3 py-2.5 bg-transparent text-[13.5px] text-surface-900 placeholder:text-surface-400 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 shrink-0 hover:scale-105 active:scale-95"
                style={{
                  background: input.trim()
                    ? "linear-gradient(135deg, #2545ea 0%, #7c3aed 100%)"
                    : "rgba(0,0,0,0.08)",
                  boxShadow: input.trim()
                    ? "0 4px 12px rgba(37,69,234,0.3)"
                    : "none",
                }}
                aria-label="Gửi tin nhắn"
              >
                <GoPaperAirplane
                  className={`w-4 h-4 ${input.trim() ? "text-white" : "text-surface-400"}`}
                />
              </button>
            </div>
            <p className="text-center text-[10px] text-surface-300 mt-2 font-medium">
              Powered by TrueStudy AI
            </p>
          </div>
        </div>
      </div>

      {/* ─── Floating Button ─────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-4 sm:right-6 z-[97] group transition-all duration-500 cursor-pointer`}
        aria-label={isOpen ? "Đóng chat" : "Mở chat"}
      >
        {/* Glow ring behind button */}
        {!isOpen && (
          <span
            className="absolute inset-[-4px] rounded-full opacity-60 animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, #2545ea 0%, #7c3aed 50%, #f97316 100%)",
              filter: "blur(10px)",
            }}
          />
        )}

        <span
          className={`relative flex items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300 group-hover:scale-110 group-active:scale-95 shadow-xl ${
            isOpen ? "rotate-0" : ""
          }`}
          style={{
            background: isOpen
              ? "#374151"
              : "linear-gradient(135deg, #2545ea 0%, #7c3aed 50%, #f97316 100%)",
            boxShadow: isOpen
              ? "0 8px 30px rgba(0,0,0,0.15)"
              : "0 8px 30px rgba(37,69,234,0.3), 0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          {isOpen ? <GoX className="w-6 h-6 text-white" /> : <ChatBubbleIcon />}
        </span>

        {/* Notification badge */}
        {!isOpen && !hasInteracted && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-lg animate-bounce">
            1
          </span>
        )}
      </button>

      {/* ─── Keyframe Animations ─────────────────────────── */}
      <style>{`
        @keyframes chatFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes typingDot {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
