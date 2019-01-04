const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");
const _ = require("lodash");



const typeDefs = `
  type Query {
    rates(currency: String!): [ExchangeRate]
    rate(currency: String!, secondCurrency: String!): [ExchangeRate]
    currencies: [Currency]!
  }

	type ExchangeRate {
		currency: String
		rate: String
		name: String
    }

  type Currency {
    id: String!
    name: String!
    min_size: String!
  }
`;


const resolvers = {
  Query: {
    rates: async (root, { currency }) => {
      try {
        const results = await fetch(
          `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
        );
        const exchangeRates = await results.json();

        return _.map(exchangeRates.data.rates, (rate, currency) => ({
          currency,
          rate
        }));
      } catch (e) {
        console.error(e);
      }
    },

    rate: async (root, { currency, secondCurrency }) => {
      try {
        const result = await fetch(
          `https://api.coinbase.com/v2/exchange-rates?currency=${currency}`
        );
  
        const exchangeRates = await result.json();
  
        const currencies = _.map(exchangeRates.data.rates, (rate, currency) => ({
          currency,
          rate
        }));
  
        return currencies.filter(singleCurrency => singleCurrency.currency === secondCurrency)
      } catch (e) {
        console.error(e);
      }
    },

    currencies: async () => {
      try {
        const result = await fetch(
          `https://api.coinbase.com/v2/currencies`
        );
  
        const exchangeRates = await result.json();
  
        // const currencies = _.map(exchangeRates.data.rates, (rate, currency) => ({
        //   currency,
        //   rate
        // }));
  
        return exchangeRates.data;

      } catch (e) {
        console.error(e);
      }
    }

  },
  ExchangeRate: {
    name: async ({ currency }) => {
      try {
        const results = await fetch("https://api.coinbase.com/v2/currencies");
        const currencyData = await results.json();

        const currencyInfo = currencyData.data.find(
          c => c.id.toUpperCase() === currency
        );
        return currencyInfo ? currencyInfo.name : null;
      } catch (e) {
        console.error(e);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
