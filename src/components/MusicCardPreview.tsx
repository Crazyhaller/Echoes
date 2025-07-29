import { motion } from 'framer-motion'
import { useState } from 'react'
import { voteCard } from '@/lib/voteService'
import { useAuth } from '@/hooks/useAuth'
import LikedByModal from '@/components/LikedByModal'
import ProfileModal from '@/components/ProfileModal'

interface Props {
  uid: string
  username: string
  genre: string
  topTracks: string[]
  topArtists: string[]
  spotify?: string
  instagram?: string
  facebook?: string
  bio?: string
  tags?: string[]
  likes?: number
  dislikes?: number
  variant?: 'profile' | 'grid'
}

export default function MusicCardPreview({
  uid,
  username,
  genre,
  topTracks,
  topArtists,
  spotify,
  instagram,
  bio,
  tags,
  facebook,
  likes = 0,
  dislikes = 0,
  variant = 'profile',
}: Props) {
  const { user } = useAuth()
  const [hasVoted, setHasVoted] = useState(false)
  const [localLikes, setLocalLikes] = useState(likes)
  const [localDislikes, setLocalDislikes] = useState(dislikes)
  const [showLiked, setShowLiked] = useState(false)
  const [showDisliked, setShowDisliked] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const handleVote = async (type: 'like' | 'dislike') => {
    if (!user || user.uid === uid) return

    if (!user) {
      console.warn('No user, cannot vote')
      return
    }

    const result = await voteCard(user.uid, uid, type)

    if (result === 'voted') {
      if (type === 'like') setLocalLikes((l) => l + 1)
      else setLocalDislikes((d) => d + 1)
      setHasVoted(true)
    } else if (result === 'switched') {
      if (type === 'like') {
        setLocalLikes((l) => l + 1)
        setLocalDislikes((d) => d - 1)
      } else {
        setLocalLikes((l) => l - 1)
        setLocalDislikes((d) => d + 1)
      }
      setHasVoted(true)
    } else if (result === 'undone') {
      if (type === 'like') setLocalLikes((l) => l - 1)
      else setLocalDislikes((d) => d - 1)
      setHasVoted(false)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`border border-gray-700 p-4 sm:p-6 ${
          variant === 'grid' ? 'bg-[#1A1A1A]' : 'bg-[#111]'
        }`}
      >
        <h2
          className={`font-bold mb-2 ${
            variant === 'grid' ? 'text-lg' : 'text-xl'
          }`}
        >
          {username || 'Username'}
        </h2>

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

        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfile(true)}
            className="mt-4 w-full backdrop-blur-md bg-white/5 text-white border border-gray-600 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-black transition-all duration-300"
          >
            View Profile →
          </motion.button>
        </div>

        {showProfile && (
          <ProfileModal
            onClose={() => setShowProfile(false)}
            user={{
              username,
              genre,
              topTracks,
              topArtists,
              spotify,
              instagram,
              facebook,
              bio,
              tags,
            }}
          />
        )}

        {variant === 'grid' && (
          <div className="mt-6 flex gap-4 text-sm text-gray-400">
            <motion.button
              whileTap={{ scale: 0.9 }}
              disabled={!user}
              onClick={() =>
                hasVoted ? setShowLiked(true) : handleVote('like')
              }
              className="hover:text-white disabled:opacity-40"
            >
              🖤 {localLikes}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              disabled={!user}
              onClick={() =>
                hasVoted ? setShowDisliked(true) : handleVote('dislike')
              }
              className="hover:text-white disabled:opacity-40"
            >
              💔 {localDislikes}
            </motion.button>
          </div>
        )}
      </motion.div>

      {showLiked && (
        <LikedByModal
          targetUid={uid}
          type="like"
          onClose={() => setShowLiked(false)}
        />
      )}

      {showDisliked && (
        <LikedByModal
          targetUid={uid}
          type="dislike"
          onClose={() => setShowDisliked(false)}
        />
      )}
    </>
  )
}
