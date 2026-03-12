import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GoCheckCircle,
  GoGift,
  GoAlert,
  GoPerson,
  GoArrowRight,
} from "react-icons/go";
import { submitCheckin } from "../services/apiService";
import { useAuth } from "../contexts/AuthContext";

const CheckIn = () => {
  const { logActivity } = useAuth();
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
  });
  const [status, setStatus] = useState("form"); // 'form' | 'success' | 'duplicate'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkedInAt, setCheckedInAt] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.name || !formData.email) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await submitCheckin(formData);
      setStatus("success");
      logActivity("checkin", "Checked in successfully");
    } catch (err) {
      if (err.alreadyCheckedIn) {
        setCheckedInAt(err.checkedInAt);
        setStatus("duplicate");
      } else {
        setError(err.error || "Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Success state
  if (status === "success") {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        {/* Confetti-like decorative elements */}
        <div className="relative">
          <div className="absolute -top-4 left-1/4 w-3 h-3 bg-accent-400 rounded-full animate-bounce" />
          <div className="absolute -top-2 right-1/3 w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="absolute top-0 left-1/3 w-2.5 h-2.5 bg-green-400 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>

        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <GoGift className="w-12 h-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold font-(family-name:--font-heading) text-primary-950 mb-3">
          Check-in thành công! 🎉
        </h1>
        <p className="text-surface-600 text-lg mb-3">
          Chào{" "}
          <span className="font-semibold text-primary-600">
            {formData.name}
          </span>
          !
        </p>
        <p className="text-surface-500 mb-8 max-w-sm mx-auto">
          Bạn đã check-in thành công. Hãy đến quầy lễ tân để nhận quà nhé!
        </p>

        <div className="bg-accent-50 border border-accent-200 rounded-2xl p-6 mb-8">
          <p className="text-accent-800 font-semibold text-lg mb-1">
            🎁 Quà tặng của bạn
          </p>
          <p className="text-accent-600 text-sm">
            Xuất trình màn hình này tại quầy lễ tân để nhận quà.
          </p>
          <div className="mt-4 bg-white rounded-xl p-4 border border-accent-200">
            <p className="text-sm text-surface-500">Mã check-in</p>
            <p className="text-2xl font-bold text-primary-950 font-mono tracking-wider">
              {formData.studentId}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/survey"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Làm khảo sát
            <GoArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-100 text-surface-700 font-semibold rounded-xl hover:bg-surface-200 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Duplicate state
  if (status === "duplicate") {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <GoAlert className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold font-(family-name:--font-heading) text-primary-950 mb-3">
          Bạn đã check-in rồi!
        </h1>
        <p className="text-surface-600 mb-2">
          MSSV <span className="font-semibold">{formData.studentId}</span> đã
          được check-in trước đó.
        </p>
        {checkedInAt && (
          <p className="text-surface-500 text-sm mb-8">
            Thời gian:{" "}
            {new Date(checkedInAt).toLocaleString("vi-VN", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/mini-game"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-400 transition-colors"
          >
            Chơi Mini Game
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-100 text-surface-700 font-semibold rounded-xl hover:bg-surface-200 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <GoCheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold font-(family-name:--font-heading) text-primary-950 mb-3">
          Check-in sự kiện
        </h1>
        <p className="text-surface-600 text-lg">
          Điền thông tin để check-in và nhận quà tặng.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-surface-200 rounded-2xl p-8 shadow-sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              Mã sinh viên (MSSV)
            </label>
            <input
              type="text"
              placeholder="VD: SE123456"
              value={formData.studentId}
              onChange={(e) => handleChange("studentId", e.target.value)}
              className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1">
              Email FPT
            </label>
            <input
              type="email"
              placeholder="tenban@fpt.edu.vn"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors cursor-pointer"
        >
          {loading ? (
            "Đang xử lý..."
          ) : (
            <>
              <GoPerson className="w-5 h-5" />
              Check-in ngay
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CheckIn;
