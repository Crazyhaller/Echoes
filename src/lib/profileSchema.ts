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
  tags: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true
        const tags = val
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
        return tags.length <= 5
      },
      { message: 'You can enter up to 5 tags only' }
    ),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
