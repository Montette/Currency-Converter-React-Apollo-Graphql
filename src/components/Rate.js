import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";



const GET_RATE = gql`
    query rate($firstCurrency: String!, $secondCurrency: String!) {
        rate(currency: $firstCurrency, secondCurrency: $secondCurrency) {
            currency
            rate
            name
        }
    }
`

 const Rate = ({ firstCurrency, secondCurrency }) => (
    <Query query={GET_RATE} variables={{ firstCurrency: firstCurrency.id, secondCurrency: secondCurrency.id }}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>

            return data.rate.map(( { currency, rate, name }, i ) => (
                <div key={i}>
                    <div>
                        <p>{firstCurrency.id}</p>
                        <p>{currency}</p>
                        <p>{rate}</p>
                        <p>{name}</p>
                </div>
                </div>
            ))

      
            }

        }
    </Query>
)

export default Rate
