import { motion } from 'framer-motion'

interface Props {
  username: string
  genre: string
  topTracks: string[]
  topArtists: string[]
  spotify?: string
  instagram?: string
  facebook?: string
}

export default function MusicCardPreview({
  username,
  genre,
  topTracks,
  topArtists,
  spotify,
  instagram,
  facebook,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-12 border border-gray-700 p-6 bg-[#111]"
    >
      <h2 className="text-xl font-bold mb-2">{username || 'Username'}</h2>
      <p className="text-gray-400 mb-4 italic">{genre || 'Genre'}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Top Tracks
          </h3>
          <ul className="space-y-1 text-white text-sm">
            {topTracks.map((track, i) => (
              <li key={i}>{track || `Track ${i + 1}`}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">
            Top Artists
          </h3>
          <ul className="space-y-1 text-white text-sm">
            {topArtists.map((artist, i) => (
              <li key={i}>{artist || `Artist ${i + 1}`}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 space-y-1 text-sm text-gray-400">
        {spotify && <p>Spotify: @{spotify}</p>}
        {instagram && <p>Instagram: @{instagram}</p>}
        {facebook && <p>Facebook: @{facebook}</p>}
      </div>
    </motion.div>
  )
}
