import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize'

class Navigation extends Component {
    render() {
        return (
            <Navbar className="green lighten-1" brand='Medicine App' right>
                <NavItem href='#'>Login</NavItem>
            </Navbar>
        );
    }
}

export default Navigation;