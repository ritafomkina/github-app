import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, WritableSignal, signal } from '@angular/core';
import { RepositoryCardComponent } from './components';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SearchingService } from '@core/services';
import { IRepository } from '@core';
import { Subject, takeUntil } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-searching',
  standalone: true,
  imports: [NgIf, MatInputModule, MatFormFieldModule,MatSelectModule, RepositoryCardComponent, MatProgressSpinnerModule],
  templateUrl: './searching.component.html',
  styleUrl: './searching.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchingComponent implements OnInit, OnDestroy {
  public searchTerm: WritableSignal<string> = signal('')
  public languages: string[] = []
  public cards: IRepository[] = []

  private _isLoading:  WritableSignal<boolean> = signal(false)
  private _destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private searchingService: SearchingService
  ) {}

  public get isLoading(): boolean {
    return this._isLoading()
  }

  ngOnInit(): void {
    this.languages = this.searchingService.languages
  }

  public search(e: Event) {
    this.searchTerm.set((e.target as HTMLInputElement).value)
    this.loadData(this.searchTerm())
  }

  public onScroll(e: Event) {
    const container = e.target as HTMLElement;
    const scrollPosition = Math.floor(container.scrollTop + container.clientHeight);
    const totalHeight = container.scrollHeight;

    if (!this.isLoading && scrollPosition === totalHeight) {
      this.loadData(this.searchTerm());
    }
  }


  private loadData(keyWord: string):void {
    this._isLoading.set(true)
   this.searchingService.searchRepositories(keyWord)
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(
      response => {
        this.cards = [...this.cards, ...response.map(item => item as unknown as IRepository)];
        this._isLoading.set(false)
      }
    );
  }
  ngOnDestroy(): void {
    this._destroy$.next(true)
    this._destroy$.unsubscribe()
  }
}
