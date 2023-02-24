import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RankinglistService {
  url = 'http://localhost:3000/ranking';
  constructor(private _http: HttpClient) {}
  getRankingList() {
    return this._http.get<any[]>(this.url + '/getRankingList');
  }
}
