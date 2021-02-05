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
    variables: { type: typeFilter },
  });

  // Using a variable to conditionally render Show More button because with state I get error:
  // Too many re-renders. React limits the number of renders to prevent an infinite loop.”
  let isMore: boolean = false;

  let pokemon;
  if (loading === false) {
    if (data.pokemonsByType.pageInfo.hasNextPage) {
      isMore = true;
    }

    pokemon = data.pokemonsByType.edges.map((edge: PokemonEdge) => {
      return {
        key: edge.node.id,
        name: edge.node.name,
        types: edge.node.types,
        classification: edge.node.classification,
      };
    });
  }

  function handleTypeSelect(selectedValue: string) {
    setTypeFilter(selectedValue);
  }

  const handleLoadMore = () => {
    const { endCursor } = data.pokemonsByType.pageInfo;

    fetchMore({
      variables: { after: endCursor },
      updateQuery: (prevResult: any, { fetchMoreResult }) => {
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
      {isMore && <Button onClick={handleLoadMore}>Show More</Button>}
    </>
  );
}

export default FilterByType;
