import React, { Component } from 'react';
import axios from 'axios'
import styled from 'styled-components'

const ButtonStyled = styled.button `
    border-radius: 5px;
    padding: 15px 25px;
    font-size: 18px;
    text-decoration: none;
    margin: 20px;
`

class Pharmacy extends Component {
    state = {
        userId: this.props.userId,
        pharmacyId: this.props.pharmacyId,
        pharmacy: {
            name: '',
            addressStreet: '',
            addressCity: '',
            addressState: '',
            addressZipcode: '',
        },
        displayPharmacyForm: false
    }

    componentDidMount = () => {
        axios
            .get(`/api/v1/${this.state.userId}`)
            .then(res => {
                this.setState({pharmacy: res.data.pharmacy})
            })
    }

    togglePharmacyForm = () => {
        this.setState((state, props) => {
            return ({displayPharmacyForm: !state.displayPharmacyForm})
        })
    }

    handleChange = (e) => {
        const updatedPharmacy = {...this.state.pharmacy}
        updatedPharmacy[e.target.name] = e.target.value
        this.setState({pharmacy: updatedPharmacy})
    }

    updatePharmacy = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/${this.state.userId}/`, {
                pharmacy: {
                    name: this.state.pharmacy.name,
                    addressStreet: this.state.pharmacy.addressStreet,
                    addressCity: this.state.pharmacy.addressCity,
                    addressState: this.state.pharmacy.addressState,
                    addressZipcode: this.state.pharmacy.addressZipcode,
                }
            })
            .then(res => {
                this.setState({pharmacy: res.data.pharmacy, displayPharmacyForm: false})
            })
    }

    render() {
        return (
            <div>
                { 
                    this.state.displayPharmacyForm
                    ? <form onSubmit = {this.updatePharmacy} className="col">
                        <div>
                            <label htmlFor="name">Name of Pharmacy</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                value={this.state.pharmacy.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="addressStreet">Street Address</label>
                            <input
                                id="addressStreet"
                                type="text"
                                name="addressStreet"
                                onChange={this.handleChange}
                                value={this.state.pharmacy.addressStreet}
                            />
                        </div>
                        <div className="row">
                            <div>
                                <label htmlFor="addressCity">City</label>
                                <input
                                    id="addressCity"
                                    type="text"
                                    name="addressCity"
                                    onChange={this.handleChange}
                                    value={this.state.pharmacy.addressCity}
                                />
                            </div>
                            <div>
                                <label htmlFor="addressState">State</label>
                                <input
                                    id="addressState"
                                    type="text"
                                    name="addressState"
                                    onChange={this.handleChange}
                                    value={this.state.pharmacy.addressState}
                                />
                            </div>
                            <div>
                                <label htmlFor="addressZipcode">Zipcode</label>
                                <input
                                    id="addressZipcode"
                                    type="text"
                                    name="addressZipcode"
                                    onChange={this.handleChange}
                                    value={this.state.pharmacy.addressZipcode}
                                />
                            </div>
                        </div>
                        <ButtonStyled className="green lighten-3">Update!</ButtonStyled>
                    </form>
                    : <div>
                        <h5>Preferred Pharmacy:</h5>
                        <h5>{this.state.pharmacy.name}</h5>
                        <p>{this.state.pharmacy.addressStreet}<br/>{this.state.pharmacy.addressCity}, {this.state.pharmacy.addressState} {this.state.pharmacy.addressZipcode}</p>
                    </div>
                }
                <ButtonStyled onClick = {this.togglePharmacyForm}>Change Your Pharmacy</ButtonStyled>
            </div>
        );
    }
}

export default Pharmacy;