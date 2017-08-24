import { gql } from 'react-apollo'

export const usersQuery = gql`
    query usersQuery {
        users {
            id
            name
            email
            password
        }
    }
`
export const usersQuerySearch = gql`
    query usersQuery($email: String $name: String) {
        users(email: $email name: $name) {
            id
            name
            email
            password
        }
    }
`