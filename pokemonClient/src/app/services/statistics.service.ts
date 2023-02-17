import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  url: string = 'http://localhost:3000/stats';
  constructor(private _http: HttpClient) {}
  top6Strongest() {
    return this._http.get<any[]>(this.url + '/top6Strongest');
  }
  topStats() {
    return this._http.get<any[]>(this.url + '/topStats');
  }
  top5Silver() {
    return this._http.get<any[]>(this.url + '/top5Silver');
  }
  top5NumberOfPokemon() {
    return this._http.get<any[]>(this.url + '/top5NumberOfPokemon');
  }
  top5Fights() {
    return this._http.get<any[]>(this.url + '/top5Fights');
  }
  top10NewsMembers() {
    return this._http.get<any[]>(this.url + '/top10NewsMembers');
  }
}
