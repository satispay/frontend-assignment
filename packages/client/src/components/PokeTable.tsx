import React from 'react';
import { ApolloError } from 'apollo-boost';
import { Alert, Spin, Table } from 'antd';
import { Pokemon } from '../Types';
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

  if (loading) return <Spin tip='Loading...' />;
  if (error)
    return (
      <Alert message='Something went wrong... Please try again' type='error' />
    );

  return <Table dataSource={pokemons} columns={columns} pagination={false} />;
}

export default PokeTable;
