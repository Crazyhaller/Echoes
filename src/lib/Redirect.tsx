import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function RedirectToHomeIfAuth({
  children,
}: {
  children: ReactNode
}) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && user) {
      navigate('/home')
    }
  }, [loading, user, navigate])

  if (user) return null
  return children
}
