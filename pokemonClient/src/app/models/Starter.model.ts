export interface Starter {
  starter: PokemonDetails[];
  normal: PokemonDetails[];
  babies: PokemonDetails[];
}
interface PokemonDetails {
  wild_id: number;
  naam: string;
  type1: string;
  type2: string;
}
