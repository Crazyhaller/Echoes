import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema } from '@/lib/profileSchema'
import type { ProfileFormValues } from '@/lib/profileSchema'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebaseConfig'
import { Button } from '@/components/ui/button'
import MusicCardPreview from '@/components/MusicCardPreview'

export default function ProfilePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const usernameRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(true)
  const [customGenre, setCustomGenre] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const genres = [
    'Rock',
    'Pop',
    'Hip-Hop',
    'Electronic',
    'Jazz',
    'Classical',
    'Indie',
    'Metal',
    'Folk',
    'R&B',
    'Reggae',
    'Experimental',
    'Ambient',
    'Techno',
  ]

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: '',
      topTracks: ['', '', '', '', ''],
      topArtists: ['', '', '', '', ''],
      genre: '',
      spotify: '',
      instagram: '',
      facebook: '',
      publish: false,
    },
  })

  const watchedGenre = watch('genre')

  useEffect(() => {
    if (!user) return
    const loadProfile = async () => {
      const ref = doc(db, 'users', user.uid)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        Object.entries(data).forEach(([key, val]) => {
          if (key in profileSchema.shape) {
            setValue(key as keyof ProfileFormValues, val)
          }
        })
        if (!genres.includes(data.genre)) {
          setValue('genre', 'Other')
          setCustomGenre(data.genre)
        }

        if (data.bio) setValue('bio', data.bio)
        if (data.tags) setValue('tags', data.tags.join(', '))
      }
      if (localStorage.getItem('isNewUser') === 'true') {
        usernameRef.current?.focus()
        localStorage.removeItem('isNewUser')
      }

      setLoading(false)
    }
    loadProfile()
  }, [user, setValue])

  const onSubmit = async (form: ProfileFormValues) => {
    if (!user) return
    const ref = doc(db, 'users', user.uid)

    const genreToSave = form.genre === 'Other' ? customGenre.trim() : form.genre

    const rawTags = typeof form.tags === 'string' ? form.tags : ''
    const tagsArray =
      rawTags?.trim() === ''
        ? []
        : rawTags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
            .slice(0, 5) // ⬅️ limit to 5 tags

    const payload = {
      username: form.username,
      topTracks: form.topTracks,
      topArtists: form.topArtists,
      genre: genreToSave,
      spotify: form.spotify || '',
      instagram: form.instagram || '',
      facebook: form.facebook || '',
      publish: form.publish,
      bio: form.bio || '',
      tags: tagsArray,
    }

    await updateDoc(ref, payload)
    navigate('/home')
  }

  useEffect(() => {
    const existing = watch('tags')
    if (existing) {
      const parsed = existing
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .slice(0, 5)
      setTags(parsed)
    }
  }, [loading])

  useEffect(() => {
    setValue('tags', tags.join(', '))
  }, [tags])

  if (loading) return null

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-b from-black via-[#1A1A1A] to-[#2A2A2A]">
      <h1 className="text-3xl font-bold mb-6">Edit Your Profile</h1>

      <form className="space-y-4 mb-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('username')}
            ref={(e) => {
              register('username').ref(e)
              usernameRef.current = e
            }}
            placeholder="Username"
            className="w-full p-3 bg-black border border-gray-600"
          />
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username.message}</p>
          )}
        </div>

        <h2 className="font-semibold mt-6">Top 5 Tracks</h2>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <input
              {...register(`topTracks.${i}`)}
              placeholder={`Track ${i + 1}`}
              className="w-full p-3 bg-black border border-gray-700"
            />
            {errors.topTracks?.[i] && (
              <p className="text-sm text-red-400">
                {errors.topTracks[i]?.message}
              </p>
            )}
          </div>
        ))}

        <h2 className="font-semibold mt-6">Top 5 Artists</h2>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <input
              {...register(`topArtists.${i}`)}
              placeholder={`Artist ${i + 1}`}
              className="w-full p-3 bg-black border border-gray-700"
            />
            {errors.topArtists?.[i] && (
              <p className="text-sm text-red-400">
                {errors.topArtists[i]?.message}
              </p>
            )}
          </div>
        ))}

        <textarea
          {...register('bio')}
          placeholder="Write a short bio..."
          className="w-full p-3 bg-black border border-gray-700 h-24 resize-none"
          maxLength={200}
        />
        {errors.bio && (
          <p className="text-sm text-red-400">{errors.bio.message}</p>
        )}

        <div className="mt-6">
          <label className="block text-sm font-medium mb-1">
            Tags (up to 5)
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setTags(tags.filter((_, index) => index !== i))
                  }
                  className="text-red-300 hover:text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault()
                const newTag = tagInput.trim()
                if (newTag && !tags.includes(newTag) && tags.length < 5) {
                  setTags([...tags, newTag])
                }
                setTagInput('')
              }
            }}
            placeholder="Type tag and press enter"
            className="w-full p-3 bg-black border border-gray-700"
          />
        </div>

        <div className="mt-6">
          <select
            {...register('genre')}
            className="w-full p-3 bg-black border border-gray-600 text-white"
            onChange={(e) => {
              const value = e.target.value
              setValue('genre', value)
              if (value !== 'Other') setCustomGenre('')
            }}
          >
            <option value="">-- Select Genre --</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.genre && (
            <p className="text-sm text-red-400">{errors.genre.message}</p>
          )}
        </div>

        {watchedGenre === 'Other' && (
          <input
            type="text"
            placeholder="Enter your genre"
            value={customGenre}
            onChange={(e) => setCustomGenre(e.target.value)}
            className="w-full p-3 bg-black border border-gray-700 mt-2"
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <input
            {...register('spotify')}
            placeholder="Spotify @username"
            className="p-3 bg-black border border-gray-700"
          />
          <input
            {...register('instagram')}
            placeholder="Instagram @username"
            className="p-3 bg-black border border-gray-700"
          />
          <input
            {...register('facebook')}
            placeholder="Facebook @username"
            className="p-3 bg-black border border-gray-700"
          />
        </div>

        <label className="flex items-center space-x-3 mt-6">
          <input
            type="checkbox"
            {...register('publish')}
            className="accent-white scale-125"
          />
          <span className="text-gray-300">Publish to public feed</span>
        </label>

        <Button
          type="submit"
          className="mt-8 bg-gray-900 border border-gray-600 text-white hover:bg-white hover:text-black transition-all"
        >
          Save Profile
        </Button>
      </form>

      {watch('publish') && (
        <MusicCardPreview
          uid={user?.uid || 'anon'}
          username={watch('username')}
          genre={watch('genre') === 'Other' ? customGenre : watch('genre')}
          topTracks={watch('topTracks')}
          topArtists={watch('topArtists')}
          spotify={watch('spotify')}
          instagram={watch('instagram')}
          facebook={watch('facebook')}
        />
      )}
    </div>
  )
}
