import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <motion.nav
      className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-700 bg-gradient-to-b from-black via-[#1A1A1A] to-[#2A2A2A]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-white font-bold text-2xl tracking-tight">5-Echoes</h1>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          onClick={() => navigate('/auth')}
          className="bg-gray-900 border border-gray-600 text-white hover:bg-white hover:text-black transition-all"
        >
          Login with Google
        </Button>
      </motion.div>
    </motion.nav>
  )
}
