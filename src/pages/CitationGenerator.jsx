import React, { useState } from "react";
import {
  GoBook,
  GoCopy,
  GoCheckCircle,
  GoSync,
  GoTrash,
  GoPlus,
  GoX,
} from "react-icons/go";
import { useAuth } from "../contexts/AuthContext";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const sourceTypes = [
  { value: "website", label: "🌐 Trang web / Bài viết online" },
  { value: "book", label: "📚 Sách" },
  { value: "journal", label: "📄 Bài báo khoa học" },
  { value: "thesis", label: "🎓 Luận văn / Luận án" },
  { value: "video", label: "🎬 Video (YouTube, v.v.)" },
];

const initialForm = {
  sourceType: "website",
  authors: "",
  title: "",
  year: "",
  url: "",
  publisher: "",
  journal: "",
  volume: "",
  pages: "",
  doi: "",
  university: "",
};

const renderCitationText = (text) => {
  if (!text) return text;
  const parts = text.split(/(\*[^*]+\*)/);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
};

const CitationGenerator = () => {
  const { logActivity } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [format, setFormat] = useState("apa");
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleGenerate = async () => {
    if (!form.title.trim()) {
      setError("Vui lòng nhập tiêu đề tài liệu.");
      return;
    }

    setLoading(true);
    setError(null);

    const details = Object.entries(form)
      .filter(([_, v]) => v.trim())
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const systemPrompt = `Bạn là chuyên gia trích dẫn học thuật. Tạo trích dẫn theo chuẩn ${format === "apa" ? "APA 7th edition" : "Harvard"} từ thông tin sau.

Quy tắc:
- Trả về JSON với cấu trúc: {"inText": "<trích dẫn trong bài>", "reference": "<trích dẫn đầy đủ cho danh mục tham khảo>", "notes": "<ghi chú ngắn nếu thiếu thông tin>"}
- Nếu thiếu tác giả, dùng tên tổ chức hoặc tiêu đề
- Nếu thiếu năm, ghi (n.d.)
- In nghiêng tiêu đề sách/tạp chí bằng dấu *...*
- Viết bằng format chuẩn nhất, chính xác nhất
- CHỈ trả về JSON, không thêm text khác`;

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Thông tin tài liệu:\n${details}` },
          ],
          temperature: 0.2,
          max_tokens: 1024,
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) {
        throw new Error(`API lỗi: ${response.status}`);
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      setCitations((prev) => [
        {
          ...result,
          format: format.toUpperCase(),
          sourceType: form.sourceType,
          title: form.title,
        },
        ...prev,
      ]);
      setForm(initialForm);
      logActivity(
        "citation_generate",
        `Created ${format.toUpperCase()} citation for: ${form.title}`,
      );
    } catch (err) {
      setError(err.message || "Không thể tạo trích dẫn.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRemove = (index) => {
    setCitations((prev) => prev.filter((_, i) => i !== index));
  };

  const renderFields = () => {
    const t = form.sourceType;
    return (
      <>
        {/* Authors - always shown */}
        <div>
          <label className="block text-sm font-semibold text-primary-950 mb-1.5">
            Tác giả
          </label>
          <input
            type="text"
            value={form.authors}
            onChange={(e) => handleChange("authors", e.target.value)}
            placeholder="VD: Nguyễn Văn A, Trần Thị B"
            className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
          />
        </div>

        {/* Title - always shown */}
        <div>
          <label className="block text-sm font-semibold text-primary-950 mb-1.5">
            Tiêu đề *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="VD: Ảnh hưởng của AI đến giáo dục đại học"
            className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
          />
        </div>

        {/* Year - always shown */}
        <div>
          <label className="block text-sm font-semibold text-primary-950 mb-1.5">
            Năm xuất bản
          </label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => handleChange("year", e.target.value)}
            placeholder="VD: 2024"
            className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
          />
        </div>

        {/* URL - for website, video */}
        {(t === "website" || t === "video") && (
          <div>
            <label className="block text-sm font-semibold text-primary-950 mb-1.5">
              URL
            </label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => handleChange("url", e.target.value)}
              placeholder="https://example.com/article"
              className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
            />
          </div>
        )}

        {/* Publisher - for book */}
        {t === "book" && (
          <div>
            <label className="block text-sm font-semibold text-primary-950 mb-1.5">
              Nhà xuất bản
            </label>
            <input
              type="text"
              value={form.publisher}
              onChange={(e) => handleChange("publisher", e.target.value)}
              placeholder="VD: NXB Giáo Dục"
              className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
            />
          </div>
        )}

        {/* Journal fields */}
        {t === "journal" && (
          <>
            <div>
              <label className="block text-sm font-semibold text-primary-950 mb-1.5">
                Tên tạp chí
              </label>
              <input
                type="text"
                value={form.journal}
                onChange={(e) => handleChange("journal", e.target.value)}
                placeholder="VD: Journal of Education"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-primary-950 mb-1.5">
                  Số / Volume
                </label>
                <input
                  type="text"
                  value={form.volume}
                  onChange={(e) => handleChange("volume", e.target.value)}
                  placeholder="VD: 15(2)"
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary-950 mb-1.5">
                  Trang
                </label>
                <input
                  type="text"
                  value={form.pages}
                  onChange={(e) => handleChange("pages", e.target.value)}
                  placeholder="VD: 45-62"
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary-950 mb-1.5">
                DOI
              </label>
              <input
                type="text"
                value={form.doi}
                onChange={(e) => handleChange("doi", e.target.value)}
                placeholder="VD: 10.1000/xyz123"
                className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
              />
            </div>
          </>
        )}

        {/* Thesis university */}
        {t === "thesis" && (
          <div>
            <label className="block text-sm font-semibold text-primary-950 mb-1.5">
              Trường / Đại học
            </label>
            <input
              type="text"
              value={form.university}
              onChange={(e) => handleChange("university", e.target.value)}
              placeholder="VD: Đại học FPT"
              className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-sm"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 mb-4">
          <GoBook className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-semibold text-primary-800">
            Công cụ trích dẫn
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary-950 font-(family-name:--font-heading) mb-3">
          Tạo trích dẫn tự động
        </h1>
        <p className="text-surface-600 text-lg max-w-2xl mx-auto">
          Nhập thông tin tài liệu và nhận trích dẫn chuẩn APA / Harvard ngay lập
          tức. Không cần lo về format — AI sẽ xử lý cho bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 md:p-8 space-y-5">
            {/* Source Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-primary-950 mb-2">
                Loại tài liệu
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sourceTypes.map((st) => (
                  <button
                    key={st.value}
                    onClick={() => handleChange("sourceType", st.value)}
                    className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                      form.sourceType === st.value
                        ? "border-primary-400 bg-primary-50 text-primary-800"
                        : "border-surface-200 text-surface-600 hover:border-primary-200 hover:bg-surface-50"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Fields */}
            {renderFields()}

            {/* Format Toggle */}
            <div>
              <label className="block text-sm font-semibold text-primary-950 mb-2">
                Chuẩn trích dẫn
              </label>
              <div className="flex rounded-xl bg-surface-100 p-1 gap-1">
                <button
                  onClick={() => setFormat("apa")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    format === "apa"
                      ? "bg-white text-primary-950 shadow-sm"
                      : "text-surface-500 hover:text-surface-700"
                  }`}
                >
                  APA 7th Edition
                </button>
                <button
                  onClick={() => setFormat("harvard")}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                    format === "harvard"
                      ? "bg-white text-primary-950 shadow-sm"
                      : "text-surface-500 hover:text-surface-700"
                  }`}
                >
                  Harvard
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                <GoX className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !form.title.trim()}
              className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary-950 text-white font-bold text-lg rounded-2xl hover:bg-primary-900 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary-900/15"
            >
              {loading ? (
                <>
                  <GoSync className="w-5 h-5 animate-spin" />
                  Đang tạo trích dẫn...
                </>
              ) : (
                <>
                  <GoPlus className="w-5 h-5" />
                  Tạo trích dẫn
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Guide */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-primary-950">📖 APA vs Harvard</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
                <p className="font-semibold text-primary-800 mb-1">
                  APA 7th Edition
                </p>
                <p className="text-surface-600">
                  Phổ biến trong khoa học xã hội, giáo dục, tâm lý học. Dùng
                  (Tác giả, Năm) trong bài.
                </p>
                <p className="text-xs text-surface-400 mt-2 font-mono bg-surface-100 px-2 py-1 rounded">
                  (Nguyễn, 2024, tr. 15)
                </p>
              </div>
              <div className="p-3 rounded-xl bg-surface-50 border border-surface-100">
                <p className="font-semibold text-primary-800 mb-1">Harvard</p>
                <p className="text-surface-600">
                  Phổ biến trong kinh doanh, luật, nhân văn. Dùng (Tác giả Năm)
                  trong bài.
                </p>
                <p className="text-xs text-surface-400 mt-2 font-mono bg-surface-100 px-2 py-1 rounded">
                  (Nguyễn 2024, p. 15)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-2xl border border-primary-100 p-6">
            <h3 className="font-bold text-primary-800 mb-2">
              💡 Mẹo trích dẫn
            </h3>
            <ul className="text-sm text-primary-700 space-y-2">
              <li>• Luôn ghi đủ họ tên tác giả</li>
              <li>• Năm xuất bản càng chính xác càng tốt</li>
              <li>• Với trang web, copy URL đầy đủ</li>
              <li>• Với bài báo, luôn thêm DOI nếu có</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Generated Citations List */}
      {citations.length > 0 && (
        <div className="mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-primary-950 font-(family-name:--font-heading)">
              Trích dẫn đã tạo ({citations.length})
            </h2>
            <button
              onClick={() => {
                const all = citations.map((c) => c.reference).join("\n\n");
                navigator.clipboard.writeText(all);
                setCopiedIndex("all");
                setTimeout(() => setCopiedIndex(null), 2000);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary-700 bg-primary-50 rounded-xl hover:bg-primary-100 transition-colors border border-primary-100"
            >
              {copiedIndex === "all" ? (
                <GoCheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <GoCopy className="w-4 h-4" />
              )}
              {copiedIndex === "all" ? "Đã copy!" : "Copy tất cả"}
            </button>
          </div>

          {citations.map((cite, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-5 py-3 bg-surface-50 border-b border-surface-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary-600 bg-primary-100 px-2.5 py-1 rounded-full">
                    {cite.format}
                  </span>
                  <span className="text-sm text-surface-600 truncate max-w-[200px]">
                    {cite.title}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(cite.reference, i)}
                    className="p-2 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Copy trích dẫn"
                  >
                    {copiedIndex === i ? (
                      <GoCheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <GoCopy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleRemove(i)}
                    className="p-2 text-surface-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Xóa"
                  >
                    <GoTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1">
                    Trích dẫn trong bài
                  </p>
                  <p className="text-sm text-surface-800 bg-surface-50 px-4 py-2.5 rounded-xl border border-surface-100 font-mono">
                    {renderCitationText(cite.inText)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-surface-400 uppercase tracking-wider mb-1">
                    Danh mục tham khảo
                  </p>
                  <p className="text-sm text-surface-800 bg-surface-50 px-4 py-2.5 rounded-xl border border-surface-100 leading-relaxed">
                    {renderCitationText(cite.reference)}
                  </p>
                </div>
                {cite.notes && (
                  <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100">
                    ⚠️ {cite.notes}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitationGenerator;
