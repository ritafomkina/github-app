import { HttpClient } from '@angular/common/http'
import { Injectable, WritableSignal, signal } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import {
  IGitHubReadmeResponse,
  IGitHubRepositoryResponse,
  IGitHubResponse,
  IGutHubUserResponse,
  IRepository,
} from '@core'
import { Observable, catchError, forkJoin, map, of, switchMap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SearchingService {
  public readonly languages = [
    'Javascript',
    'Python',
    'Go',
    'Java',
    'Kotlin',
    'PHP',
    'C#',
    'Swift',
    'R',
    'Ruby',
    'C and C++',
    'Matlab',
    'TypeScript',
    'Scala',
    'SQL',
    'HTML',
    'CSS',
    'NoSQL',
    'Rust',
    'Perl',
  ]

  public readonly form: FormGroup
  private readonly _apiUrl = 'https://api.github.com'
  private readonly _repositoriesPage: WritableSignal<number> = signal(1)
  private _repoPerPage: number = 10

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      searchingTerm: '',
      language: '',
    })
  }

  public get repositoriesPage(): number {
    return this._repositoriesPage()
  }

  public set repositoriesPage(page: number) {
    this._repositoriesPage.set(page)
  }

  public fetchRepositories(
    searchTerm: string,
    language?: string
  ): Observable<IGitHubRepositoryResponse[]> {
    const searchRepoUrl = `${this._apiUrl}/search/repositories?q=${searchTerm}${language ? `+language:${language}` : ''}&per_page=${this._repoPerPage}&page=${this.repositoriesPage}`

    return this.http.get<IGitHubResponse>(searchRepoUrl).pipe(
      map(response => response.items),
      catchError(error => {
        console.error('Error fetching repositories:', error)
        return of([])
      })
    )
  }

  public getRepositoryInfo(
    repositoryId: number
    ): Observable<IRepository> {
    return this.fetchRepositoryById(repositoryId).pipe(
      switchMap((repoResponse: IGitHubRepositoryResponse) => {
        const userId = repoResponse.owner.id
        return forkJoin({
          user: this.fetchUser(userId),
          readme: this.fetchReadme(repositoryId),
        }).pipe(
          map(({ user, readme }) =>
            this.mapToRepository(repoResponse, user, readme)
          )
        )
      })
    )
  }

  private fetchRepositoryById(
    id: number
  ): Observable<IGitHubRepositoryResponse> {
    const repoUrl = `${this._apiUrl}/repositories/${id}`
    return this.http.get<IGitHubRepositoryResponse>(repoUrl)
  }

  private fetchUser(
    userId: number
    ): Observable<IGutHubUserResponse> {
    const userUrl = `${this._apiUrl}/user/${userId}`
    return this.http.get<IGutHubUserResponse>(userUrl)
  }

  private fetchReadme(id: number): Observable<IGitHubReadmeResponse> {
    const readmeUrl = `${this._apiUrl}/repositories/${id}/readme`
    return this.http.get<IGitHubReadmeResponse>(readmeUrl)
  }

  private mapToRepository(
    repository: IGitHubRepositoryResponse,
    owner: IGutHubUserResponse,
    readme: IGitHubReadmeResponse
  ): IRepository {
    const readMeContent: string = atob(readme.content)
    return {
      id: repository.id,
      name: repository.name,
      owner: {
        id: owner.id,
        login: owner.login,
        name: owner.name,
        avatar_url: owner.avatar_url,
        followers: owner.followers,
        following: owner.following,
        created_at: owner.created_at,
      },
      stargazers_count: repository.stargazers_count,
      forks_count: repository.forks_count,
      watchers_count: repository.watchers_count,
      language: repository.language,
      created_at: repository.created_at,
      html_url: repository.html_url,
      homepage: repository.homepage,
      readme_url: readme.download_url,
      readme_content: readMeContent,
    }
  }
}
