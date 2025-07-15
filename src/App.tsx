import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import { useAuth } from './hooks/useAuth'
import type { JSX } from 'react'
import ProfilePage from './pages/ProfilePage'
import UserProfilePage from './pages/UserProfilePage'
import RedirectToHomeIfAuth from './lib/Redirect'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/auth" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <RedirectToHomeIfAuth>
              <LandingPage />
            </RedirectToHomeIfAuth>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/user/:uid" element={<UserProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
