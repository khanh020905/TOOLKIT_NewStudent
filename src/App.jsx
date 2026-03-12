import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'

// Layout
// import Navbar from './components/layout/Navbar'
// import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen bg-surface-50 text-surface-900">
      {/* <Navbar /> */}
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
      {/* <Footer /> */}
    </div>
  )
}

export default App
