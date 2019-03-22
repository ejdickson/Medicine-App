import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class UsersList extends Component {
    state = {
        users: [],
        newUser: {
            email: '',
            password: '',
            displayName: '',
            medicines: []
        },
        displayUserForm: false
    }

    componentDidMount = () => {
        axios
            .get('/api/v1')
            .then(res => {
                this.setState({ users: res.data})
            })
    }

    toggleUserForm = () => {
        this.setState((state, props) => {
            return ({displayUserForm: !state.displayUserForm})
        })
    }

    handleChange = (e) => {
        const changeNewUser = {...this.state.newUser}
        changeNewUser[e.target.name] = e.target.value
        this.setState({newUser: changeNewUser})
    }

    createUser = (e) => {
        e.preventDefault()
        axios
            .post('/api/v1', {
                email: this.state.newUser.email,
                password: this.state.newUser.password,
                displayName: this.state.newUser.displayName,
                medicines: []
            })
            .then(res => {
                const usersList = [this.state.users]
                usersList.unshift(res.data)
                this.setState({
                    newUser: {
                        email: '',
                        password: '',
                        displayName: ''
                    },
                    displayUserForm: false,
                    users: usersList
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Main Landing Page with list of users</h1>
                { 
                    this.state.users.map(user => {
                        return (
                            <div key = {user._id}>
                                <Link to = {`/${user._id}`}>{user.displayName}</Link>
                            </div>
                        )
                    })
                }
                <button onClick = {this.toggleUserForm}>Sign Up</button>
                { 
                    this.state.displayUserForm
                        ? <form onSubmit = {this.createUser}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.newUser.email}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={this.handleChange}
                                    value={this.state.newUser.password}
                                />
                            </div>
                            <div>
                                <label htmlFor="displayName">Display Name</label>
                                <input
                                    id="displayName"
                                    type="text"
                                    name="displayName"
                                    onChange={this.handleChange}
                                    value={this.state.newUser.displayName}
                                />
                            </div>
                            <button>Sign Up!</button>
                        </form>
                        : null
                }
            </div>
        );
    }
}

export default UsersList;