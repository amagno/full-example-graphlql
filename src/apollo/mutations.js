import { gql } from 'react-apollo'

export const addUserMutation = gql`
    mutation addUser($name: String! $email: String! $password: String!) {
        addUser(input: {
            name: $name
            email: $email
            password: $password
        }) {
            id
            error
            message
        }
    }
`
export const deleteUserMutation = gql`
    mutation deleteUserMutation($id: ID!) {
        deleteUser(id: $id) {
            error
            message
            id
        }
    }
`
export const updateUserMutation = gql`
    mutation updateUser($id: ID!, $name: String, $email: String, $password: String) {
        updateUser(id: $id, input: {
            name: $name
            email: $email
            password: $password
        }) {
            id
            error
            message
        }
    }
`