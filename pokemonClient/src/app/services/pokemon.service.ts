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
  token(): string {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token')!;
    } else {
      return '';
    }
  }
}
