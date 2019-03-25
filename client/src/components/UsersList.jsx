import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ButtonStyled = styled.button `
    border-radius: 5px;
    padding: 15px 25px;
    font-size: 22px;
    text-decoration: none;
    margin: 20px;
`

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
                <h3>Select User Account</h3>
                { 
                    this.state.users.map(user => {
                        return (
                            <div key = {user._id}>
                                <ButtonStyled className="green lighten-3 btn-large"><Link to = {`/${user._id}`} className="white-text">{user.displayName}</Link></ButtonStyled>
                            </div>
                        )
                    })
                }
                <ButtonStyled onClick = {this.toggleUserForm} className="btn-small"><i className="material-icons left">person_add</i>Sign Up</ButtonStyled>
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
                            <ButtonStyled>Save Account!</ButtonStyled>
                        </form>
                        : null
                }
            </div>
        );
    }
}

export default UsersList;