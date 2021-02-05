import React, { useState } from 'react';
import { Button, Select } from 'antd';
import { useQuery } from '@apollo/react-hooks';
import PokeTable from './PokeTable';
import { pokeTypes } from '../constants';
import { PokemonEdge } from '../Types';
import { FILTER_TYPE_QUERY } from '../Queries';

const { Option } = Select;

function FilterByType() {
  const [typeFilter, setTypeFilter] = useState<string>('Normal');

  const { loading, error, data, fetchMore } = useQuery(FILTER_TYPE_QUERY, {
    variables: { type: typeFilter, after: '000' },
  });

  let pokemon;
  if (loading === false) {
    pokemon = data.pokemonsByType.edges.map((edge: PokemonEdge) => {
      return {
        key: edge.node.id,
        name: edge.node.name,
        types: edge.node.types,
        classification: edge.node.classification,
      };
    });
  }

  function handleTypeSelect(event: string) {
    setTypeFilter(event);
  }

  const handleLoadMore = () => {
    const { endCursor, hasNextPage } = data.pokemonsByType.pageInfo;

    fetchMore({
      variables: { after: endCursor, hasNextPage },
      updateQuery: (prevResult: any, { fetchMoreResult }) => {
        // Return nothing when there are no more pokemons after current ones
        if (hasNextPage === false) return;
        fetchMoreResult.pokemonsByType.edges = [
          ...prevResult.pokemonsByType.edges,
          ...fetchMoreResult.pokemonsByType.edges,
        ];
        return fetchMoreResult;
      },
    });
  };

  return (
    <>
      <Select
        defaultValue='Normal'
        style={{ width: 120 }}
        onChange={handleTypeSelect}
      >
        {pokeTypes.map((pokeType) => (
          <Option key={pokeType} value={pokeType}>
            {pokeType}
          </Option>
        ))}
      </Select>
      <div className='PokeTable'>
        <PokeTable pokemons={pokemon} error={error} loading={loading} />
      </div>
      <Button onClick={handleLoadMore}>Next Pokémon</Button>
    </>
  );
}

export default FilterByType;
