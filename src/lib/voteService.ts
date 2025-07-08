import { db } from '@/lib/firebaseConfig'
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'

export async function voteCard(
  voterId: string,
  targetId: string,
  type: 'like' | 'dislike'
) {
  const voteId = `${voterId}_${targetId}`
  const voteRef = doc(db, 'votes', voteId)
  const userRef = doc(db, 'users', targetId)
  const voteSnap = await getDoc(voteRef)

  if (voteSnap.exists()) {
    const existingType = voteSnap.data().type

    if (existingType === type) {
      // Undo vote
      await updateDoc(userRef, {
        [type === 'like' ? 'likes' : 'dislikes']: increment(-1),
      })
      await setDoc(voteRef, { ...voteSnap.data(), type: null }, { merge: true })
      return 'undone'
    } else {
      // Switch vote
      await updateDoc(userRef, {
        [existingType === 'like' ? 'likes' : 'dislikes']: increment(-1),
        [type === 'like' ? 'likes' : 'dislikes']: increment(1),
      })
      await setDoc(voteRef, { ...voteSnap.data(), type }, { merge: true })
      return 'switched'
    }
  }

  await updateDoc(userRef, {
    [type === 'like' ? 'likes' : 'dislikes']: increment(1),
  })

  await setDoc(voteRef, {
    voterId,
    targetId,
    type,
    createdAt: Date.now(),
  })
  return 'voted'
}
