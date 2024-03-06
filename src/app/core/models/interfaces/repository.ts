export interface IRepository {
  id: number
  full_name: string
  owner: {
    login: string
    avatar_url: string
    followers_url: string
  }
  stargazers_count: number
  forks: number,
  watchers: number,
  language?: string
  created_at: string
  html_url: string,
}
