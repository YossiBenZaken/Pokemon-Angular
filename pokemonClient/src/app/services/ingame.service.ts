import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngameService {
  url = 'http://localhost:3000/auth';
  constructor(private _http: HttpClient) {}
  updatePokedex(body: { wild_id: any; old_id: any; wat: string }) {
    return this._http.post(this.url + '/updatePokedex', body, {
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
