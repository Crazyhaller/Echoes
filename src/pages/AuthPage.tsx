import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth, provider } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      navigate('/home')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  const handleGoogleAuth = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate('/home')
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1A1A1A] to-[#2A2A2A] text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-gray-700 bg-[#1A1A1A] p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>

        {error && (
          <p className="text-sm text-red-400 text-center border border-red-500 p-2 bg-[#2A2A2A]">
            {error}
          </p>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {/* Email Input */}
          <motion.div whileFocus={{ scale: 1.01 }} className="transition-all">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-black border border-gray-600 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          {/* Password Input */}
          <motion.div whileFocus={{ scale: 1.01 }} className="transition-all">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-black border border-gray-600 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-white transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              className="w-full bg-gray-900 border border-gray-600 text-white hover:bg-white hover:text-black transition-all"
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </motion.div>
        </form>

        {/* Toggle */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            {isSignup ? 'Already have an account?' : 'Don’t have an account?'}{' '}
            <button
              className="underline hover:text-white"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Login' : 'Register'}
            </button>
          </p>
        </div>

        {/* Google Auth */}
        <div className="text-center border-t border-gray-700 pt-4">
          <p className="text-sm mb-2 text-gray-500">or sign in with</p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleGoogleAuth}
              className="w-full bg-gray-800 text-white border border-gray-600 hover:bg-white hover:text-black transition-all"
            >
              Continue with Google
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
