import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'

import CardNav from './components/layout/CardNav';
import Footer from './components/layout/Footer';
import LogoIcon from './components/ui/LogoIcon';

function App() {
  const items = [
    {
      label: "Công cụ",
      bgColor: "#0f1647", // primary-950
      textColor: "#fff",
      links: [
        { label: "Kiểm tra đạo văn", href: "/plagiarism-checker", ariaLabel: "Kiểm tra đạo văn" },
        { label: "Tạo trích dẫn", href: "/citation-generator", ariaLabel: "Tạo trích dẫn" }
      ]
    },
    {
      label: "Học tập", 
      bgColor: "#1e2a89", // primary-900
      textColor: "#fff",
      links: [
        { label: "Video hướng dẫn", href: "/learnlab", ariaLabel: "Video LearnLab" },
        { label: "Kiểm tra kiến thức", href: "/quiz", ariaLabel: "Làm bài kiểm tra" }
      ]
    },
    {
      label: "Hỗ trợ",
      bgColor: "#2545ea", // primary-600
      textColor: "#fff",
      links: [
        { label: "Khóa học ngắn", href: "/support", ariaLabel: "Xem các khóa học ngắn" },
        { label: "Giải đáp 1 kèm 1", href: "https://www.facebook.com/profile.php?id=61583706310530", ariaLabel: "Hỗ trợ Fanpage" }
      ]
    },
    {
      label: "Cá nhân",
      bgColor: "#ff7a12", // accent-500
      textColor: "#fff",
      links: [
        { label: "Bảng điều khiển", href: "/dashboard", ariaLabel: "Bảng điều khiển người dùng" },
        { label: "Chứng nhận", href: "/dashboard#certificates", ariaLabel: "Chứng nhận đã đạt" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-surface-50 text-surface-900 relative">
      {/* Decorative background element reminiscent of the reference image */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-200/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-200/20 blur-[100px] pointer-events-none" />
      
      {/* Navigation */}
      <CardNav
        logo={<LogoIcon className="w-5 h-5" />}
        logoAlt="AIToolkit Logo"
        items={items}
        baseColor="rgba(255, 255, 255, 0.85)"
        menuColor="#0f1647"
        buttonBgColor="#ff7a12"
        buttonTextColor="#fff"
        ease="power3.out"
      />

      {/* Main Content Area */}
      <main className="pt-[100px] md:pt-[120px] pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Future routes:
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/plagiarism-checker" element={<PlagiarismChecker />} />
            <Route path="/citation-generator" element={<CitationGenerator />} />
            <Route path="/learnlab" element={<LearnLab />} />
            <Route path="/support" element={<Support />} />
          */}
        </Routes>
      </main>
      
      {/* Global Footer */}
      <Footer />
    </div>
  )
}

export default App
