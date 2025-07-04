import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db, provider } from '@/lib/firebaseConfig'

// Registers a new user with email/password and creates their Firestore profile.

export async function registerWithEmail(
  email: string,
  password: string
): Promise<'new' | 'existing'> {
  const res = await createUserWithEmailAndPassword(auth, email, password)

  await setDoc(doc(db, 'users', res.user.uid), {
    uid: res.user.uid,
    email: res.user.email,
    username: email.split('@')[0],
    topArtists: [],
    topTracks: [],
    genre: '',
    publish: false,
    createdAt: serverTimestamp(),
  })

  localStorage.setItem('isNewUser', 'true')
  return 'new'
}

// Logs in an existing user with email/password.

export async function loginWithEmail(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email, password)
  localStorage.setItem('isNewUser', 'false')
  return res.user
}

// Authenticates using Google OAuth and initializes Firestore profile if needed.

export async function loginWithGoogle(): Promise<'new' | 'existing'> {
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
      publish: false,
      createdAt: serverTimestamp(),
    })
    localStorage.setItem('isNewUser', 'true')
    return 'new'
  }

  return 'existing'
}
