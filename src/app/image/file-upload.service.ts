import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {EmailRequest} from '../email/email';

@Injectable({providedIn: 'root'})
export class UploadFileService {

  constructor(private handler: HttpHandler) { }

  pushFileToStorage(file: File, url: string, email: EmailRequest): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    data.append('email', email);

    const newRequest = new HttpRequest('POST', url, data);

    return this.handler.handle(newRequest).pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      // tslint:disable-next-line:triple-equals
      if (error.status == 403) {
        throw new Error('You are not permitted to make changes on this account');
      }

      throw new Error('Unexpected error - please try again later');
    }

    // return an observable with a user-facing error message
    return throwError('Unexpected error - please try again later');
  }
}
