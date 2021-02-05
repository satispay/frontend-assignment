import React, { useState } from 'react';
import { Select } from 'antd';
import { pokeTypes } from '../constants/index';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const { Option } = Select;

type PokemonEdge = {
  node: Pokemon;
};

type Pokemon = {
  id: string;
  name: string;
  types: Array<string>;
  classification: string;
};

const FILTER_TYPE_QUERY = gql`
  query FilterTypeQuery($type: String!, $after: ID) {
    pokemonsByType(type: $type, after: $after) {
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

function FilterType() {
  const [typeFilter, setTypeFilter] = useState<string>('Normal');

  const { data } = useQuery(FILTER_TYPE_QUERY, {
    variables: { type: typeFilter, after: '000' },
  });

  // const [executeSearch, { data }] = useLazyQuery(FILTER_TYPE_QUERY);

  function handleTypeSelect(event: string) {
    console.log(`selected ${event}`);
    setTypeFilter(event);
  }

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
      {data &&
        data.pokemonsByType.edges.map((edge: PokemonEdge) => (
          <li key={edge.node.id}>{edge.node.name}</li>
        ))}
    </>
  );
}

export default FilterType;
