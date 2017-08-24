import React from 'react'
import { deleteUserMutation, updateUserMutation } from '../../apollo/mutations'
import { usersQuery } from '../../apollo/queries'
import { compose, graphql } from 'react-apollo'


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
            },
            user_undo: {
                id: props.id,
                email: props.email,
                name: props.name,
                password: props.password
            },
            status: {}
        }
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
        if(!confirm) {
            return false
        }
        const { id, name, email, password } = this.state.user
        try {
            let status = await this.props.updateUserMutation({
                variables: {
                    id,
                    name,
                    email,
                    password
                }
            })
            status = status.data.updateUser
            if(status.error) {
                this.setState({
                    ...this.state,
                    editable: true,
                    status
                })
            } else {
                this.setState({
                    ...this.state,
                    editable: false,
                    status
                })
            }
        } catch(error) {
            throw new Error(error)
        }
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
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [target]: value
            }
        })
    }
    render() {
        let error = this.state.status.error
        let styleErrorInput = { borderColor: error ? 'red' : 'none' }
        const { editable } = this.state
        const { name, email, password } = this.state.user
        if(editable) {
            return (
                <tr>
                    <td><input type="text" name="name" value={name} onChange={this.handleChange} /></td>
                    <td>
                        <input type="text" style={styleErrorInput} name="email" value={email} onChange={this.handleChange} />
                        {error ? (<span style={{ color: 'red', fontSize: '12px' }}> Duplicate E-mail </span>) : ''}
                    </td>
                    <td><input type="text" name="password" value={password} onChange={this.handleChange} /></td>                    
                    <td><button onClick={() => this.handleSave()}>Save</button></td>
                    <td><button onClick={() => {
                        this.setState({ ...this.state, user: this.state.user_undo, editable: false })
                        }}>Cancel</button></td>
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

export default compose(
    graphql(usersQuery, { name: 'usersQuery' }),
    graphql(updateUserMutation, { name: 'updateUserMutation' }),
    graphql(deleteUserMutation, { name: 'deleteUserMutation' })
)(UserRow)