import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { UserService } from 'src/app/services/user.service';
import * as userSlice from '../../slices/user-slice';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class MyTeamComponent implements OnInit {
  pokemons: any[] = [];
  constructor(private _store: Store, private _user: UserService) {}
  user$ = this._store.select(
    createSelector(userSlice.selectFeature, (state) => state)
  );
  ngOnInit() {
    this._user
      .getUserPokemon()
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }
  computerName(value: string) {
    let newName = value;
    if (newName.includes(' ')) {
      const pokemonName = newName.split(' ');
      if (pokemonName[1] === 'f') return pokemonName[0] + ' ♀️';
      else if (pokemonName[1] === 'm') return pokemonName[0] + ' ♂️';
    }
    return value;
  }
}
