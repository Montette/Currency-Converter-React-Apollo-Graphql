import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';
import { client } from './index'
import ExchangeRates from './components/ExchangeRates'
import Rate from './components/Rate'
import Select from './components/Select'

class App extends Component {

  state = {
    selectedCurrency: null,
    secondSelectedCurrency: null
  }
  onCurrencySelected = ({ target }) => {
    const currency = target.value.split(',');
    target.name === 'currency' ?
    this.setState(() => ({ 
      ...this.state,
      selectedCurrency: {
        id: currency[0],
        name: currency[1]
      }
    }))
    : 
    this.setState(() => ({
      ...this.state,
      secondSelectedCurrency: {
      id:  currency[0],
      name: currency[1]
      }
    }))
  
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
        <Select onCurrencySelected = {this.onCurrencySelected} name="currency"/>
        <Select onCurrencySelected = {this.onCurrencySelected} name="secondCurrency"/>
         {this.state.selectedCurrency !== null && <ExchangeRates currency={this.state.selectedCurrency}/>}
         {this.state.secondSelectedCurrency !== null && <p>second currency</p>}
         {this.state.secondSelectedCurrency !== null && <Rate firstCurrency={this.state.selectedCurrency} secondCurrency= {this.state.secondSelectedCurrency}/>}
        </div>
      </ApolloProvider >
    );
  }
}

export default App;
