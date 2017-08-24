import React from 'react'
import { Route, Router } from 'react-router'
import HomeView from './views/Home'
import AddUserView from './views/AddUser'
import SearchView from './views/SearchView'
import Links from './components/Links'
import createBrowserHistory from 'history/createBrowserHistory'


const history = createBrowserHistory()


export default (props) => (
    <Router {...props} history={history} >
        <div>
            <Links /> 
            <Route path="/" exact component={HomeView} />
            <Route path="/adduser" component={AddUserView} /> 
            <Route path="/search" component={SearchView} />            
                       
            
        </div>
    </Router>
)