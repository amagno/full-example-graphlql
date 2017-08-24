import React from 'react'
import { graphql } from 'react-apollo'
import { usersQuerySearch } from '../../apollo/queries'


class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: '',
            skip: true
        }
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange({ target: { name, value }}) {
        this.setState({
            ...this.state,
            [name]: value,
            skip: true
        })
    } 
    handleSearch(event) {
        this.setState({
            ...this.state,
            skip: false
        })
    }
    render() {
        return (
            <div>
                <label> Name: </label>
                <input onChange={this.handleChange} type="text" name="name" />
                <label> E-mail: </label>
                <input onChange={this.handleChange} type="text" name="email" />
                <button onClick={this.handleSearch}>Search</button>
                <hr />
                <ResultWithData emailSearch={this.state.email} nameSearch={this.state.name} skip={this.state.skip} />
            </div>
        )
    }
}

const Result = (props) => {
    const data = props.data || undefined

    if(data) {
        if(data.loading) {
            return (
                <div>
                    loading......
                </div>
            )
        }
        if(data.users) {
            let users = data.users
            return (
                <div>
                    {users.map(u => (
                        <span style={{ display: 'block' }} key={u.id}><b>Nome: </b>{u.name} | <b>E-mail: </b> {u.email}</span>
                    ))}
                </div>
            )
        }
    }

    return (
        <div>Waiting for search...</div>
    )
}



const ResultWithData = graphql(usersQuerySearch, {
    options: ({ emailSearch, nameSearch }) => ({ variables: { email: emailSearch, name: nameSearch } }),
    skip: ({ skip }) => skip
})(Result)


export default Search