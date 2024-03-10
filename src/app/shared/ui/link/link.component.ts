import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './link.component.html',
  styleUrl: './link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  @Input({required: true}) public linkText!: string
  @Input() public href!: string
}
