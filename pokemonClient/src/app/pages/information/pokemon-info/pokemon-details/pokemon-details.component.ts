import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  InformationService,
  Levels,
  PokemonDetails,
  PokemonDetailsResponse,
} from 'src/app/services/information.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class PokemonDetailsComponent implements OnChanges {
  @Input() pokemonId: string = '0';
  @Input() pokemons: { naam: string; wild_id: number }[] = [];
  levels: Levels[] = [];
  pokemonDetails!: PokemonDetails;
  constructor(private _information: InformationService) {}

  ngOnChanges() {
    if (this.pokemonId !== '0') {
      this._information
        .pokemonDetails(this.pokemonId)
        .subscribe((pokemonDetails: PokemonDetailsResponse) => {
          this.levels = pokemonDetails.levels;
          this.pokemonDetails = pokemonDetails.pokemonDetails[0];
        });
    }
  }
  normalSrc() {
    return `../../../../../assets/images/pokemon/${this.pokemonId}.gif`;
  }
  shinySrc() {
    return `../../../../../assets/images/shiny/${this.pokemonId}.gif`;
  }
  checkRare() {
    return this.pokemonDetails.zeldzaamheid === 1
      ? 'common'
      : this.pokemonDetails.zeldzaamheid === 2
      ? 'a little rare'
      : 'very rare';
  }
  getArea() {
    if (this.pokemonDetails.gebied !== '') {
      return this.pokemonDetails.gebied + ' is his favorite spot.';
    }
    return 'Does not have a favorite spot.';
  }
  iconSrc(wild_id: number) {
    return `../../../../../assets/images/pokemon/icon/${wild_id}.gif`;
  }
  nameOfEvo(wild_id: number) {
    return this.pokemons.filter((e) => e.wild_id === wild_id)[0].naam;
  }
  stoneSrc(stone: string) {
    return `../../../../../assets/images/items/${stone}.png`;
  }
  megaStone(event: any, stone: string) {
    return (event.target.src = `../../../../../assets/images/megastones/${stone}.png`);
  }
}
