import React from 'react';
import { ApolloError } from 'apollo-boost';
import { Table } from 'antd';

type Pokemon = {
  id: string;
  name: string;
  types: Array<string>;
  classification: string;
};
interface PokeTableProps {
  pokemons: Array<Pokemon>;
  loading: boolean;
  error: ApolloError | undefined;
}

function PokeTable({ pokemons, loading, error }: PokeTableProps) {
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
            return type + ' ';
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return <Table dataSource={pokemons} columns={columns} pagination={false} />;
}

export default PokeTable;
