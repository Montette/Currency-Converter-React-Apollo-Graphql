import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloProvider } from 'react-apollo';

import { client } from './index';
import AllRates from './components/AllRates';
import Rate from './components/Rate';
import Select from './components/Select';
import Input from './components/Input'
import Page from './components/Page';
import Loading from './components/Loading';
import styled from 'styled-components';
import arrows from './images/exchange-arrows.svg'


const SelectsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledArrowsImg = styled.img`
  max-width: 80px;
  height: 40px;
`

class App extends Component {

  state = {
    selectedCurrency: {
      id: 'currency',
      name: ''
    },
    secondSelectedCurrency: {
      id: 'currency',
      name: ''
    },
    allRates: false,
    amount: '1.00',
  }
  onCurrencySelected = ({ target }) => {
    const currency = target.value.split(',');
    const key = target.name === 'currency' ? 'selectedCurrency' : 'secondSelectedCurrency';
    const isAllRates = key === 'selectedCurrency' && this.state.allRates;
    this.setState(() => ({
      ...this.state,
      [key] : {
        id: currency[0],
        name: currency[1],
      },
      allRates: isAllRates
    }));

    if (currency[0] === 'All rates') {
      this.setState(() => ({
        ...this.state,
        allRates: true
      }))
    };

  
  }

  handleChangeValue = ({ target }) => {
    this.setState(() => ({
      ...this.state,
      amount: target.value
    }))
  }

  countRateHandler = (rate) => {
    return Number(rate) * Number(this.state.amount)
  }
  render() {
    
    return (
      <ApolloProvider client={client}>
        <Page>
          <StyledForm>
        <Input value={this.state.amount} onChangeValue={this.handleChangeValue}/>
        <SelectsContainer>
        <Select 
          onCurrencySelected = {this.onCurrencySelected} 
          name="currency" 
          disabledAllRates = {true}
          optionValue={`${this.state.selectedCurrency.id},${this.state.selectedCurrency.name}`}
        />
        <StyledArrowsImg src={arrows} alt=''/>
        <Select 
          onCurrencySelected = {this.onCurrencySelected} 
          name="secondCurrency"
          disabledAllRates = {false} 
          optionValue={`${this.state.secondSelectedCurrency.id},${this.state.secondSelectedCurrency.name}`}
        />
        </SelectsContainer>
        </StyledForm>
         {this.state.allRates !== false && this.state.selectedCurrency.id !== 'currency' && 
          <AllRates 
          selectedCurrency={this.state.selectedCurrency}
          />
         }

         {this.state.allRates === false && this.state.selectedCurrency.id !== 'currency' && this.state.secondSelectedCurrency.id !== 'currency' && 
          <Rate firstCurrency={this.state.selectedCurrency} 
          secondCurrency= {this.state.secondSelectedCurrency} 
          countRate={this.countRateHandler}
          amount={this.state.amount}
          />
         } 

        </Page>
      </ApolloProvider >
    );
  }
}

export default App;
