import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import FilterWrapper from './components/FilterWrapper';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Interactive Pokédex</h1>
        <h2>Have fun finding your Pokémon!</h2>
        <FilterWrapper />
      </div>
    </ApolloProvider>
  );
}

export default App;
