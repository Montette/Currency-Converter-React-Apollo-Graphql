import React from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from 'prop-types';
import Loading from './Loading'
import styled from 'styled-components';

const StyledDiv = styled.div `
    text-align: center;
    padding-top: 40px;
    font-size: 1.7rem;
`

const GET_RATE = gql `
    query rate($firstCurrency: String!, $secondCurrency: String!) {
        rate(currency: $firstCurrency, secondCurrency: $secondCurrency) {
            currency
            rate
            name
        }
    }
`

const Rate = ({firstCurrency, secondCurrency, countRate, amount}) => (
    <Query
        query={GET_RATE}
        variables={{
        firstCurrency: firstCurrency.id,
        secondCurrency: secondCurrency.id
    }}>
        {({loading, error, data}) => {
            if (loading) 
                return <Loading isFixed={false}/>
            if (error) 
                return <p>Error: {error.message}</p>
            return data
                .rate
                .map(({
                    currency,
                    rate,
                    name
                }, i) => (
                    <StyledDiv key={i}>
                        <p>
                            <span className="font-weight-bold">{amount}{firstCurrency.name}
                            </span>
                            is equal to
                            <span className="font-weight-bold">{countRate(rate)}{secondCurrency.name}</span>
                        </p>
                        <p>Exchange Rate 1
                            <span className="font-weight-bold">{firstCurrency.id}</span>
                            =
                            <span className="font-weight-bold">{rate}{secondCurrency.id}</span>
                        </p>
                    </StyledDiv>
                ))
        }
}
    </Query>
);

Rate.propTypes = {
    firstCurrency: PropTypes.object,
    secondCurrency: PropTypes.object,
    countRate: PropTypes.func
}

export default Rate
