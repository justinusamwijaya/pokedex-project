import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from 'react-apollo';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-boost';
import App from './App';
import * as serviceWorker from './serviceWorker';

const httplink = createHttpLink({
  uri: 'https://graphql-pokemon2.vercel.app'
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httplink,
  cache
});

ReactDOM.render(
  <ApolloProvider client = {client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
