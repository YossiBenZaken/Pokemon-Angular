import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { UserInfo } from 'src/app/models/UserInfo.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';
import * as userSlice from '../../../slices/user-slice';
@Component({
  selector: 'app-bringaway',
  templateUrl: './bringaway.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BringawayComponent implements OnInit {
  house: string = '';
  link: string = '';
  over: number = 0;
  user!: UserInfo;
  pokemons: any[] = [];
  constructor(
    private readonly _store: Store,
    private _pokemon: PokemonService,
    private _user: UserService
  ) {}
  ngOnInit(): void {
    this._store
      .select(createSelector(userSlice.selectFeature, (state) => state))
      .subscribe((user) => {
        this.user = user;
        switch (user.huis) {
          case 'doos':
            this.setDetails('Carboard box', 'house1.png', 2);
            break;
          case 'shuis':
            this.setDetails('Small house', 'house2.png', 20);
            break;
          case 'nhuis':
            this.setDetails('normal house', 'house3.png', 100);
            break;
          case 'villa':
          case 'Villa':
            this.setDetails('villa', 'house4.png', 500);
            break;
          case 'Hotel':
          case 'hotel':
            this.setDetails('hotel', 'house5.png', 900);
            break;
        }
        this._user
          .getUserPokemon()
          .subscribe((pokemons) => (this.pokemons = pokemons));
      });
  }

  setDetails(house: string, link: string, over: number) {
    this._pokemon.homePokemons().subscribe((inhouse) => {
      this.house = house;
      this.link = link;
      this.over = over - inhouse;
    });
  }
}
