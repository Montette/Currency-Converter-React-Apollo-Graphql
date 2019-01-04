import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { client } from './index'
import ExchangeRates from './ExchangeRates'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
         <ExchangeRates />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
