import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  api = 'http://localhost:5000/v1/api';
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any>(this.api + '/orders');
  }
  getOrderByStatus(status: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/orders/bystatus'}/${status}`);
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> duong
