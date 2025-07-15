import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import MusicCardPreview from '@/components/MusicCardPreview'
import Navbar from '@/components/Navbar'
import { useNavigate } from 'react-router-dom'

interface UserCardData {
  uid: string
  username: string
  genre: string
  topTracks: string[]
  topArtists: string[]
  spotify?: string
  instagram?: string
  facebook?: string
  likes?: number
  dislikes?: number
  createdAt?: { seconds: number; nanoseconds: number }
}

export default function HomePage() {
  const [cards, setCards] = useState<UserCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'recent' | 'likes' | 'dislikes'>(
    'recent'
  )
  const [genreFilter, setGenreFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCards = async () => {
      const q = query(collection(db, 'users'), where('publish', '==', true))
      const snap = await getDocs(q)

      let data = snap.docs.map(
        (doc) =>
          ({ id: doc.id, ...doc.data() } as UserCardData & { id: string })
      )

      // Apply genre filter
      if (genreFilter) {
        data = data.filter(
          (d) => d.genre?.toLowerCase() === genreFilter.toLowerCase()
        )
      }

      // Sort
      if (sortBy === 'likes') {
        data.sort((a, b) => (b.likes || 0) - (a.likes || 0))
      } else if (sortBy === 'dislikes') {
        data.sort((a, b) => (b.dislikes || 0) - (a.dislikes || 0))
      } else {
        data.sort(
          (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)
        )
      }

      setCards(data)
      setLoading(false)
    }

    fetchCards()
  }, [sortBy, genreFilter])

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-black via-[#1A1A1A] to-[#2A2A2A] flex flex-col">
      <Navbar />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Community Drops</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'recent' | 'likes' | 'dislikes')
            }
            className="bg-black border border-gray-600 text-white px-3 py-2"
          >
            <option value="recent">Sort: Recent</option>
            <option value="likes">Sort: Most Liked</option>
            <option value="dislikes">Sort: Most Disliked</option>
          </select>

          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="bg-black border border-gray-600 text-white px-3 py-2"
          >
            <option value="">All Genres</option>
            {[
              'Rock',
              'Pop',
              'Hip-Hop',
              'Electronic',
              'Jazz',
              'Indie',
              'Metal',
              'Classical',
              'R&B',
              'Techno',
            ].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="text-gray-400">Loading...</p>}

        {!loading && cards.length === 0 && (
          <p className="text-gray-600 italic">
            No music cards match the selected filter.
          </p>
        )}

        {!loading && cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <MusicCardPreview
                key={card.uid}
                uid={card.uid}
                username={card.username}
                genre={card.genre}
                topTracks={card.topTracks}
                topArtists={card.topArtists}
                spotify={card.spotify}
                instagram={card.instagram}
                facebook={card.facebook}
                likes={card.likes}
                dislikes={card.dislikes}
                variant="grid"
                actions={
                  <button
                    onClick={() => navigate(`/user/${card.uid}`)}
                    className="mt-4 text-xs underline text-blue-400 hover:text-white"
                  >
                    View Profile
                  </button>
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
