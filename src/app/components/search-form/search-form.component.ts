import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './search-form.component.html',
})
export class SearchFormComponent {
  @Input() placeHolder: string = '';

  @Output() searchAction: EventEmitter<string> = new EventEmitter<string>();

  public searchText = '';

  handleKeyup(event: KeyboardEvent): void {
    event.key === 'Enter' && this.emit();
  }

  emit() {
    this.searchAction.emit(this.searchText);
    this.searchText = '';
  }
}
