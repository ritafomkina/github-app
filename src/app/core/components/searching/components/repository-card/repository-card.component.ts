import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRepository } from '@core';

@Component({
  selector: 'app-repository-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repository-card.component.html',
  styleUrl: './repository-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryCardComponent {
@Input( { required: true } ) card!: IRepository

}
