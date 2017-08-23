import React from 'react';
import { ApolloClient, createNetworkInterface, ApolloProvider } from 'react-apollo'
//import UserList from './UserList'
import AddUser from './AddUser'
import UserCrudTable from './UsersCrudTable'
//https://secure-sea-64020.herokuapp.com/graphql
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql'
  })
})


export default () => (
  <ApolloProvider client={client}>
    <div>
      <h1>Users CRUD</h1>
      <hr />
      <UserCrudTable />
      <hr />
      <h1>Add Users</h1>
      <AddUser />
    </div>
  </ApolloProvider>
)
