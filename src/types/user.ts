export interface UserProfile {
  uid: string
  username: string
  topArtists: string[]
  topTracks: string[]
  genre: string
  spotify?: string
  instagram?: string
  facebook?: string
  createdAt: string
}

export interface Vote {
  cardUserId: string
  voterId: string
  vote: 'like' | 'dislike'
}
