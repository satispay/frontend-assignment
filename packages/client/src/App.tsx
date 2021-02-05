import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import PokeTableWrapper from './components/PokeTableWrapper';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Interactive Pokédex</h1>
        <PokeTableWrapper />
      </div>
    </ApolloProvider>
  );
}

export default App;
