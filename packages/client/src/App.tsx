import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Typography } from 'antd';
import PokeTable from './components/PokeTable';


const { Title } = Typography;

function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000'
  })

  return (
    <ApolloProvider client={client} >
      <div className="App">
        <Title>Interactive Pokédex</Title>
        <div className="PokeTable" >
          <PokeTable />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
