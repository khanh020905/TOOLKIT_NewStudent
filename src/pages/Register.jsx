import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoPersonAdd, GoArrowRight, GoEye, GoEyeClosed } from "react-icons/go";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    studentId: "",
    name: "",
    email: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.studentId || !form.name || !form.email || !form.password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (form.password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <GoPersonAdd className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold font-(family-name:--font-heading) text-primary-950 mb-2">
            Đăng ký
          </h1>
          <p className="text-surface-500">
            Tạo tài khoản để theo dõi tiến trình học tập
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
                value={form.studentId}
                onChange={(e) => handleChange("studentId", e.target.value)}
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
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Email FPT
              </label>
              <input
                type="email"
                placeholder="tenban@fpt.edu.vn"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Tối thiểu 6 ký tự"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-surface-200 rounded-xl text-surface-900 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 cursor-pointer"
                >
                  {showPw ? (
                    <GoEyeClosed className="w-5 h-5" />
                  ) : (
                    <GoEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-red-500 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-400 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? "Đang tạo..." : "Đăng ký"}
            <GoArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-4 text-center text-sm text-surface-500">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
