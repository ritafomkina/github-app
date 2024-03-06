import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchingService {

  public readonly languages = [
    "Javascript",
    "Python",
    "Go",
    "Java",
    "Kotlin",
    "PHP",
    "C#",
    "Swift",
    "R",
    "Ruby",
    "C and C++",
    "Matlab",
    "TypeScript",
    "Scala",
    "SQL",
    "HTML",
    "CSS",
    "NoSQL",
    "Rust",
    "Perl"
];



  private readonly apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  searchRepositories(searchTerm: string): Observable<string[]> {
    const url = `${this.apiUrl}/search/repositories?q=${searchTerm}`;
    return this.http.get<any>(url)
    .pipe
    (
      map(response => {
        return response.items;
      }),
      debounceTime(500)
    );
  }

}
