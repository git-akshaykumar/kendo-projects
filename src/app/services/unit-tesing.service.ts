import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MyPost } from '../sharedData';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UnitTesingService {
  constructor(private http: HttpClient) {}

  public baseUrl = 'http://localhost:3000/posts';

  public getPosts(): Observable<MyPost[]> {
    return this.http
      .get<MyPost[]>(this.baseUrl)
      .pipe(catchError(this.errorHandler));
  }

  public post(sendData: MyPost): Observable<MyPost[]> {
    return this.http
      .post<MyPost[]>(this.baseUrl, sendData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.errorHandler));
  }

  public put(sendData: MyPost): Observable<void> {
    return this.http
      .put<void>(`${this.baseUrl}/${sendData.id}`, sendData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.errorHandler));
  }

  public delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(errorres: HttpErrorResponse) {
    let errorMessage = '';
    if (errorres.error instanceof ErrorEvent) {
      //  client-side error
      errorMessage = 'client side error' + errorres.error.message;
    } else {
      //  server-side error
      errorMessage = `server side Error Code: ${errorres.status}\nMessage: ${errorres.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
