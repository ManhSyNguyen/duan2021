import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  listProductByName: any[] = [];
  api = 'http://localhost:5000/v1/api';
  constructor(
    private http: HttpClient
  ) { }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.api + '/user'}/${id}`);
  }
}
