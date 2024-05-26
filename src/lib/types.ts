export interface DatabaseUserAttributes {
  id: string
  github_id: number
  username: string
  email: string
  image: string
  createdAt: Date
  updatedAt: Date | null
}

export interface GitHubUser {
  id: number
  login: string
  email: string
  avatar_url: string
}
