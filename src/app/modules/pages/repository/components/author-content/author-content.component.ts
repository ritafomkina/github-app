import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IOwner } from '@core';

@Component({
  selector: 'app-author-content',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './author-content.component.html',
  styleUrl: './author-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorContentComponent {
  @Input() author!: IOwner
}
