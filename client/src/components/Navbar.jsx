import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navbar extends Component {
    render() {
        return (
            <div>
                <h1>Nav bar at top of all pages</h1>
                <Link to = "/">Home</Link>
                <Link to = "/:id">User Page</Link>
            </div>
        );
    }
}

export default Navbar;