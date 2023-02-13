import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { createSelector, Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Starter } from 'src/app/models/Starter.model';
import { PokemonService } from 'src/app/services/pokemon.service';
import * as userSlice from '../../slices/user-slice';
@Component({
  selector: 'app-choose-pokemon',
  templateUrl: './choose-pokemon.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ChoosePokemonComponent implements OnInit {
  whoCheck: string[] = [
    '1',
    '4',
    '7',
    '152',
    '155',
    '158',
    '252',
    '255',
    '258',
    '387',
    '390',
    '393',
    '495',
    '498',
    '501',
    '16',
    '43',
    '74',
    '179',
    '194',
    '216',
    '270',
    '304',
    '363',
    '396',
    '403',
    '449',
    '535',
    '551',
    '610',
    '172',
    '173',
    '174',
    '175',
    '236',
    '238',
    '239',
    '240',
    '298',
    '360',
    '406',
    '433',
    '438',
    '439',
    '440',
    '446',
    '447',
    '458',
    '659',
    '662',
    '665',
  ];
  $user = this._store.select(
    createSelector(userSlice.selectFeature, (state) => state)
  );
  pokemons: Starter = {
    babies: [],
    normal: [],
    starter: [],
  };
  form = new FormGroup({
    choose: new FormControl('', Validators.required),
  });
  constructor(private _pokemon: PokemonService, private _store: Store<{}>) {}

  ngOnInit() {
    this.$user
      .pipe(switchMap((user) => this._pokemon.getStarterPokemons(user.wereld)))
      .subscribe((value) => {
        console.log(value);
        this.pokemons = value;
      });
  }
  onSubmit() {
    const { choose } = this.form.value;
    if (choose && this.whoCheck.includes(choose.toString())) {
      let body = {
        choose,
      };
      this._pokemon.chooseStarterPokemon(body).subscribe((data) => {
        console.log(data);
      });
    } else {
      alert('No Pokemon');
    }
  }
  get f() {
    return this.form.controls;
  }
}
