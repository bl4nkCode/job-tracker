import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BriefcaseBusiness } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '../context/AuthContext'

const inputClass =
  'w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    try {
      await register(name, email, password, confirm)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (err) {
      const errors = err.response?.data?.errors

      setError(
        errors
          ? Object.values(errors)[0]?.[0] || 'Please check your information.'
          : err.response?.data?.message || 'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fa] px-4 py-8 sm:px-6">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative w-full max-w-[400px]">
        {/* Logo */}
        <div className="mb-7 flex justify-center">
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

        {/* Registration form */}
        <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xl shadow-gray-900/[0.04] sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Create an account
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Sign up to get started
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="register-name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>

              <input
                id="register-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="register-email"
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
                htmlFor="register-password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label
                htmlFor="register-confirm"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>

              <input
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter your password"
                className={inputClass}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                'Creating account...'
              ) : (
                <>
                  Create account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Log in
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