import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createSelector, Store } from '@ngrx/store';
import { IngameService } from 'src/app/services/ingame.service';
import { UserService } from 'src/app/services/user.service';
import * as userSlice from '../../slices/user-slice';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class MyTeamComponent implements OnInit {
  pokemons: any[] = [];
  constructor(
    private readonly _store: Store,
    private _user: UserService,
    private _inGame: IngameService
  ) {}
  user$ = this._store.select(
    createSelector(userSlice.selectFeature, (state) => state)
  );
  ngOnInit() {
    this._user.getUserPokemon().subscribe((pokemons) => {
      this.pokemons = pokemons.map((pokemon) => {
        if (pokemon.ei === 1 && pokemon.ei_tijd < new Date().toISOString()) {
          this._inGame.updatePokedex({
            wild_id: pokemon.wild_id,
            old_id: '',
            wat: 'egg',
          });
        }
        pokemon.naam = this.computerName(pokemon.naam, pokemon.roepnaam);
        return pokemon;
      });
    });
  }
  private computerName(value: string, nickname: string = '') {
    let newName = value;
    if (nickname !== '') newName = nickname;
    else if (newName.includes(' ')) {
      const pokemonName = newName.split(' ');
      if (pokemonName[1] === 'f') return pokemonName[0] + ' ♀️';
      else if (pokemonName[1] === 'm') return pokemonName[0] + ' ♂️';
    }
    return value;
  }
}
