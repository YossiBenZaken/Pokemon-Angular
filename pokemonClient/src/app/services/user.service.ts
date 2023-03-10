import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfo } from '../models/UserInfo.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000';
  constructor(private _http: HttpClient) {}
  getUserInfo() {
    return this._http.get<UserInfo>(this.url + '/getUserInfo', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  getUserPokemon() {
    return this._http.get<any[]>(this.url + '/getUserPokemon', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  getAllUserPokemon() {
    return this._http.get<any[]>(this.url + '/getAllUserPokemon', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  getUserBuddies() {
    return this._http.get<{
      requested: any[];
      myfriends: any[];
    }>(this.url + '/getUserBuddies', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  getUserItems() {
    return this._http.get<any[]>(this.url + '/getUserItems', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  getUserBadges() {
    return this._http.get<any>(this.url + '/getUserBadges', {
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
