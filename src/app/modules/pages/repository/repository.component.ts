import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { IRepository, SearchingService } from '@core'
import { MarkdownService } from 'ngx-markdown'
import { Observable, Subject, takeUntil } from 'rxjs'

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent implements OnInit, OnDestroy {
  public data!: Observable<IRepository>
  public radioButtonArray: string[] = ['Автор', 'Репозиторий']
  public isUserCard: boolean = false
  public defaultCheck: string = 'Репозиторий'
  public readMe!: string

  private _destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchingService: SearchingService,
    private markdownService: MarkdownService
  ) {}


  parseMdText(text: string): string | Promise<string> {
    return this.markdownService.parse(text)
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const { id } = params

      this.data = this.searchingService
        .fetchRepositoryById(id)
        .pipe(takeUntil(this._destroy$))
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next(true)
    this._destroy$.unsubscribe()
  }
  public showInfoFor(cardName: string): void {
    this.isUserCard = cardName === 'Автор'
  }
}
