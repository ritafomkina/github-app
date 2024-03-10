export interface IRepository {
  id: number
  name: string
  owner: Owner
  stargazers_count: number
  forks_count: number,
  watchers_count: number,
  language: string
  created_at: string
  html_url: string,
  homepage: string,
  readme_url: string,
  readme_content: string,
}

interface Owner
{
  id: number
    login: string
    name: string
    avatar_url: string
    followers: number,
    following: number,
    created_at: string,
  }
