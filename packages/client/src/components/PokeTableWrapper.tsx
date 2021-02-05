import React, { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import PokeTable from './PokeTable';
import FilterType from './FilterType';

type PokemonEdge = {
  node: Pokemon;
};

type Pokemon = {
  id: string;
  name: string;
  types: Array<string>;
  classification: string;
};

const GET_POKEMON_QUERY = gql`
  query GetPokemonQuery($q: String, $after: ID) {
    pokemons(q: $q, after: $after) {
      edges {
        node {
          name
          types
          id
          classification
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

function PokeTableWrapper() {
  const [searchText, setSearchText] = useState<string>('');
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMON_QUERY, {
    variables: { after: '000', q: searchText },
  });
  let result;
  if (loading === false) {
    result = data.pokemons.edges.map((edge: PokemonEdge) => {
      return {
        key: edge.node.id,
        name: edge.node.name,
        types: edge.node.types,
        classification: edge.node.classification,
      };
    });
  }

  const handleLoadMore = () => {
    const { endCursor, hasNextPage } = data.pokemons.pageInfo;

    fetchMore({
      variables: { after: endCursor, hasNextPage },
      updateQuery: (prevResult: any, { fetchMoreResult }) => {
        // Return nothing when there are no more pokemons after current ones
        if (hasNextPage === false) return;
        fetchMoreResult.pokemons.edges = [
          ...prevResult.pokemons.edges,
          ...fetchMoreResult.pokemons.edges,
        ];
        return fetchMoreResult;
      },
    });
  };

  return (
    <>
      <FilterType />
      <Input
        type='text'
        placeholder='Search Pokémon by name...'
        style={{ width: 300 }}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchText(event.target.value)
        }
      />
      <div className='PokeTable'>
        <PokeTable pokemons={result} error={error} loading={loading} />
      </div>
      <Button onClick={handleLoadMore}>Next 10 Pokémon</Button>
    </>
  );
}

export default PokeTableWrapper;
