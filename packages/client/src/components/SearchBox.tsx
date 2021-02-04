import React, { ChangeEvent, useState } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

const SEARCH_NAME_QUERY = gql`
  query SearchNameQuery($q: String!) {
    pokemons(q: $q) {
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
type PokemonEdge = {
  node: Pokemon;
};

type Pokemon = {
  id: string;
  name: string;
  types: Array<string>;
  classification: string;
};

function SearchBox() {
  const [searchText, setSearchText] = useState<string>('');
  // const [executeSearch, { loading, data }] = useLazyQuery(SEARCH_NAME_QUERY);
  const { loading, data } = useQuery(SEARCH_NAME_QUERY, {
    variables: { q: searchText },
  });

  return (
    <>
      <div>
        <input
          type='text'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setSearchText(event.target.value)
          }
        />
        {/* <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchText },
            })
          }
        >
          Search
        </button> */}
      </div>
      {data &&
        data.pokemons.edges.map((edge: PokemonEdge) => (
          <li key={edge.node.id}>{edge.node.name}</li>
        ))}
    </>
  );
}

export default SearchBox;
