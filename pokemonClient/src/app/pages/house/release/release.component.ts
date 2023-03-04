import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ReleaseComponent implements OnInit {
  pokemons: any[] = [];
  pokemonInHouse: any[] = [];
  constructor(private _user: UserService, private _pokemon: PokemonService) {}

  ngOnInit(): void {
    this._user.getUserPokemon().subscribe((p) => (this.pokemons = p));
    this._pokemon
      .homePokemons()
      .subscribe((p) => (this.pokemonInHouse = p.poke));
  }
  release({ id, wild_id }: { id: number; wild_id: number }): void {
    this._pokemon.releasePokemon({ id, wild_id }).subscribe(() => {
      this.pokemonInHouse = this.pokemonInHouse.filter((p) => p.id != id);
      this.pokemons = this.pokemons.filter((p) => p.id != id);
    });
  }
}
