import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

// const GET_RATES = gql`
//     {
//         rates($currency: String!) {
//             currency
//             rate
//         }
//     }
// `

const GET_RATES = gql`
    query rates($currency: String!) {
        rates(currency: $currency) {
            currency
            rate
            name
        }
    }
`

 const ExchangeRates = (props) => (
     
    <Query query={GET_RATES} variables={{currency: props.currency.id}}>
        {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error: {error.message}</p>
            const rates = data.rates.map(( { currency, rate, name }, i ) => (
                
                    <li key={i}>{currency} ({name}): {rate}</li>
               
            ))
            // return data.rates.map(( { currency, rate }, i ) => (
            //     <div key={i}>
            //         <p>{currency}: {rate}</p>
            //     </div>
            // ))
            return (
                <div>
                    <p>All rates for {props.currency.name}</p>
                    <ul>
                        {rates}
                    </ul>
                </div>
            )


            }

        }
    </Query>
)

export default ExchangeRates
