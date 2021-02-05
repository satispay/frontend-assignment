import React, { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import PokeTable from './PokeTable';
import { PokemonEdge } from '../Types';
import { SEARCH_NAME_QUERY } from '../Queries';

function FilterByName() {
  const [searchText, setSearchText] = useState<string>('');
  const { loading, error, data, fetchMore } = useQuery(SEARCH_NAME_QUERY, {
    variables: { q: searchText },
  });

  // Using a variable to conditionally render Show More button because with state I get error:
  // Too many re-renders. React limits the number of renders to prevent an infinite loop.”
  let isMore: boolean = true;

  let pokemon;
  if (loading === false) {
    if (data.pokemons.pageInfo.hasNextPage === false) {
      isMore = false;
    }
    pokemon = data.pokemons.edges.map((edge: PokemonEdge) => {
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
      <Input
        type='text'
        placeholder='Search Pokémon by name...'
        style={{ width: 300 }}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchText(event.target.value)
        }
      />
      <div className='PokeTable'>
        <PokeTable pokemons={pokemon} error={error} loading={loading} />
      </div>
      {isMore && <Button onClick={handleLoadMore}>Show More</Button>}
    </>
  );
}

export default FilterByName;
