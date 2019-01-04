import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";


const GET_RATES = gql`
    {
        currencies {
            name
            id
        }
    }
`

const Select = ({ onCurrencySelected, name }) => (
    <Query query={GET_RATES}>
        {({ loading, error, data}) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            const options = data.currencies.map(currency => (
            
              <option key={currency.id} value={`${currency.id}, ${currency.name}`}>
                {currency.id}
              </option>
              ));
            return(
                <>
                 <label htmlFor="currency">Choose </label>
                <select name={name} onChange={onCurrencySelected}>
                {/* {data.currencies.map(currency => (
                    <>
                  <option key={currency.id} value={`${currency.id}, ${currency.name}`}>
                    {currency.id}
                  </option>
                  </>
                ))} */}
                {options}
                <option selected>currency</option>
              </select>
              </>
            )
        }}
    
    </Query>
)

export default Select
