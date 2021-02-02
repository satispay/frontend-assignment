import React from 'react';
import { gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';


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

  type PokemonEdge = {
    node: Pokemon;
  }
  
  type Pokemon = {
    classification: string;
    id: string;
    name: string;
    types: Array<string>;
  }


function PokeList() {
    
    const { loading, error, data } = useQuery(getPokemonQuery);
    console.log(data);
    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

    return data.pokemons.edges.map((edge: PokemonEdge) => {
        return (
            <li key={edge.node.id}>{edge.node.name}</li>
        )
    })
}




export default PokeList; 