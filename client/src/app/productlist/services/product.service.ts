import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, publishReplay, refCount } from 'rxjs/operators';
// publishReplay tells Rx to cache the latest emitted
// refCount tells Rx to keep the Observable alive as long as there are any Subscribers
import { Product, ProductList } from '../interfaces/product';

export interface delInfo {
  _id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[];
<<<<<<< HEAD
  // private REST_Url = 'http://localhost:8000/api/list';
  private REST_Url = '/api/list';
=======
  //private REST_Url = 'http://localhost:8000/api/list';
  private REST_Url = 'https://mongodb-productview.herokuapp.com/api/list';
>>>>>>> heroku-aot
  constructor(private http: HttpClient) {}

  private handleError (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  // get("/api/list")
  getList:Function = (): Observable<ProductList> => {
    return this.http.get<ProductList>(this.REST_Url)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // post("/api/list")
  createProduct: Function = (newProduct: Product): Observable<Product> => {
    return this.http.post<Product>(this.REST_Url, newProduct)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get("/api/list/:prodId") endpoint 

  // put("/api/list/:prodId")
  updateProduct: Function = (putProduct: Product): Observable<Product> => {
    const putUrl = this.REST_Url + '/' + putProduct._id;
    return this.http.put<Product>(putUrl, putProduct)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
  
  // delete("/api/list/:prodId")
  deleteProduct: Function = (delPordId: String): Observable<delInfo> => {
    console.log(delPordId);
    return this.http.delete<delInfo>(this.REST_Url + '/' + delPordId)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }
}
