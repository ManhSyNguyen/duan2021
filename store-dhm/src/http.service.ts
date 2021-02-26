import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
    api = 'http://localhost:5000/v1/api';
    constructor(
        private http: HttpClient
    ) { }

    getAll(): Observable<any> {
        return this.http.get<any>(this.api + `/productdetails`);
    }
    getAllCategory(): Observable<any> {
        return this.http.get<any>(this.api + '/categorys');
    }
    getAllProduct(): Observable<any> {
        return this.http.get<any>(this.api + '/products');
    }
    getProductByCategory(id: any): Observable<any> {
        return this.http.get<any>(`${this.api}/products/${id}/categorys`);
    }
    getProductById(id: any): Observable<any> {
        return this.http.get<any>(`${this.api + '/productdetails'}/${id}`);
    }
}
