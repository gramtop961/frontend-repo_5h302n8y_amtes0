import Spline from '@splinetool/react-spline'
import AuthCard from './components/AuthCard'

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/50 via-emerald-800/40 to-emerald-900/60 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="text-white max-w-xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            Sea Green Identity Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Sign in for your role.
            <span className="block text-emerald-300">Job Seeker or Hirer</span>
          </h1>
          <p className="mt-4 text-emerald-100/90 text-lg">
            A modern, secure gateway with a vibrant sea‑green vibe. Create your account or sign in and we’ll tailor the experience to your role.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <AuthCard />
        </div>
      </div>
    </div>
  )
}

export default App
