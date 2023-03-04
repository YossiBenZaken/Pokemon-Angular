import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Starter } from '../models/Starter.model';
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  url = 'http://localhost:3000/pokemon';
  constructor(private _http: HttpClient) {}
  getStarterPokemons(world: string) {
    return this._http.get<Starter>(this.url + '/getStarterPokemon/' + world, {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  chooseStarterPokemon(body: { choose: string }) {
    return this._http.post(this.url + '/choosePokemon', body, {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  modifyOrder(body: any) {
    return this._http.post<any[]>(this.url + '/modifyOrder', body, {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  pocketPokemons() {
    return this._http.get<number>(this.url + '/pocketPokemons', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  takAwayPokemon(body: { id: number }) {
    return this._http.post<number>(this.url + '/takeAwayPokemon', body, {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  homePokemons() {
    return this._http.get<any>(this.url + '/homePokemons', {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  pickupPokemon(body: { id: number; numInBag: number }) {
    return this._http.post(this.url + '/pickupPokemon', body, {
      headers: {
        Authorization: this.token(),
      },
    });
  }
  releasePokemon(body: { id: number; wild_id: number }) {
    return this._http.post(this.url + '/release', body, {
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
