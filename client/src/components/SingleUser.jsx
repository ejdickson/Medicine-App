import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class SingleUser extends Component {
    state = {
        currentUser: {
            _id: '',
            email: '',
            password: '',
            displayName: '',
            medicines: []
        },
        redirectToHome: false,
        displayEditForm: false
    }

    componentDidMount = () => {
        axios
            .get(`/api/v1/${this.props.match.params.id}`)
            .then(res => {
                this.setState({currentUser: res.data})
            })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return ({displayEditForm: !state.displayEditForm})
        })
    }

    handleChange = (e) => {
        const updatedUser = {...this.state.currentUser}
        updatedUser[e.target.name] = e.target.value
        this.setState({currentUser: updatedUser})
    }

    updateUser = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/${this.props.match.params.id}`, {
                email: this.state.currentUser.email,
                password: this.state.currentUser.password,
                displayName: this.state.currentUser.displayName,
            })
            .then(res => {
                this.setState({user: res.data, displayEditForm: false})
            })
    }

    deleteUser =() => {
        axios
            .delete(`/api/v1/${this.props.match.params.id}`)
            .then(res => {
                this.setState({redirectToHome: true})
            })
    }

    render() {
        if (this.state.redirectToHome) {
            return (<Redirect to = '/' />)
        }

        return (
            <div>
                <h1>Single User Page with weekly view of medicines</h1>
                <button onClick = {this.toggleEditForm}>Edit Your User Information</button>
                {
                    this.state.displayEditForm
                    ? <form onSubmit = {this.updateUser}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="text"
                                name="email"
                                onChange={this.handleChange}
                                value={this.state.currentUser.email}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                onChange={this.handleChange}
                                value={this.state.currentUser.password}
                            />
                        </div>
                        <div>
                            <label htmlFor="displayName">Display Name</label>
                            <input
                                id="displayName"
                                type="text"
                                name="displayName"
                                onChange={this.handleChange}
                                value={this.state.currentUser.displayName}
                            />
                        </div>
                        <button>Update!</button>
                    </form>
                    : <div>
                        <div>
                            Name: {this.state.currentUser.displayName}
                        </div>
                        <button onClick = {this.deleteUser}>Delete</button>
                    </div>
                }
                <Link to = {`{this.state.currentUser._id}/medicines`}>{this.state.currentUser.displayName}'s Medicines</Link>
            </div>
        );
    }
}

export default SingleUser;