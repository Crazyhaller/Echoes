// routes/ProtectedRoute.tsx
import { useAuth } from '@/hooks/useAuth'
import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element
}) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/auth" replace />
}
