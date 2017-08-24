import React from 'react'
import { Link } from 'react-router-dom'



const linkStyle = {
    margin: '10px',
    textDecoration: 'none'
}
export default () => (
    <nav style={{ borderBottom: '1px solid black', padding: '10px', marginBottom: '10px' }}>
        <h1 style={{ display: 'inline' }}>| Users Example |</h1>

        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/adduser">AddUser</Link>
        <Link style={linkStyle} to="/search">SearchUsers</Link>        
                
    </nav>
)