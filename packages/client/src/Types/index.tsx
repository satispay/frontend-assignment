export type PokemonEdge = {
  node: Pokemon;
};

export type Pokemon = {
  id: string;
  name: string;
  types: Array<string>;
  classification: string;
};
