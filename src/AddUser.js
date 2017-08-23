import React from 'react'
import { gql, graphql } from'react-apollo'
import { UserListQuery } from './UserList'




class AddUser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange({ target: { name, value }}) {
        this.setState({
            [name]: value
        })
    }
    async handleSubmit(event) {
        event.preventDefault()

        try {
            await this.props.mutate({
                variables: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                },
                update: (proxy, { data: { addUser } }) => {
                    const data = proxy.readQuery({ query: UserListQuery })
                    data.users.push(addUser)
                    proxy.writeQuery({ query: UserListQuery, data })
                }
            })
        }catch(error) {
            console.error(error)
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                &nbsp;
                <label>Name: </label>
                <input type="text" name="name" placeholder="Digite o nome..." onChange={this.handleChange} value={this.state.name} />
                &nbsp;
                <label>Email: </label>
                <input type="text" name="email" placeholder="Digite o e-mail..." onChange={this.handleChange} value={this.state.email} />
                &nbsp;
                <label>Password: </label>
                <input type="text" name="password" placeholder="Digite a senha..." onChange={this.handleChange} value={this.state.password} />

                <button type="submit">Save</button>
            </form>
        )
    }
}
const AddUserQuery = gql`
    mutation addUser($name: String! $email: String! $password: String!) {
        addUser(input: {
            name: $name
            email: $email
            password: $password
        }) {
            id
            name
            email
            password
        }
    }
`

export default graphql(AddUserQuery)(AddUser)