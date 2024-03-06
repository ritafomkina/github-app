import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor() {}

  public isVisibleSearching: boolean = false

  public showSearching():void {
    this.isVisibleSearching = !this.isVisibleSearching
  }
}
