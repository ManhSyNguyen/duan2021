import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
  api = 'http://localhost:5000/v1/api';
  constructor(
    private http: HttpClient
  ) { }

  findAllUser(): Observable<any> {
    return this.http.get<any>(this.api + '/users');
  }
  findUserById(id: any): Observable<any> {
    return this.http.get<any>(`${this.api + '/user'}/${id}`);
  }
}
