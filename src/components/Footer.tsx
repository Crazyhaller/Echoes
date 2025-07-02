import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="w-full text-center py-6 border-t border-gray-700 bg-gradient-to-t from-[#1A1A1A] to-[#2A2A2A] text-gray-400 text-sm tracking-wide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      5-Echoes © {new Date().getFullYear()} — built for the love of music.
    </motion.footer>
  )
}
