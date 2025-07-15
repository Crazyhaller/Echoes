import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import Navbar from '@/components/Navbar'
import MusicCardPreview from '@/components/MusicCardPreview'

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
}

export default function UserProfilePage() {
  const { uid } = useParams()
  const [userData, setUserData] = useState<UserCardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return
      const ref = doc(db, 'users', uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        setUserData({ uid, ...(snap.data() as Omit<UserCardData, 'uid'>) })
      }
      setLoading(false)
    }

    fetchUser()
  }, [uid])

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1A1A1A] to-[#2A2A2A] text-white">
      <Navbar />

      <main className="p-6 max-w-3xl mx-auto">
        {loading ? (
          <p className="text-gray-400">Loading profile...</p>
        ) : !userData ? (
          <p className="text-gray-500 italic">User not found.</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">@{userData.username}</h1>
            <MusicCardPreview
              uid={userData.uid}
              username={userData.username}
              genre={userData.genre}
              topTracks={userData.topTracks}
              topArtists={userData.topArtists}
              spotify={userData.spotify}
              instagram={userData.instagram}
              facebook={userData.facebook}
              likes={userData.likes}
              dislikes={userData.dislikes}
              variant="profile"
            />
          </>
        )}
      </main>
    </div>
  )
}
