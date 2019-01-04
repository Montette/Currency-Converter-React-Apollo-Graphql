const { ApolloServer, gql } = require("apollo-server");
const fetch = require("node-fetch");
const _ = require("lodash");

const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];

const typeDefs = `
  type Query {
    rates(currency: String!): [ExchangeRate]
    books: [Book]!
  }

	type ExchangeRate {
		currency: String
		rate: String
		name: String
    }
    
    type Book {
        title: String!
        author: String!
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
    books: () => books,
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
