import { useEffect, useState } from 'react'
import { db } from '@/lib/firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

interface Props {
  targetUid: string
  onClose: () => void
  type: 'like' | 'dislike'
}

export default function LikedByModal({ targetUid, onClose, type }: Props) {
  const [voters, setVoters] = useState<string[]>([])

  useEffect(() => {
    const loadVoters = async () => {
      const q = query(
        collection(db, 'votes'),
        where('targetId', '==', targetUid),
        where('type', '==', type)
      )
      const snap = await getDocs(q)
      const usernames = snap.docs.map((d) => d.data().voterId as string) // TODO: fetch username if needed
      setVoters(usernames)
    }
    loadVoters()
  }, [targetUid, type])

  return (
    <div className="fixed inset-0 bg-black/80 text-white flex items-center justify-center z-50">
      <div className="bg-[#111] border border-gray-700 p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">
          {type === 'like' ? 'Liked' : 'Disliked'} by
        </h2>
        <ul className="space-y-2 text-sm max-h-60 overflow-y-auto">
          {voters.length === 0 ? (
            <li className="text-gray-400 italic">No users yet</li>
          ) : (
            voters.map((id) => <li key={id}>@{id}</li>)
          )}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 border border-gray-600 px-4 py-2 hover:bg-white hover:text-black transition-all"
        >
          Close
        </button>
      </div>
    </div>
  )
}
