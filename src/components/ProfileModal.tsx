import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  user: {
    username: string
    topTracks: string[]
    topArtists: string[]
    genre: string
    spotify?: string
    instagram?: string
    facebook?: string
    bio?: string
    tags?: string[]
  }
  onClose: () => void
}

export default function ProfileModal({ user, onClose }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-[#121212] border border-gray-700 p-6 w-full max-w-xl text-white relative"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
        <p className="text-sm text-gray-400 italic mb-4">{user.genre}</p>
        {user.bio && <p className="mb-4 text-sm text-gray-300">{user.bio}</p>}
        {Array.isArray(user.tags) && user.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {user.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs border border-gray-500 rounded text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-500 uppercase mb-1">
              Top Tracks
            </h3>
            <ul className="space-y-1">
              {user.topTracks.map((track, i) => (
                <li key={i}>{track}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500 uppercase mb-1">
              Top Artists
            </h3>
            <ul className="space-y-1">
              {user.topArtists.map((artist, i) => (
                <li key={i}>{artist}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 space-y-1 text-sm text-gray-400">
          {user.spotify && <p>Spotify: @{user.spotify}</p>}
          {user.instagram && <p>Instagram: @{user.instagram}</p>}
          {user.facebook && <p>Facebook: @{user.facebook}</p>}
        </div>
      </motion.div>
    </motion.div>
  )
}
