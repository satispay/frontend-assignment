import React from 'react';
import { Button } from 'antd';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import PokeTable from './PokeTable';

type PokemonEdge = {
  node: Pokemon;
};

type Pokemon = {
  id: string;
  name: string;
  types: Array<string>;
  classification: string;
};

const getPokemonQuery = gql`
  query pokeQuery($after: ID) {
    pokemons(after: $after) {
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
  const { loading, error, data, fetchMore } = useQuery(getPokemonQuery, {
    variables: { after: '000' },
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

  return (
    <>
      <div className='PokeTable'>
        <PokeTable pokemons={result} error={error} loading={loading} />
        <Button
          onClick={() => {
            const { endCursor } = data.pokemons.pageInfo;

            fetchMore({
              variables: { after: endCursor },
              updateQuery: (prevResult: any, { fetchMoreResult }) => {
                // Return nothing when there are no more pokemons after current ones
                if (!fetchMoreResult) return;
                fetchMoreResult.pokemons.edges = [
                  ...prevResult.pokemons.edges,
                  ...fetchMoreResult.pokemons.edges,
                ];
                return fetchMoreResult;
              },
            });
          }}
        >
          Load More
        </Button>
      </div>
    </>
  );
}

export default PokeTableWrapper;
