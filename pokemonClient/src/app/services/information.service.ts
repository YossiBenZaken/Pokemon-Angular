import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  url: string = 'http://localhost:3000/info';
  constructor(private _http: HttpClient) {}
  pokemonInfo() {
    return this._http.get<{ naam: string; wild_id: number }[]>(
      this.url + '/pokemonInfo'
    );
  }
  pokemonDetails(wild_id: string) {
    return this._http.get<PokemonDetailsResponse>(
      this.url + '/pokemonDetails/' + wild_id
    );
  }
}

export interface PokemonDetailsResponse {
  pokemonDetails: PokemonDetails[];
  levels: Levels[];
}
export interface PokemonDetails {
  wild_id: number;
  naam: string;
  zeldzaamheid: number;
  type1: string;
  type2: string;
  gebied: string;
  wereld: string;
  hoeveelingame: number;
}
export interface Levels {
  id: number;
  level: number;
  stone: string;
  trade: number;
  wild_id: number;
  wat: string;
  nieuw_id: number;
  aanval: string;
}
