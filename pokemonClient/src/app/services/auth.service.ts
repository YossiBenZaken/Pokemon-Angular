import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/auth';
  constructor(private _http: HttpClient) {}
  getCharacters() {
    return this._http.get<{ naam: string }[]>(this.url + '/getCharacters');
  }
  register(body: any) {
    return this._http.post(this.url + '/register', body);
  }
  login(body: any) {
    return this._http.post(this.url + '/login', body);
  }
}
