import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Offer } from '../models/offer.model';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpDataService {
  base_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An errorr ocurred ${error.status}, body was ${error.error}`);
    } else{
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError('Something happened with request, please try again later');

  }

  //CRUD

  getOffer(id : string): Observable<Offer>{
    return this.http.get<Offer>(this.base_URL + '/offers/'+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getOffers(): Observable<Offer>{
    return this.http.get<Offer>(this.base_URL + '/offers')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Create
  createOffer(data: Offer): Observable<Offer>{
    return this.http.post<Offer>(this.base_URL + '/offers', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Update
  updateOffer(id: string, data: Offer): Observable<Offer>{
    return this.http.put<Offer>(this.base_URL + '/offers/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Delete
  deleteOffer(id: string){
    return this.http.delete<Offer>(this.base_URL + '/offers/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
    
}
