import { useState } from 'react'
import { User, Briefcase, Mail, Lock } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function RoleToggle({ role, setRole }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-white/20 rounded-xl">
      <button
        className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
          role === 'job_seeker' ? 'bg-white text-emerald-700 shadow' : 'text-white/80 hover:bg-white/10'
        }`}
        onClick={() => setRole('job_seeker')}
        type="button"
      >
        <User className="w-4 h-4" /> Job Seeker
      </button>
      <button
        className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
          role === 'hirer' ? 'bg-white text-emerald-700 shadow' : 'text-white/80 hover:bg-white/10'
        }`}
        onClick={() => setRole('hirer')}
        type="button"
      >
        <Briefcase className="w-4 h-4" /> Hirer
      </button>
    </div>
  )
}

export default function AuthCard() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [role, setRole] = useState('job_seeker')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const url = mode === 'signup' ? `${API_BASE}/auth/signup` : `${API_BASE}/auth/login`
      const body = mode === 'signup' ? { name, email, password, role } : { email, password }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Request failed')
      setMessage({ type: 'success', text: `${mode === 'signup' ? 'Welcome' : 'Welcome back'}, ${data.name}!` })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="backdrop-blur-xl bg-emerald-900/30 border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-2xl font-semibold">
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>
        <button
          onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          className="text-emerald-200 hover:text-white text-sm underline"
          type="button"
        >
          {mode === 'signup' ? 'I already have an account' : "I'm new here"}
        </button>
      </div>

      <RoleToggle role={role} setRole={setRole} />

      <form onSubmit={submit} className="mt-6 space-y-4">
        {mode === 'signup' && (
          <div className="relative">
            <input
              type="text"
              placeholder="Full name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-emerald-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
          </div>
        )}
        <div className="relative">
          <input
            type="email"
            placeholder="Email address"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-emerald-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
        </div>
        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-emerald-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/80 w-5 h-5" />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-400 hover:bg-emerald-300 text-emerald-900 font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
        >
          {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Sign in'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 text-sm rounded-lg p-3 ${
          message.type === 'success' ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  )
}
