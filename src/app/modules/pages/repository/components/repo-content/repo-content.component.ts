import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRepository } from '@core';
import { LinkComponent } from '@shared/ui';

@Component({
  selector: 'app-repo-content',
  standalone: true,
  imports: [DatePipe, LinkComponent],
  templateUrl: './repo-content.component.html',
  styleUrl: './repo-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoContentComponent {
@Input() repository!: IRepository
}
