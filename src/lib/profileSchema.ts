import { z } from 'zod'

export const profileSchema = z.object({
  username: z.string().min(2, 'Username is required'),
  topTracks: z.array(z.string().min(1)).length(5),
  topArtists: z.array(z.string().min(1)).length(5),
  genre: z.string().min(1),
  spotify: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  publish: z.boolean(),
  bio: z.string().max(200).optional(),
  tags: z.array(z.string()).optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
