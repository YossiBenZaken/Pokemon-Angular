import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountOptionsService {
  url = 'http://localhost:3000/account-options';
  constructor(private _http: HttpClient) {}
  personal(body: any) {
    return this._http.post<any>(this.url + '/personal', body, {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  password(body: any) {
    return this._http.post<any>(this.url + '/password', body, {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  reset(body: any) {
    return this._http.post<any>(this.url + '/restart', body, {
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
