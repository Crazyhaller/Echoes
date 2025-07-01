import { auth, provider } from '@/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Navbar() {
  const handleSignIn = async () => {
    await signInWithPopup(auth, provider)
  }

  return (
    <motion.nav
      className="w-full py-4 px-6 flex justify-between items-center border-b border-gray-700 bg-[#1A1A1A]"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-white font-bold text-2xl tracking-tight">echoes</h1>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          variant="outline"
          onClick={handleSignIn}
          className="border-white text-white hover:bg-gray-800"
        >
          Login with Google
        </Button>
      </motion.div>
    </motion.nav>
  )
}
