import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const ButtonStyled = styled.button `
    border-radius: 5px;
    padding: 15px 25px;
    font-size: 18px;
    text-decoration: none;
    margin: 20px;
`

class SingleUser extends Component {
    state = {
        userId: this.props.userId,
        currentUser: {
            _id: '',
            email: '',
            password: '',
            displayName: '',
            medicines: [],
            preferredPharmacy: {
                name: '',
                addressStreet: '',
                addressCity: '',
                addressState: '',
                addressZipcode: '',
            }
        },
        redirectToHome: false,
        displayEditForm: false
    }

    componentDidMount = () => {
        axios
            .get(`/api/v1/${this.state.userId}`)
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
            .put(`/api/v1/${this.state.userId}`, {
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
            .delete(`/api/v1/${this.state.userId}`)
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
                <h3 className="text-center">{this.state.currentUser.displayName}</h3>
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
                        <ButtonStyled className="green lighten-3">Update!</ButtonStyled>
                    </form>
                    : <div>
                        <div>
                            <p>Name: {this.state.currentUser.displayName}</p>
                            <p>Email: {this.state.currentUser.email}</p>
                            <p>Preferred Pharamacy: </p>
                        </div>
                    </div> 
                }
                <div className="row">
                    <ButtonStyled className="btn-small" onClick = {this.toggleEditForm}>Edit</ButtonStyled>
                    <ButtonStyled onClick = {this.deleteUser} className="btn-small">Delete</ButtonStyled>
                </div>
                
            </div>
        );
    }
}

export default SingleUser;