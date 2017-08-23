import React from 'react'
import { gql, graphql } from 'react-apollo'


const Loading = ({ loading, users }) => {
    if(loading) {
        return (<h1>Loading</h1>)
    } else {
        return (
            <ul>
                {users.map(user => (<li key={user.id}>{user.name} | {user.email}</li>))}
            </ul>
        )
    }
}

const UserList = ({ data }) => (
    <div>
        <h1>Hello World!</h1>
        <button onClick={() => data.refetch()}>Refetch</button>
        <ul>
            <Loading loading={data.loading} users={data.users} />
        </ul>
    </div>
)

export const UserListQuery = gql`
    query UserListQuery {
        users {
            id
            name
            email
        }
    }
`

export default graphql(UserListQuery)(UserList)