import React from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Typography } from 'antd';

const { Title } = Typography;

function App() {

  const client = new ApolloClient({
    uri: 'http://localhost:4000'
  })

  return (
    <ApolloProvider client={client} >
      <div className="App">
       <Title>Interactive Pokédex</Title>
      </div>
    </ApolloProvider>
  );
}

export default App;
