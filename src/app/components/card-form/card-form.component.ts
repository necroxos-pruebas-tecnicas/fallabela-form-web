import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardFormComponent {
  @Input() id = '';
  @Input() name = '';
  @Input() description = '';

  constructor(private router: Router) {}

  goToPage(dest: string) {
    this.router.navigate([`${dest}`, this.id]);
  }
}
