import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { createSelector, Store } from '@ngrx/store';
import { UserInfo } from 'src/app/models/UserInfo.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';
import * as userSlice from '../../../slices/user-slice';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class PickupComponent implements OnInit {
  house: string = '';
  link: string = '';
  over: number = 0;
  user!: UserInfo;
  pokemons: any[] = [];
  pokemonInBag: number = 0;
  constructor(
    private readonly _store: Store,
    private _pokemon: PokemonService,
    private _user: UserService
  ) {}

  ngOnInit() {
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
          .subscribe((pokemons) => (this.pokemonInBag = pokemons.length));
      });
  }
  setDetails(house: string, link: string, over: number) {
    this._pokemon.homePokemons().subscribe((inhouse) => {
      this.house = house;
      this.link = link;
      this.over = over - inhouse.count;
      this.pokemons = inhouse.poke;
    });
  }
  pickupPokemon(id: number) {
    this._pokemon
      .pickupPokemon({ id, numInBag: this.pokemonInBag + 1 })
      .subscribe(() => {
        this.over += 1;
        this.pokemonInBag += 1;
        this.pokemons = this.pokemons.filter((p) => p.id != id);
      });
  }
}
