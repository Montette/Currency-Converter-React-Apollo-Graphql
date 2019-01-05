import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import Loading from './Loading'
import styled from 'styled-components'

const StyledSelect = styled.select`
    width: 100%;
    font-size: 1.7rem;
    display: block;
    height: 100%!important;
    margin-left: 10px;
    
`;

const StyledDiv = styled.div`
    width: 40%;
    display: flex;
    align-items: center;
    margin: 0;
    
`;

const StyledLabel = styled.label`
    margin-bottom: 0;
`

const GET_RATES = gql`
    {
        currencies {
            name
            id
        }
    }
`

const Select = ({ onCurrencySelected, name, disabledAllRates, optionValue }) => (
    <Query query={GET_RATES}>
        {({ loading, error, data}) => {
            if (loading) return <Loading isFixed = {true}/>;
            if (error) return `Error! ${error.message}`;
            const options = data ? data.currencies.map(currency => (
              <option key={currency.id} value={`${currency.id}, ${currency.name}`}>
                {currency.id}, {currency.name}
              </option>
              )): '';

            return(
                <>
                <StyledDiv className='form-group'>
                    <StyledLabel htmlFor="currency">{name === 'currency'? <span>From</span> : <span>To</span>}</StyledLabel>
                    <StyledSelect className="form-control"name={name} value={optionValue} onChange={onCurrencySelected}>
                        <option>currency</option>
                        {disabledAllRates ? null : <option>All rates</option>}           
                        {options}                
                    </StyledSelect>
                    </StyledDiv>
              </>
            )
        }}
    
    </Query>
)

Select.propTypes = {
    onCurrencySelected: PropTypes.func,
    name: PropTypes.string,
    disabledAllRates: PropTypes.bool
}
export default Select
