import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import vinyl from '@/assets/vinyl.png'
import waveform from '@/assets/waveform.svg'
import headphones from '@/assets/headphones.svg'
import cassette from '@/assets/cassette.png'
import musicCard from '@/assets/musiccard.png'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-b from-black via-[#1A1A1A] to-[#2A2A2A] text-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full min-h-[90vh] flex flex-col justify-center items-center border-b border-gray-800 px-4 text-center"
        >
          <motion.img
            src={vinyl}
            alt="vinyl"
            className="w-24 h-24 mb-6 opacity-80"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Your Top 5. Shared.
          </h1>
          <p className="text-gray-400 max-w-xl mb-6">
            5-Echoes is a brutalist music social platform where users post their
            top tracks, artists, and vibe. Vote. Discover. Connect.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gray-900 border border-gray-600 text-white hover:bg-white hover:text-black transition-all"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.section>

        {/* Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 border-b border-gray-800">
          <motion.div
            className="p-6 border border-gray-700 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02 }}
          >
            <img src={waveform} alt="waveform" className="w-12 h-12 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Top 5 Artists</h2>
            <p className="text-gray-400">
              Add your most played artists that define your vibe.
            </p>
          </motion.div>
          <motion.div
            className="p-6 border border-gray-700 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02 }}
          >
            <img src={headphones} alt="headphones" className="w-12 h-12 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Top 5 Tracks</h2>
            <p className="text-gray-400">
              Your anthems. Your jam. Your forever loop tracks.
            </p>
          </motion.div>
          <motion.div
            className="p-6 border border-gray-700 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02 }}
          >
            <img src={cassette} alt="cassette" className="w-12 h-12 mb-4" />
            <h2 className="font-semibold text-xl mb-2">Favorite Genre</h2>
            <p className="text-gray-400">
              Let the world know what beat makes you alive.
            </p>
          </motion.div>
        </section>

        {/* How It Works */}
        <motion.section
          className="px-6 py-16 border-b border-gray-800 flex flex-col md:flex-row items-center justify-between gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={musicCard}
            alt="music card"
            className="w-full max-w-md rounded-md border border-gray-600"
          />
          <div className="text-left max-w-xl">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 mb-6">
              Create your card with your top 5 tracks, artists and genre. Others
              can vote, follow, and vibe with your taste.
            </p>
            <ul className="space-y-2 text-gray-300 list-disc list-inside">
              <li>Sign in with Google</li>
              <li>Update your music profile</li>
              <li>Browse & vote on other cards</li>
              <li>Filter by genre, sort by likes</li>
            </ul>
          </div>
        </motion.section>

        {/* Community Showcase (mock) */}
        <motion.section
          className="px-6 py-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Scroll through real-time drops by other users. Discover hidden gems
            and vote for what slaps hardest.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="h-40 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
              [Card Preview]
            </div>
            <div className="h-40 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
              [Card Preview]
            </div>
            <div className="h-40 bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
              [Card Preview]
            </div>
          </div>
        </motion.section>

        {/* Final CTA */}
        <motion.section
          className="px-6 py-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Drop your card. Make your echo.
          </h2>
          <p className="text-gray-400 mb-6">
            Sign in now to claim your slot in the hall of vibe.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-gray-900 border border-gray-600 text-white hover:bg-white hover:text-black transition-all"
            >
              Join Now
            </Button>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
