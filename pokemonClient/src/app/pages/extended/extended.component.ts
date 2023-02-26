import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-extended',
  templateUrl: './extended.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ExtendedComponent implements OnInit {
  pokemons: any[] = [];
  constructor(private _user: UserService) {}

  ngOnInit() {
    this._user
      .getAllUserPokemon()
      .subscribe((pokemons) => (this.pokemons = pokemons));
  }
  showAttack(pokemon: any) {
    let str = pokemon.aanval_1;
    if (pokemon.aanval_2 !== '') str += ' | ' + pokemon.aanval_2;
    if (pokemon.aanval_3 !== '') str += ' | ' + pokemon.aanval_3;
    if (pokemon.aanval_4 !== '') str += ' | ' + pokemon.aanval_4;
    return str;
  }
  lifePercent(pokemon: any) {
    if (pokemon.leven > 0) {
      return Math.round((pokemon.leven / pokemon.levenmax) * 100);
    }
    return 0;
  }
  expPercent(pokemon: any) {
    if (pokemon.expnodig > 0) {
      return Math.round((pokemon.exp / pokemon.expnodig) * 100);
    }
    return 0;
  }
}
