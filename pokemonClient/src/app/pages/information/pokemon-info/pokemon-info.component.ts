import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InformationService } from 'src/app/services/information.service';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PokemonDetailsComponent],
})
export class PokemonInfoComponent implements OnInit {
  options: { naam: string; wild_id: number }[] = [];
  form = new FormGroup({
    pokemon: new FormControl('0'),
  });
  constructor(private _information: InformationService) {}

  ngOnInit() {
    this._information.pokemonInfo().subscribe((data) => (this.options = data));
  }
  showInfo() {
    console.log(this.form.value);
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
  get selectedPokemon() {
    return this.form.value.pokemon!;
  }
}
