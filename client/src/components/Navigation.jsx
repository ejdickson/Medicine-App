import React, { Component } from 'react';
import { Navbar, NavItem } from 'react-materialize'

class Navigation extends Component {
    render() {
        return (
            <Navbar brand='Medicine App' right>
                <NavItem href='#'>Login</NavItem>
            </Navbar>
        );
    }
}

export default Navigation;