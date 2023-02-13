import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../models/UserInfo.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  getUserInfo() {
    return this._http.get<UserInfo>('http://localhost:3000/getUserInfo', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  token(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')!;
    } else {
      return '';
    }
  }
}
