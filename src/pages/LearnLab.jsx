import React, { useState, useEffect, useRef } from "react";
import {
  GoVideo,
  GoUpload,
  GoTrash,
  GoFilter,
  GoPlay,
  GoCheckCircle,
  GoAlert,
  GoClock,
  GoFileMedia,
  GoChevronDown,
} from "react-icons/go";

import guideVideo1 from "../assets/videos/video_1.mp4";
import guideVideo2 from "../assets/videos/video_2.mp4";
import guideVideo3 from "../assets/videos/video_3.mp4";

const GUIDE_STEPS = [
  {
    id: 1,
    title: "Nhập hoặc tải văn bản",
    description: "Dán văn bản bài viết vào ô nhập liệu hoặc tải lên file .txt từ máy tính của bạn.",
    video: guideVideo1,
  },
  {
    id: 2,
    title: "Phân tích văn bản",
    description: "Nhấn nút \"Phân tích văn bản\" để AI kiểm tra đạo văn, phát hiện nội dung AI, và đánh giá trích dẫn.",
    video: guideVideo2,
  },
  {
    id: 3,
    title: "Xem kết quả & cải thiện",
    description: "Xem điểm số chi tiết, các vấn đề được phát hiện, và gợi ý cải thiện bài viết của bạn.",
    video: guideVideo3,
  },
];

const CATEGORIES = [
  { value: "all", label: "Tất cả" },
  { value: "citation", label: "📝 Trích dẫn nguồn" },
  { value: "paraphrase", label: "✍️ Paraphrase" },
  { value: "ai-usage", label: "🤖 Sử dụng AI" },
  { value: "plagiarism", label: "🔍 Đạo văn" },
  { value: "other", label: "📚 Khác" },
];

