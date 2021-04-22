import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({ providedIn: 'root' })
export class ProductService {
    api = 'http://localhost:5000/v1/api';
    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<any> {
        return this.http.get<any>(this.api + '/products');
    }
    getProductById(id: any): Observable<any> {
        return this.http.get<any>(`${this.api + '/productdetails'}/${id}`);
    }
    createProduct(obj: any): Observable<any> {
      return this.http.post<any>(this.api + '/product', obj, httpOptions);
    }
    updateProduct(obj: any, id: any): Observable<any> {
      return this.http.put<any>(`${this.api + '/product'}/${id}`, obj, httpOptions);
    }
    deleteProduct(id: any): Observable<any> {
      return this.http.delete<any>(`${this.api + '/product'}/${id}`);
    }

}

