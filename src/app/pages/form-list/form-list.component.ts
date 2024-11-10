import Swal from 'sweetalert2';

import { Component, HostListener } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { FormService } from '../../services/form.service';
import { IForm } from '../../interfaces';
import { CardFormComponent } from '../../components/card-form/card-form.component';

@Component({
  selector: 'app-form-list',
  standalone: true,
  imports: [SearchFormComponent, CardFormComponent, MatGridListModule],
  templateUrl: './form-list.component.html',
  styleUrl: './form-list.component.scss',
})
export class FormListComponent {
  public formList: IForm[] = [];
  public searching: boolean = false;
  public colToUse = 3;
  public heightToUse = '2:1';

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    let size: number = event.target.innerWidth;
    this.handleScreenSize(size);
  }

  constructor(private readonly formService: FormService) {}

  ngAfterViewInit() {
    let innerWidth = window.innerWidth;
    this.handleScreenSize(innerWidth);
  }

  searchForm(formName: string) {
    this.searching = true;

    this.formService.searchForm(formName).subscribe({
      next: (forms: IForm[]) => {
        this.formList = forms;
        this.searching = false;
      },
      error: () =>
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error en conseguir el formulario',
          confirmButtonColor: '#b81414',
          confirmButtonText: 'ok',
        }),
    });
  }

  private handleScreenSize(screenWidth: number) {
    if (screenWidth < 1400) {
      this.heightToUse = '3:2';
    } else {
      this.heightToUse = '2:1';
    }

    if (screenWidth >= 1270) {
      this.colToUse = 3;
    }

    if (screenWidth < 1270) {
      this.colToUse = 2;
      this.heightToUse = '2:1';
    }

    if (screenWidth < 870) {
      this.colToUse = 1;
      this.heightToUse = '2:1';
    }
  }
}
