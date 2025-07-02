import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, provider } from '@/lib/firebase'

/**
 * Registers a new user with email/password and creates their Firestore profile.
 */
export async function registerWithEmail(email: string, password: string) {
  const res = await createUserWithEmailAndPassword(auth, email, password)

  await setDoc(doc(db, 'users', res.user.uid), {
    uid: res.user.uid,
    email: res.user.email,
    username: res.user.email?.split('@')[0],
    topArtists: [],
    topTracks: [],
    genre: '',
    createdAt: serverTimestamp(),
  })

  return res.user
}

/**
 * Logs in an existing user with email/password.
 */
export async function loginWithEmail(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email, password)
  return res.user
}

/**
 * Authenticates using Google OAuth and initializes Firestore profile if needed.
 */
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider)
  const userRef = doc(db, 'users', result.user.uid)
  const snap = await getDoc(userRef)

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: result.user.uid,
      email: result.user.email,
      username: result.user.displayName || 'anonymous',
      topArtists: [],
      topTracks: [],
      genre: '',
      createdAt: serverTimestamp(),
    })
  }

  return result.user
}
