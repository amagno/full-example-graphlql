import React from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
import UsersTable from './components/UsersTable'


//https://secure-sea-64020.herokuapp.com/graphql
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
})


export default () => (
  <ApolloProvider client={client}>
    <div>
      <UsersTable />
    </div>
  </ApolloProvider>
)
