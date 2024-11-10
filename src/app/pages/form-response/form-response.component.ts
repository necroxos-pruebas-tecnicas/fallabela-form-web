import moment from 'moment';
import Swal from 'sweetalert2';

import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { FormService } from '../../services/form.service';
import { InputFormComponent } from '../../components/input-form/input-form.component';
import { SelectFormComponent } from '../../components/select-form/select-form.component';
import { TextareaFormComponent } from '../../components/textarea-form/textarea-form.component';
import { DateFormComponent } from '../../components/date-form/date-form.component';
import { IAnswer, IField, IForm } from '../../interfaces';
import { FieldType } from '../../enums';

@Component({
  selector: 'app-form-response',
  standalone: true,
  imports: [
    InputFormComponent,
    SelectFormComponent,
    TextareaFormComponent,
    DateFormComponent,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './form-response.component.html',
  styleUrl: './form-response.component.scss',
})
export class FormResponseComponent implements OnInit {
  public form: FormGroup;
  public showForm: boolean = false;
  public formName: string = '';
  public formDescription: string = '';
  public formFields: IField[] = [];

  @ViewChild('myForm') myForm!: NgForm;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formService: FormService,
    private readonly fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const { id } = params;
      this.formService.getForm(id).subscribe({
        next: (form: IForm) => this.createForm(form),
        error: () =>
          Swal.fire({
            icon: 'error',
            title: 'Hubo un error en conseguir el formulario',
            confirmButtonColor: '#b81414',
            confirmButtonText: 'ok',
          }),
      });
    });
  }

  createForm(form: IForm) {
    this.formName = form.name;
    this.formDescription = form.description;

    this.formFields = form.fields;

    const config: any = {};
    form.fields.forEach((field: IField) => {
      config[field.name] = [field.defaultValue, this.computeValidators(field)];
    });

    this.form = this.fb.group(config);

    this.showForm = !!this.form;
  }

  onSubmit() {
    if (!this.form.valid) {
      console.log('El formulario posee errores');
      return;
    }

    const answers: IAnswer[] = this.formFields.map((field) => ({
      fieldId: field.id!,
      value: this.toString(field),
    }));

    this.formService.submitForm({ answers }).subscribe({
      next: () => this.onSubmitSuccess(),
      error: () => this.onSubmitError(),
    });
  }

  getControl(field: string) {
    return this.form.get(field) as FormControl;
  }

  private onSubmitSuccess() {
    Swal.fire({
      text: 'Respuestas guardadas',
      icon: 'success',
      confirmButtonColor: '#105093',
      confirmButtonText: 'ok',
    }).then(() => {
      this.router.navigate(['']);
    });
  }

  private onSubmitError() {
    Swal.fire({
      icon: 'error',
      title: 'No se pudieron guardar sus respuestas...',
      confirmButtonColor: '#b81414',
      confirmButtonText: 'ok',
    });
  }

  private computeValidators(field: IField) {
    const validators = [];

    if (field.required) {
      validators.push(Validators.required);
    }

    if (field.type === 'email') {
      validators.push(Validators.email);
    }

    return validators;
  }

  private toString({ name, type }: IField): string {
    const fieldValue = this.form.value[name];

    if (!fieldValue) {
      return '';
    }

    if (type === FieldType.Date) {
      return moment(fieldValue).format('YYYY-MM-DD');
    }

    return String(fieldValue);
  }
}
