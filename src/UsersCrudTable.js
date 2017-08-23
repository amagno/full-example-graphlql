import React from 'react'
import { graphql, gql, compose } from 'react-apollo'


export const updateUserMutation = gql`
    mutation updateUser($id: ID!, $name: String, $email: String, $password: String) {
        updateUser(id: $id, input: {
            name: $name
            email: $email
            password: $password
        }) {
            id
        }
    }
`
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
export const deleteUserMutation = gql`
    mutation deleteUserMutation($id: ID!) {
        deleteUser(id: $id) {
            error
            message
            id
        }
    }
`
class UserRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editable: false, 
            user: {
                id: props.id,
                email: props.email,
                name: props.name,
                password: props.password
            }
        }
        console.log(props)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleEdit() {
        this.setState({
            ...this.state,
            editable: true
        })
    }
    async handleSave() {
        let confirm = window.confirm('Tem certeza que deseja salvar ?')
        console.log(`Update ID: ${this.state.user.id}`)
        if(!confirm) {
            return false
        }
        const { id, name, email, password } = this.state.user
        try {
            console.log(this.props)
            await this.props.updateUserMutation({
                variables: {
                    id,
                    name,
                    email,
                    password
                }
            })
        } catch(error) {
            throw new Error(error)
        }
        this.setState({
            ...this.state,
            editable: false
        })
    }
    async handleDelete() {
        let confirm = window.confirm(`Confirm delete of user: ${this.state.user.name}?`)

        if(!confirm) {
            return false
        }
        try {
            await this.props.deleteUserMutation({
                refetchQueries: [{
                    query: usersQuery
                }],
                variables: {
                    id: this.state.user.id
                }
            })
        } catch(error) {
            throw new Error(error)
        }

    }
    handleChange(event) {
        const target = event.target.name
        const value = event.target.value
        console.log(target)
        console.log(value)
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [target]: value
            }
        })
    }
    render() {
        const { editable } = this.state
        const { id, name, email, password } = this.state.user
        if(editable) {
            return (
                <tr>
                    <td><input type="text" name="name" value={name} onChange={this.handleChange} /></td>
                    <td><input type="text" name="email" value={email} onChange={this.handleChange} /></td>
                    <td><input type="text" name="password" value={password} onChange={this.handleChange} /></td>                    
                    <td><button onClick={() => this.handleSave()}>Save</button></td>
                    <td><button onClick={() => this.setState({ ...this.state, editable: false })}>Cancel</button></td> 
                </tr>               
            )
        }

        return (
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{password}</td>
                <td><button onClick={() => this.handleEdit()}>Edit</button></td>
                <td><button onClick={() => this.handleDelete()}>Delete</button></td>
            </tr>
        )
    }
}

const UserTableRow = compose(
    graphql(updateUserMutation, { name: 'updateUserMutation' }),
    graphql(deleteUserMutation, { name: 'deleteUserMutation' })
)(UserRow)


const Table = ({ loading, users, filter, filterBy }) => {
    
    if(loading) {
        return (<h1>Loading...</h1>)
    }
    let filteredUsers = users.filter(u => (
        u[filterBy].toLowerCase().includes(filter.toLowerCase())
    ))
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Password</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map(user => (
                    <UserTableRow key={user.id} id={user.id} name={user.name} email={user.email} password={user.password}  />
                ))}
            </tbody>
        </table>
    )
}


class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = { search: '', filterBy: 'email' }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleFilterBy = this.handleFilterBy.bind(this)
    }
    handleSearch(event) {
        const search = event.target.value

        this.setState({
            ...this.state,
            search
        })
    }
    handleFilterBy(event) {
        const filterBy = event.target.value
        this.setState({
            ...this.state,
            filterBy
        })
    }
    render() {
        const { loading, users } = this.props.data
        const { search, filterBy } = this.state
        return (
            <div>
                <label>Search: </label>
                <input type="text" onChange={this.handleSearch} />
                <select onChange={this.handleFilterBy}>
                    <option value="email">E-mail</option>
                    <option value="name">Name</option>
                </select>
                <Table loading={loading} users={users} filter={search} filterBy={filterBy} />
            </div>
        )
    }    
}


export default graphql(usersQuery)(Container)