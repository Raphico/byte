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

export interface NavItem {
  title: string
  href: string
}

export interface AppConfig {
  navItems: NavItem[]
}
