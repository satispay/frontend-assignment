import { gql } from 'apollo-boost';

export const SEARCH_NAME_QUERY = gql`
  query SearchNameQuery($q: String, $after: ID) {
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

export const FILTER_TYPE_QUERY = gql`
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
