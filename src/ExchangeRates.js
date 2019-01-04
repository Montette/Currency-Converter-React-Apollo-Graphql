import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

 const ExchangeRates = () => (
    <Query 
        query={gql`
            {
                rates(currency: "USD") {
                    currency
                    rate
                }
            }
        `}
    >
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>

            return data.rates.map(( { currency, rate }, i ) => (
                <div key={i}>
                    <p>{currency}: {rate}</p>
                </div>
            ))
        }

        }
    </Query>
)

export default ExchangeRates
