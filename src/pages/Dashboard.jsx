import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  GoGraph,
  GoShield,
  GoBook,
  GoChecklist,
  GoTrophy,
  GoSignOut,
  GoVideo,
  GoCheckCircle,
  GoPencil,
  GoLightBulb,
  GoRocket,
  GoClock,
  GoPersonFill,
} from "react-icons/go";
import { useAuth } from "../contexts/AuthContext";

const ACTIVITY_LABELS = {
  plagiarism_check: {
    label: "Kiểm tra đạo văn",
    icon: GoShield,
    color: "text-red-500 bg-red-50",
  },
  citation_generate: {
    label: "Tạo trích dẫn",
    icon: GoPencil,
    color: "text-blue-500 bg-blue-50",
  },

  game_complete: {
    label: "Hoàn thành mini game",
    icon: GoTrophy,
    color: "text-amber-500 bg-amber-50",
  },

  quiz_complete: {
    label: "Hoàn thành quiz",
    icon: GoBook,
    color: "text-purple-500 bg-purple-50",
  },
  video_watch: {
    label: "Xem video",
    icon: GoVideo,
    color: "text-pink-500 bg-pink-50",
  },
  course_read: {
    label: "Đọc bài học",
    icon: GoLightBulb,
    color: "text-indigo-500 bg-indigo-50",
  },
};

const STAT_CARDS = [
  {
    key: "plagiarism_check",
    label: "Đạo văn",
    icon: GoShield,
    color: "from-red-500 to-red-600",
  },
  {
    key: "citation_generate",
    label: "Trích dẫn",
    icon: GoPencil,
    color: "from-blue-500 to-blue-600",
  },
  {
    key: "quiz_complete",
    label: "Quiz",
    icon: GoBook,
    color: "from-purple-500 to-purple-600",
  },

  {
    key: "game_complete",
    label: "Mini Game",
    icon: GoTrophy,
    color: "from-amber-500 to-amber-600",
  },
  {
    key: "video_watch",
    label: "Video",
    icon: GoVideo,
    color: "from-pink-500 to-pink-600",
  },
];

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  if (diff < 60000) return "Vừa xong";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} giờ trước`;
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, logout, authFetch } = useAuth();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }
    if (user) {
      Promise.all([
        authFetch("/api/activity/stats").then((r) => r.json()),
        authFetch("/api/activity").then((r) => r.json()),
      ])
        .then(([s, a]) => {
          setStats(s);
          setActivities(a);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const totalActivities = stats?.total || 0;
  const level =
    totalActivities >= 20
      ? { name: "Chuyên gia", icon: "🏆", color: "text-amber-500" }
      : totalActivities >= 10
        ? { name: "Nâng cao", icon: "⭐", color: "text-purple-500" }
        : totalActivities >= 3
          ? { name: "Trung cấp", icon: "📗", color: "text-green-500" }
          : { name: "Mới bắt đầu", icon: "🌱", color: "text-surface-500" };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-(family-name:--font-heading) text-primary-950">
              Xin chào, {user.name}! 👋
            </h1>
            <p className="text-surface-500 text-sm flex items-center gap-2">
              <GoPersonFill className="w-4 h-4" />
              {user.studentId} · {user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 bg-surface-50 rounded-lg ${level.color} font-semibold text-sm`}
          >
            <span>{level.icon}</span> {level.name}
          </div>
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-100 text-surface-600 rounded-lg hover:bg-surface-200 transition-colors text-sm font-medium cursor-pointer"
          >
            <GoSignOut className="w-4 h-4" />
            Đăng xuất
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          const count = stats?.[card.key] || 0;
          return (
            <div
              key={card.key}
              className="bg-white border border-surface-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mx-auto mb-2`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-primary-950">{count}</p>
              <p className="text-xs text-surface-500 mt-0.5">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-surface-200 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-primary-950 mb-4 flex items-center gap-2">
          <GoRocket className="w-5 h-5 text-accent-500" />
          Truy cập nhanh
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Kiểm tra đạo văn",
              to: "/plagiarism-checker",
              emoji: "🔍",
            },
            { label: "Tạo trích dẫn", to: "/citation-generator", emoji: "📝" },
            { label: "Làm quiz", to: "/quiz", emoji: "📋" },
            { label: "Xem video", to: "/learnlab", emoji: "🎬" },

            { label: "Mini game", to: "/mini-game", emoji: "🎮" },
            { label: "Khóa học ngắn", to: "/support", emoji: "📚" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-50 hover:bg-primary-50 hover:text-primary-700 text-surface-700 transition-colors group"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white border border-surface-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-primary-950 mb-4 flex items-center gap-2">
          <GoClock className="w-5 h-5 text-surface-400" />
          Lịch sử hoạt động
        </h2>

        {activities.length === 0 ? (
          <div className="text-center py-10">
            <GoGraph className="w-10 h-10 text-surface-300 mx-auto mb-3" />
            <p className="text-surface-500 font-medium">
              Chưa có hoạt động nào
            </p>
            <p className="text-surface-400 text-sm mt-1">
              Bắt đầu sử dụng các công cụ để theo dõi tiến trình!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((act) => {
              const meta = ACTIVITY_LABELS[act.type] || {
                label: act.type,
                icon: GoCheckCircle,
                color: "text-surface-500 bg-surface-50",
              };
              const Icon = meta.icon;
              return (
                <div
                  key={act._id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${meta.color}`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-950">
                      {meta.label}
                    </p>
                    {act.details && (
                      <p className="text-xs text-surface-400 truncate">
                        {act.details}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-surface-400 shrink-0">
                    {formatTime(act.createdAt)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
