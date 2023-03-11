import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/Item.model';

@Injectable({
  providedIn: 'root',
})
export class MarketService {
  url = 'http://localhost:3000/market';
  constructor(private _http: HttpClient) {}
  getPremiumItems() {
    return this._http.get<any[]>(this.url + '/premiumMarket', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  getPremium() {
    return this._http.get<any[]>(this.url + '/areaMarket', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  getItems() {
    return this._http.get<Item[]>(this.url + '/items', {
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
