import React from 'react'
import { graphql } from 'react-apollo'
import { usersQuery } from '../../apollo/queries'
import UserRow from './UserRow'
import AddUser from './AddUser'

const Table = ({ loading, users, filter, filterBy }) => {
    let filteredUsers = []
    if(loading) {
        return (<h1>Loading...</h1>)
    }
    if(users) {
        filteredUsers = users.filter(u => (
            u[filterBy].toLowerCase().includes(filter.toLowerCase())
        ))
    }
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
                    <UserRow key={user.id} id={user.id} name={user.name} email={user.email} password={user.password}  />
                ))}
            </tbody>
        </table>
    )
}
const newStyle = {
    position: 'absolute',
    top: '12%',
    left: '50%',
    padding: '10px',
    backgroundColor: 'gray'
}
const New = ({ visible }) => {
    if(visible) {
        return (
            <div style={newStyle}>
                <AddUser />
            </div>
        )
    }
    return (
        <div></div>
    )
}

class Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = { search: '', filterBy: 'email', new: false }

        this.handleSearch = this.handleSearch.bind(this)
        this.handleFilterBy = this.handleFilterBy.bind(this)
        this.handleNew = this.handleNew.bind(this)
    }
    handleNew() {
        this.setState({
            ...this.state,
            new: !this.state.new
        })
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
                <button onClick={this.handleNew}>{ this.state.new ? 'Close' : 'New' }</button>
                <Table loading={loading} users={users} filter={search} filterBy={filterBy} />
                <New visible={this.state.new} />
            </div>
        )
    }    
}


export default graphql(usersQuery)(Container)