import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebaseConfig'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <motion.nav
      className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-700 bg-gradient-to-b from-black via-[#1A1A1A] to-[#2A2A2A]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1
        className="text-white font-bold text-2xl tracking-tight cursor-pointer"
        onClick={() => navigate('/')}
      >
        5-Echoes
      </h1>

      {!user ? (
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => navigate('/auth')}
            className="bg-gray-900 border border-gray-600 text-white hover:bg-white hover:text-black transition-all"
          >
            Sign In
          </Button>
        </motion.div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 bg-gray-900 border border-gray-600 text-white px-4 py-2 hover:bg-white hover:text-black"
          >
            <img
              src={
                user.photoURL ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${
                  user.displayName || 'U'
                }`
              }
              alt="avatar"
              className="w-8 h-8 rounded-full border border-gray-600"
            />
            <ChevronDown className="w-4 h-4" />
          </button>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 z-10 text-sm"
            >
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-800"
                onClick={() => {
                  navigate('/profile')
                  setDropdownOpen(false)
                }}
              >
                Edit Profile
              </button>
              <button
                className="w-full text-left px-4 py-2 border-t border-gray-700 hover:bg-gray-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </motion.div>
          )}
        </div>
      )}
    </motion.nav>
  )
}
