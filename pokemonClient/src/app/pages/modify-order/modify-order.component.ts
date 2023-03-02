import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-modify-order',
  templateUrl: './modify-order.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ModifyOrderComponent implements OnInit {
  pokemons: any[] = [];
  constructor(private _pokemon: PokemonService) {}

  ngOnInit() {
    this._pokemon
      .modifyOrder({})
      .subscribe((pokemon: any[]) => (this.pokemons = pokemon));
  }
  changeOrder(wat: string, teller: number, pokemonid: string) {
    this._pokemon
      .modifyOrder({ wat, teller, pokemonid })
      .subscribe((pokemon: any[]) => (this.pokemons = pokemon));
  }
}
