import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      className="w-full text-center py-6 border-t border-gray-700 bg-[#1A1A1A] text-gray-500 text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      echoes © {new Date().getFullYear()} — built for the love of music.
    </motion.footer>
  )
}
