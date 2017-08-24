import React from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import Routes from './Routes'

//https://secure-sea-64020.herokuapp.com/graphql
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
})


export default () => (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
)
