import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { IAnswer, IForm } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private apiUrl = 'http://localhost:3001/api';

  constructor(private httpService: HttpService) {}

  getForm(id: string): Observable<IForm> {
    return this.httpService
      .get(`${this.apiUrl}/forms/${id}`)
      .pipe(catchError(this._handleError));
  }

  getAnswers(formId: string): Observable<IAnswer[]> {
    return this.httpService
      .get(`${this.apiUrl}/form-answers/${formId}`)
      .pipe(catchError(this._handleError));
  }

  submitForm(body: { answers: IAnswer[] }): Observable<any> {
    return this.httpService
      .post(`${this.apiUrl}/form-answers`, body)
      .pipe(catchError(this._handleError));
  }

  private _handleError(error: HttpErrorResponse) {
    const errorMsg = `Error status: ${error.status} - Error message: ${error.message}`;
    console.error(errorMsg);

    return throwError(() => new Error(errorMsg));
  }
}
