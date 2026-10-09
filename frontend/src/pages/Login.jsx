import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      toast.success('Logged in successfully!')
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to log in. Please check your credentials.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fa] px-4 py-10">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20"
            aria-label="Job Tracker home"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
              <BriefcaseBusiness size={20} strokeWidth={1.8} />
            </span>

            <span className="text-xl font-semibold tracking-tight text-gray-900">
              Job Tracker
            </span>
          </Link>
        </div>

        {/* Login form */}
        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-gray-900/[0.04] sm:p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Log in to your account
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={inputClass}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                'Logging in...'
              ) : (
                <>
                  Log in
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </section>

        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Job Tracker
        </p>
      </div>
    </main>
  )
}