import React from 'react';
import PokeTable from './PokeTable';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

type PokemonEdge = {
    node: Pokemon;
  }
  
  type Pokemon = {
    id: string;
    name: string;
    types: Array<string>;
    classification: string;
  }
  
  const getPokemonQuery = gql`
      {
        pokemons(q:"${'a'}"){ 
        edges {
          node {
            name
            types
            id
            classification
          }
        }
        pageInfo{
          hasNextPage
          endCursor
        }
      }}
      `

function PokeTableWrapper() {
    const { loading, error, data } = useQuery(getPokemonQuery);
    let result;
    if (loading === false) {
      result = data.pokemons.edges.map((edge: PokemonEdge) => {
    return { key: edge.node.id, name: edge.node.name, types: edge.node.types, classification: edge.node.classification }
  });
}

  return <>
        <div className="PokeTable">
          <PokeTable pokemons={result} error={error} loading={loading} />
        </div>
  </>;
}

export default PokeTableWrapper;