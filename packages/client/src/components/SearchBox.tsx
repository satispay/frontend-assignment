import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery } from '@apollo/react-hooks';

const searchPokeName = gql`
  query searchPokeNameQuery($q: String!) {
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

function SearchBox() {
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [executeSearch, { data }] = useLazyQuery(searchPokeName);

  console.log(searchFilter);

  return (
    <>
      <div>
        <input type='text' onChange={(e) => setSearchFilter(e.target.value)} />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter },
            })
          }
        >
          Search
        </button>
      </div>
    </>
  );
}

export default SearchBox;
