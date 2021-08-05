import { not } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContactDetails, ContactInterface } from '../sharedData';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactdetailService extends BehaviorSubject<GridDataResult> {
  public loading: boolean | any;

  private data = ContactDetails;

  constructor(private http: HttpClient) {
    super(<GridDataResult>{});
  }

  // from assets folder
  private baseUrl: string = 'http://localhost:4200/assets/contactsDb.json/';

  // from json server
  // private baseUrl: string = 'http://localhost:3000/contactsDb.json/';

  public query(tableName: string = ''): Observable<any> {
    return this.http.get(this.baseUrl + tableName);
  }

  private errorHandler(errorres: HttpErrorResponse) {
    let errorMessage = '';
    if (errorres.error instanceof ErrorEvent) {
      //  client-side error
      errorMessage = errorres.error.message;
    } else {
      //  server-side error
      errorMessage = `Error Code: ${errorres.status}\nMessage: ${errorres.message}`;
    }

    return throwError(errorMessage);
  }
}
