import React from 'react';
import { gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { Table } from 'antd';

type PokemonEdge = {
    node: Pokemon;
}
  
type Pokemon = {
    id: string;
    name: string;
    types: Array<string>;
    classification: string;
}

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

function PokeTable() {
    const { loading, error, data } = useQuery(getPokemonQuery);
    let result;
    if (loading === false) {
        result = data.pokemons.edges.map((edge: PokemonEdge) => {
        return { key: edge.node.id, name: edge.node.name, types: edge.node.types, classification: edge.node.classification }
      });
    }


    const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
{
      title: 'Type',
      dataIndex: 'types',
      key: 'types',
      render: (types: Array<string>) => (
        <>
          {types.map((type: string) => {
            return type + ' '
          })}
        </>
      ),
    },
    {
      title: 'Classification',
      dataIndex: 'classification',
      key: 'classification',
    },
    ];
 
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Something went wrong</p>

  return (
      <Table dataSource={result} columns={columns} />
    )
}




export default PokeTable; 