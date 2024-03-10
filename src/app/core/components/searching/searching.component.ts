import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  WritableSignal,
  signal,
} from '@angular/core'
import { RepositoryCardComponent } from './components'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'

import { SearchingService } from '@core/services'
import { AppRoutes, BreakPoint, IRepository, ViewPortSize } from '@core'
import {
  Observable,
  Subject,
  debounceTime,
  fromEvent,
  map,
  takeUntil,
} from 'rxjs'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule, NgIf } from '@angular/common'
import { Router } from '@angular/router'
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatOptionModule } from '@angular/material/core'

@Component({
  selector: 'app-searching',
  standalone: true,
  imports: [
    MatOptionModule,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    RepositoryCardComponent,
    MatProgressSpinnerModule,
    CdkVirtualScrollViewport,
    ScrollingModule,
  ],
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchingComponent implements OnInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport)
  public viewPort?: CdkVirtualScrollViewport

  static readonly _itemSizes = {
    small: 10,
    medium: 50,
    large: 80,
  }

  public languages: string[] = []
  public isEmptyResult: boolean = false
  public itemSize: number = SearchingComponent._itemSizes.large
  public searchingForm!: FormGroup

  private _viewPortSize: ViewPortSize = ViewPortSize.LG
  private _cards: WritableSignal<IRepository[]> = signal([])
  private _isLoading: WritableSignal<boolean> = signal(false)
  private _page: number = 1
  private _showMin: number = 2
  private _route: string = AppRoutes.REPOSITORY
  private _resizeObservable$?: Observable<Event>
  private _destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private searchingService: SearchingService,
    protected router: Router
  ) {}

  public get isLoading(): boolean {
    return this._isLoading()
  }

  public get cards(): IRepository[] {
    return this._cards()
  }

  ngOnInit(): void {
    this.languages = this.searchingService.languages
    this.searchingForm = this.searchingService.form

    this.searchingForm.valueChanges
      .pipe(takeUntil(this._destroy$), debounceTime(1000))
      .subscribe(form => {
        this._cards.set([])
        this.loadData(form.searchingTerm, form.language)
      })

    this.determineItemSize()

    this._resizeObservable$ = fromEvent(window, 'resize')
    this._resizeObservable$
      .pipe(takeUntil(this._destroy$), debounceTime(1000))
      .subscribe(() => {
        this.determineItemSize()
      })
  }

  ngOnDestroy(): void {
    this._destroy$.next(true)
    this._destroy$.unsubscribe()
  }

  public determineItemSize(): void {
    if (
      window.innerWidth < BreakPoint.MD &&
      this._viewPortSize !== ViewPortSize.MD
    ) {
      this.itemSize = SearchingComponent._itemSizes.medium
      this._viewPortSize = ViewPortSize.MD
      this.viewPort?.checkViewportSize()
    } else if (
      window.innerHeight < BreakPoint.SM &&
      this._viewPortSize !== ViewPortSize.SM
    ) {
      this.itemSize = SearchingComponent._itemSizes.small
      this._viewPortSize = ViewPortSize.SM
      this.viewPort?.checkViewportSize()
    } else if (
      window.innerWidth > BreakPoint.MD &&
      this._viewPortSize !== ViewPortSize.LG
    ) {
      this.itemSize = SearchingComponent._itemSizes.large
      this._viewPortSize = ViewPortSize.LG
      this.viewPort?.checkViewportSize()
    }
  }

  public navigateToRepositoryPage(id: number) {
    const path = this._route.split('/')[0]
    this.router.navigateByUrl(`${path}/${id}`)
  }

  public loadMore(): void {
    if (this.viewPort) {
      const end = this.viewPort.getRenderedRange().end
      const total = this.viewPort.getDataLength()

      if (end >= total - this._showMin) {
        const searchTerm = this.searchingForm.get('searchingTerm')?.value
        const language = this.searchingForm.get('language')?.value
        this.setNextPage()
        this.loadData(searchTerm, language)
      }
    }
  }

  private loadData(keyWord: string, language?: string): void {
    this._isLoading.set(true)
    this.searchingService
      .fetchRepositories(keyWord, language)
      .pipe(
        takeUntil(this._destroy$),
        map(repos => repos.map(repo => repo as unknown as IRepository))
      )
      .subscribe(repos => {
        this._cards.set([...this._cards(), ...repos])
        this.isEmptyResult = !repos.length
        this._isLoading.set(false)
      })
  }

  private setNextPage(): void {
    this._page += 1
    this.searchingService.repositoriesPage = this._page
  }
}
