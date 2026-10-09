
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import { useAuth } from './context/AuthContext'

function HomeRoute() {
  const { user } = useAuth()

  if (user) {
    return (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }

  return <Landing />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
