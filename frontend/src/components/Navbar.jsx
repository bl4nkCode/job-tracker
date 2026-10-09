import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      navigate('/login')
    }
  }

  return (
    <nav className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-600">Job Tracker</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.name}</span>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-900"
        >
          Log out
        </button>
      </div>
    </nav>
  )
}