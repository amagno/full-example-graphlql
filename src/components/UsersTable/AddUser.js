import React from 'react'
import { graphql } from'react-apollo'
import { addUserMutation } from '../../apollo/mutations'
import { usersQuery } from '../../apollo/queries'


class AddUser extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            status: {}
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
            let status = await this.props.mutate({
                variables: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                },
                refetchQueries: [{
                    query: usersQuery
                }]
            })
            status = status.data.addUser
            this.setState({ 
                ...this.state,
                status
            })           
        }catch(error) {
            
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
                {
                    this.state.status.error ? 
                    (<p style={{ cursor: 'pointer' }} onClick={() => this.setState({ ...this.state, status: { ...this.state.status, error: false }})}>
                    {this.state.status.message}</p>) : 
                    ''
                }
            </form>
        )
    }
}


export default graphql(addUserMutation)(AddUser)