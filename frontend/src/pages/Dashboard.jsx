import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <h1 className="text-2xl font-bold text-blue-600">Job Tracker</h1>
        <p className="mt-2 text-gray-600">
          {user ? `Logged in as ${user.name}` : 'Not logged in'}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Log out
        </button>
      </div>
    </div>
  )
}