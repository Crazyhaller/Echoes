import { z } from 'zod'

export const profileSchema = z.object({
  username: z.string().min(3, 'Username is required'),
  topTracks: z
    .array(z.string().min(1, 'Track cannot be empty'))
    .length(5, 'Must enter 5 tracks'),
  topArtists: z
    .array(z.string().min(1, 'Artist cannot be empty'))
    .length(5, 'Must enter 5 artists'),
  genre: z.string().min(2, 'Genre is required'),
  spotify: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  publish: z.boolean().optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
