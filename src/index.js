import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import gql from "graphql-tag";


const client = new ApolloClient({
    uri: "http://localhost:4000/"
})

// client.query({
//     query: gql`
//     {
//         rates(currency: "USD") {
//             currency
//         }
//         books {
//             title
//             author
//         }
//     }
//     `
// })
// .then(result => console.log(result));


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

export { client }
