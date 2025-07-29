import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import MusicCardPreview from '@/components/MusicCardPreview'
import Navbar from '@/components/Navbar'
import { useAuth } from '@/hooks/useAuth'

interface UserCardData {
  uid: string
  username: string
  genre: string
  topTracks: string[]
  topArtists: string[]
  tags?: string[]
  bio?: string
  spotify?: string
  instagram?: string
  facebook?: string
  likes?: number
  dislikes?: number
  createdAt?: { seconds: number; nanoseconds: number }
}

export default function HomePage() {
  const { user } = useAuth()
  const [cards, setCards] = useState<UserCardData[]>([])
  const [myCard, setMyCard] = useState<UserCardData | null>(null)
  const [showPinnedCard, setShowPinnedCard] = useState(true)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'recent' | 'likes' | 'dislikes'>(
    'recent'
  )
  const [genreFilter, setGenreFilter] = useState('')

  useEffect(() => {
    const fetchCards = async () => {
      const q = query(collection(db, 'users'), where('publish', '==', true))
      const snap = await getDocs(q)

      const allData = snap.docs.map(
        (doc) =>
          ({ id: doc.id, ...doc.data() } as UserCardData & { id: string })
      )

      const mine = user ? allData.find((d) => d.uid === user.uid) ?? null : null
      const others = allData.filter((d) => !user || d.uid !== user.uid)

      let filtered = others
      if (genreFilter) {
        filtered = filtered.filter(
          (d) => d.genre?.toLowerCase() === genreFilter.toLowerCase()
        )
      }

      if (sortBy === 'likes') {
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0))
      } else if (sortBy === 'dislikes') {
        filtered.sort((a, b) => (b.dislikes || 0) - (a.dislikes || 0))
      } else {
        filtered.sort(
          (a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0)
        )
      }

      setMyCard(mine)
      setCards(filtered)
      setLoading(false)
    }

    fetchCards()
  }, [sortBy, genreFilter, user])

  // User card merged into main list if unpinned
  const displayCards = showPinnedCard
    ? cards
    : myCard
    ? [myCard, ...cards]
    : cards

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-black via-[#1A1A1A] to-[#2A2A2A] flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 relative pt-20">
        {/* User card pinned top-right fixed */}
        {myCard && showPinnedCard && (
          <div className="absolute top-0 right-0 z-10 hidden md:block max-w-[240px]">
            <div className="relative">
              <MusicCardPreview
                uid={myCard.uid}
                username={myCard.username}
                genre={myCard.genre}
                topTracks={myCard.topTracks}
                topArtists={myCard.topArtists}
                spotify={myCard.spotify}
                instagram={myCard.instagram}
                facebook={myCard.facebook}
                tags={myCard.tags}
                bio={myCard.bio}
                likes={myCard.likes}
                dislikes={myCard.dislikes}
                variant="grid"
              />
              <button
                onClick={() => setShowPinnedCard(false)}
                className="absolute top-2 right-2 text-xs text-gray-300 bg-black border border-gray-600 px-2 py-1 hover:bg-white hover:text-black transition"
              >
                Unpin
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <h1 className="text-3xl font-bold mb-4">Community Drops</h1>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
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

        {!loading && displayCards.length === 0 && (
          <p className="text-gray-600 italic">
            No music cards match the selected filter.
          </p>
        )}

        {!loading && displayCards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {displayCards.map((card) => (
              <div key={card.uid} className="relative">
                {!showPinnedCard && myCard?.uid === card.uid && (
                  <button
                    onClick={() => setShowPinnedCard(true)}
                    className="absolute top-2 right-2 z-10 text-xs text-gray-300 bg-black border border-gray-600 px-2 py-1 hover:bg-white hover:text-black transition"
                  >
                    Pin
                  </button>
                )}

                <MusicCardPreview
                  uid={card.uid}
                  username={card.username}
                  genre={card.genre}
                  topTracks={card.topTracks}
                  topArtists={card.topArtists}
                  spotify={card.spotify}
                  instagram={card.instagram}
                  facebook={card.facebook}
                  tags={card.tags}
                  bio={card.bio}
                  likes={card.likes}
                  dislikes={card.dislikes}
                  variant="grid"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
