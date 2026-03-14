import { Routes, Route, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import PlagiarismChecker from "./pages/PlagiarismChecker";
import CitationGenerator from "./pages/CitationGenerator";

import MiniGame from "./pages/MiniGame";

import LearnLab from "./pages/LearnLab";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { AuthProvider } from "./contexts/AuthContext";
import CardNav from "./components/layout/CardNav";
import Footer from "./components/layout/Footer";
import LogoIcon from "./components/ui/LogoIcon";
import Chatbot from "./components/ui/Chatbot";

function App() {
  const location = useLocation();
  const items = [
    {
      label: "Công cụ",
      bgColor: "#0f1647", // primary-950
      textColor: "#fff",
      links: [
        {
          label: "Kiểm tra đạo văn",
          href: "/plagiarism-checker",
          ariaLabel: "Kiểm tra đạo văn",
        },
        {
          label: "Tạo trích dẫn",
          href: "/citation-generator",
          ariaLabel: "Tạo trích dẫn",
        },
      ],
    },
    {
      label: "Học tập",
      bgColor: "#1e2a89", // primary-900
      textColor: "#fff",
      links: [
        {
          label: "Video hướng dẫn",
          href: "/learnlab",
          ariaLabel: "Video LearnLab",
        },
        {
          label: "Kiểm tra kiến thức",
          href: "/quiz",
          ariaLabel: "Làm bài kiểm tra",
        },
      ],
    },
    {
      label: "Hoạt động",
      bgColor: "#10b981", // emerald-500
      textColor: "#fff",
      links: [
        {
          label: "Mini Game",
          href: "/mini-game",
          ariaLabel: "Chơi Mini Game",
        },
      ],
    },
    {
      label: "Hỗ trợ",
      bgColor: "#2545ea", // primary-600
      textColor: "#fff",
      links: [
        {
          label: "Khóa học ngắn",
          href: "/support",
          ariaLabel: "Xem các khóa học ngắn",
        },
        {
          label: "Giải đáp 1 kèm 1",
          href: "https://www.facebook.com/profile.php?id=61583706310530",
          ariaLabel: "Hỗ trợ Fanpage",
        },
      ],
    },
    {
      label: "Cá nhân",
      bgColor: "#ff7a12", // accent-500
      textColor: "#fff",
      links: [
        {
          label: "Bảng điều khiển",
          href: "/dashboard",
          ariaLabel: "Bảng điều khiển người dùng",
        },
        {
          label: "Chứng nhận",
          href: "/dashboard#certificates",
          ariaLabel: "Chứng nhận đã đạt",
        },
      ],
    },
  ];

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen bg-surface-50 text-surface-900 relative">
        {/* Decorative background element reminiscent of the reference image */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(37,69,234,0.12), rgba(124,58,237,0.06), transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(249,115,22,0.1), rgba(245,158,11,0.05), transparent 70%)",
            }}
          />
          <div
            className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(16,185,129,0.06), transparent 70%)",
            }}
          />
          <div
            className="absolute top-[60%] left-[20%] w-[25%] h-[25%] rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(124,58,237,0.05), transparent 70%)",
            }}
          />
        </div>

        {/* Navigation */}
        <CardNav
          logo={<LogoIcon className="w-7 h-7" />}
          logoAlt="TrueStudy Toolkit Logo"
          items={items}
          baseColor="rgba(255, 255, 255, 0.85)"
          menuColor="#0f1647"
          buttonBgColor="#ff7a12"
          buttonTextColor="#fff"
          ease="power3.out"
        />

        {/* Main Content Area */}
        <main
          className={`flex-grow w-full pb-10 ${location.pathname === "/" ? "" : "pt-[100px] md:pt-[120px]"}`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
            <Route path="/citation-generator" element={<CitationGenerator />} />

            <Route path="/mini-game" element={<MiniGame />} />

            <Route path="/learnlab" element={<LearnLab />} />
            <Route path="/support" element={<Support />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>

        {/* Footer - only on Home page */}
        {location.pathname === "/" && <Footer />}

        {/* Chatbot */}
        <Chatbot />
      </div>
    </AuthProvider>
  );
}

export default App;
