import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-textarea-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './textarea-form.component.html',
})
export class TextareaFormComponent {
  @Input() control!: FormControl;

  @Input() label: string = '';
  @Input() type: string = '';
  @Input() placeHolder: string = '';
  @Input() defultValue: string = '';
  @Input() required: boolean = false;

  constructor() {}
}
