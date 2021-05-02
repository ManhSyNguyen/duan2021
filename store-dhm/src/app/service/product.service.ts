import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
    listProductByName: any[] = [];
    api = 'http://localhost:5000/v1/api';
    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<any> {
        return this.http.get<any>(this.api + `/productdetails`);
    }
    getProductByName(product: any): Observable<any> {
      return this.http.get<any>(`${this.api + '/products/byName'}/${product}`);
    }
    getAllProduct(): Observable<any> {
        return this.http.get<any>(this.api + '/products');
    }
    getProductById(id: any): Observable<any> {
        return this.http.get<any>(`${this.api + '/productdetails'}/${id}`);
    }

}
