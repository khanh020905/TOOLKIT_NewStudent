function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 px-4">
        {/* Logo / Brand */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-50 border border-primary-200">
          <span className="text-sm font-medium text-primary-700 font-(family-name:--font-display)">
            🎓 Academic Integrity Toolkit
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-primary-950 font-(family-name:--font-heading) leading-tight">
          Master Your <br />
          <span className="bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            Academic Journey
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-surface-500 max-w-2xl mx-auto">
          Your essential toolkit for plagiarism prevention, proper citation, and ethical AI usage at FPT University.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button className="px-8 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5">
            Get Started
          </button>
          <button className="px-8 py-3 border-2 border-surface-200 text-surface-700 font-semibold rounded-xl hover:border-primary-300 hover:text-primary-600 transition-all duration-200">
            Learn More
          </button>
        </div>

        {/* Status badge */}
        <p className="text-sm text-surface-400 pt-8">
          ✅ Environment ready — React + Vite + Tailwind CSS v4
        </p>
      </div>
    </div>
  )
}

export default Home
