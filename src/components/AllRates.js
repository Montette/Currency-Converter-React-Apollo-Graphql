import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import Loading from './Loading'

const GET_RATES = gql`
    query rates($currency: String!) {
        rates(currency: $currency) {
            currency
            rate
            name
        }
    }
`

 const AllRates = ({ selectedCurrency }) => (
     
    <Query query={GET_RATES} variables={{currency: selectedCurrency.id}}>
        {({ loading, error, data }) => {
            if (loading) return <Loading isFixed = {false}/>
            if (error) return <p>Error: {error.message}</p>
            const rates = data.rates.map(( { currency, rate, name }, i ) => (        
                    <li key={i}>{currency} ({name}): {rate}</li>        
            ))
            return (
                    <div>
                        <p>All rates for {selectedCurrency.name}</p>
                        <ul>
                            {rates}
                        </ul>
                    </div>
                )
            }

        }
    </Query>
)

AllRates.propTypes = {
    selectedCurrency: PropTypes.object
}
export default AllRates