const formatFileSize = (bytes) => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const LearnLab = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [activeGuideStep, setActiveGuideStep] = useState(0);
  const [guideOpen, setGuideOpen] = useState(false);
  const guideVideoRefs = useRef([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "other",
    uploadedBy: "",
  });
  const fileRef = useRef(null);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const catDropdownRef = useRef(null);

  const handleGuideStepChange = (index) => {
    guideVideoRefs.current.forEach((ref) => {
      if (ref) ref.pause();
    });
    setActiveGuideStep(index);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        catDropdownRef.current &&
        !catDropdownRef.current.contains(e.target)
      ) {
        setCatDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch videos
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/videos${filter !== "all" ? `?category=${filter}` : ""}`,
      );
      const data = await res.json();
      setVideos(data);
    } catch {
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [filter]);

  // Upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setUploadError("Vui lòng chọn file video.");
      return;
    }
    if (!form.title.trim()) {
      setUploadError("Vui lòng nhập tiêu đề video.");
      return;
    }

    setUploadError("");
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("uploadedBy", form.uploadedBy || "Admin");

    try {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/videos/upload");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      };

      const result = await new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(
              new Error(
                JSON.parse(xhr.responseText)?.error || "Upload thất bại.",
              ),
            );
          }
        };
        xhr.onerror = () => reject(new Error("Lỗi kết nối."));
        xhr.send(formData);
      });

      if (result.success) {
        setUploadSuccess(true);
        setForm({
          title: "",
          description: "",
          category: "other",
          uploadedBy: "",
        });
        if (fileRef.current) fileRef.current.value = "";
        fetchVideos();
        setTimeout(() => {
          setUploadSuccess(false);
          setShowUpload(false);
        }, 2000);
      }
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Delete confirmation modal
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await fetch(`/api/videos/${deleteTargetId}`, { method: "DELETE" });
      fetchVideos();
    } catch {
      /* ignore */
    } finally {
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <GoVideo className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-(family-name:--font-heading) text-primary-950 mb-3">
          LearnLab — Video Hướng Dẫn
        </h1>
        <p className="text-surface-600 text-lg max-w-2xl mx-auto">
          Xem các video hướng dẫn từ giảng viên về trích dẫn, paraphrase, sử
          dụng AI đúng cách và kiến thức liêm chính học thuật.
        </p>
      </div>

      {/* Video Guide Section */}
      <div className="mb-10">
        <button
          onClick={() => setGuideOpen(!guideOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-white rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center group-hover:bg-accent-200 transition-colors">
              <GoPlay className="w-5 h-5 text-accent-600" />
            </div>
            <div className="text-left">
              <h2 className="font-bold text-primary-950 font-(family-name:--font-heading) text-lg">
                Hướng dẫn sử dụng công cụ kiểm tra đạo văn
              </h2>
              <p className="text-sm text-surface-500">
                Xem video hướng dẫn 3 bước kiểm tra đạo văn
              </p>
            </div>
          </div>
          <GoChevronDown
            className={`w-5 h-5 text-surface-400 transition-transform duration-300 ${guideOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${guideOpen ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}
        >
          <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
            {/* Step Tabs */}
            <div className="flex border-b border-surface-200">
              {GUIDE_STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleGuideStepChange(index)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-sm font-semibold transition-all duration-300 relative ${
                    activeGuideStep === index
                      ? "text-accent-600 bg-accent-50/50"
                      : "text-surface-500 hover:text-surface-700 hover:bg-surface-50"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      activeGuideStep === index
                        ? "bg-accent-500 text-white"
                        : "bg-surface-200 text-surface-600"
                    }`}
                  >
                    {step.id}
                  </span>
                  <span className="hidden sm:inline">{step.title}</span>
                  {activeGuideStep === index && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-500" />
                  )}
                </button>
              ))}
            </div>

            {/* Video + Description */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-primary-950 mb-1">
                  Bước {GUIDE_STEPS[activeGuideStep].id}:{" "}
                  {GUIDE_STEPS[activeGuideStep].title}
                </h3>
                <p className="text-sm text-surface-600">
                  {GUIDE_STEPS[activeGuideStep].description}
                </p>
              </div>
              <div className="rounded-xl overflow-hidden border border-surface-200 bg-black">
                <video
                  ref={(el) => (guideVideoRefs.current[activeGuideStep] = el)}
                  key={activeGuideStep}
                  src={GUIDE_STEPS[activeGuideStep].video}
                  controls
                  className="w-full max-h-[420px] object-contain"
                  preload="metadata"
                >
                  Trình duyệt không hỗ trợ video.
                </video>
              </div>

              {/* Step Navigation Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {GUIDE_STEPS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleGuideStepChange(index)}
                    className={`rounded-full transition-all duration-300 ${
                      activeGuideStep === index
                        ? "w-8 h-2.5 bg-accent-500"
                        : "w-2.5 h-2.5 bg-surface-300 hover:bg-surface-400"
                    }`}
                    aria-label={`Bước ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls: filter + upload button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <GoFilter className="w-5 h-5 text-surface-500" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === cat.value
                  ? "bg-primary-600 text-white"
                  : "bg-surface-100 text-surface-600 hover:bg-surface-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-400 transition-colors cursor-pointer"
        >
          <GoUpload className="w-5 h-5" />
          Upload Video
        </button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <div className="bg-white border border-surface-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-bold text-primary-950 mb-4">
            Upload Video Mới
          </h2>

          {uploadSuccess ? (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
              <GoCheckCircle className="w-6 h-6" />
              <span className="font-medium">Upload thành công!</span>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Hướng dẫn trích dẫn APA"
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Người upload
                  </label>
                  <input
                    type="text"
                    placeholder="VD: GV. Nguyễn Văn A"
                    value={form.uploadedBy}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, uploadedBy: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  placeholder="Mô tả ngắn về nội dung video..."
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  rows={2}
                  className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Danh mục
                  </label>
                  <div className="relative" ref={catDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setCatDropdownOpen(!catDropdownOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 border border-surface-200 rounded-xl text-surface-900 bg-white hover:border-surface-300 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all cursor-pointer"
                    >
                      <span>
                        {CATEGORIES.find((c) => c.value === form.category)
                          ?.label || "Chọn danh mục"}
                      </span>
                      <svg
                        className={`w-4 h-4 text-surface-400 transition-transform duration-200 ${catDropdownOpen ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {catDropdownOpen && (
                      <div className="absolute z-50 mt-1.5 w-full bg-white border border-surface-200 rounded-xl shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-1">
                        {CATEGORIES.slice(1).map((c) => (
                          <button
                            key={c.value}
                            type="button"
                            onClick={() => {
                              setForm((p) => ({ ...p, category: c.value }));
                              setCatDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer flex items-center gap-2 ${
                              form.category === c.value
                                ? "bg-primary-50 text-primary-700"
                                : "text-surface-700 hover:bg-surface-50"
                            }`}
                          >
                            {c.label}
                            {form.category === c.value && (
                              <GoCheckCircle className="w-4 h-4 ml-auto text-primary-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    File Video *
                  </label>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime"
                    className="w-full px-4 py-2.5 border border-surface-200 rounded-xl text-surface-900 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-accent-100 file:text-accent-700 file:font-medium file:cursor-pointer"
                  />
                </div>
              </div>

              {uploadError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  <GoAlert className="w-4 h-4 shrink-0" />
                  {uploadError}
                </div>
              )}

              {uploading && (
                <div>
                  <div className="flex items-center justify-between text-sm text-surface-500 mb-1">
                    <span>Đang upload...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 disabled:opacity-50 transition-colors cursor-pointer"
              >
                <GoUpload className="w-5 h-5" />
                {uploading ? "Đang upload..." : "Upload Video"}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Video Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-surface-500">Đang tải video...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-20 bg-white border border-surface-200 rounded-2xl">
          <GoFileMedia className="w-12 h-12 text-surface-300 mx-auto mb-4" />
          <p className="text-surface-500 text-lg font-medium mb-1">
            Chưa có video nào
          </p>
          <p className="text-surface-400 text-sm">
            Nhấn "Upload Video" để thêm video hướng dẫn đầu tiên.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {videos.map((video) => (
            <div key={video._id} className="group cursor-pointer">
              {/* Thumbnail / Player */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-900 mb-3">
                {playingId === video._id ? (
                  <video
                    src={`/api/videos/stream/${video.filename}`}
                    controls
                    autoPlay
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <button
                    onClick={() => setPlayingId(video._id)}
                    className="w-full h-full flex items-center justify-center cursor-pointer relative"
                  >
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Center play icon */}
                    <div className="w-14 h-14 bg-black/60 group-hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 z-10">
                      <GoPlay className="w-7 h-7 text-white ml-0.5" />
                    </div>

                    {/* Bottom-right file size badge (like duration in YT) */}
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[11px] font-medium rounded z-10">
                      {formatFileSize(video.size)}
                    </span>
                  </button>
                )}

                {/* Category badge top-left */}
                {playingId !== video._id && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[11px] font-medium rounded z-10">
                    {CATEGORIES.find((c) => c.value === video.category)
                      ?.label || "Khác"}
                  </span>
                )}
              </div>

              {/* Info — YouTube style: avatar + text side by side */}
              <div className="flex gap-3">
                {/* Avatar circle */}
                <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white text-sm font-bold shrink-0 mt-0.5">
                  {(video.uploadedBy || "A").charAt(0).toUpperCase()}
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-semibold text-primary-950 text-[15px] leading-snug line-clamp-2 group-hover:text-primary-700 transition-colors"
                    onClick={() => setPlayingId(video._id)}
                  >
                    {video.title}
                  </h3>
                  <p className="text-surface-500 text-[13px] mt-1 leading-tight">
                    {video.uploadedBy || "Admin"}
                  </p>
                  <div className="flex items-center gap-1 text-surface-400 text-[13px]">
                    <span>{formatDate(video.createdAt)}</span>
                    {video.description && (
                      <>
                        <span>·</span>
                        <span className="truncate">{video.description}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Delete button — 3-dot style */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTargetId(video._id);
                  }}
                  className="w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:bg-surface-100 text-surface-400 hover:text-red-500 transition-all cursor-pointer shrink-0"
                  title="Xóa video"
                >
                  <GoTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteTargetId(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-surface-200">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GoTrash className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-primary-950 text-center mb-2">
              Xóa video này?
            </h3>
            <p className="text-surface-500 text-sm text-center mb-6">
              Hành động này không thể hoàn tác. Video sẽ bị xóa vĩnh viễn.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 px-4 py-2.5 bg-surface-100 text-surface-700 font-semibold rounded-xl hover:bg-surface-200 transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors cursor-pointer"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnLab;
