import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const ButtonStyled = styled.button `
    border-radius: 5px;
    padding: 15px 25px;
    font-size: 18px;
    text-decoration: none;
    margin: 20px;
`

class SingleMedicine extends Component {
    state = {
        medicine: {
            nameCommon: '',
            namePrescription: '',
            description: '',
            prescribingDoctor: '',
            overTheCounter: false,
            dosage: {
                
            }
        },
        redirectToUser: false,
        displayEditForm: false,
        userId: this.props.match.params.userId,
        medicineId: this.props.match.params.medicineId
    }

    componentDidMount = () => {
        axios
            .get(`/api/v1/${this.state.userId}/medicines/${this.state.medicineId}`)
            .then(res => {
                this.setState({medicine: res.data})
            })
    }

    toggleEditForm = () => {
        this.setState((state, props) => {
            return ({displayEditForm: !state.displayEditForm})
        })
    }

    handleChange = (e) => {
        const updatedMedicine = {...this.state.medicine}
        updatedMedicine[e.target.name] = e.target.value
        this.setState({medicine: updatedMedicine})
    }

    updateMedicine = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/${this.state.userId}/medicines/${this.state.medicineId}`, {
                name: this.state.medicine.name,
                description: this.state.medicine.description,
                dosage: this.state.medicine.dosage,
                amountRemaining: this.state.medicine.amountRemaining,
            })
            .then(res => {
                this.setState({medicine: res.data, displayEditForm: false})
            })
    }

    deleteMedicine = () => {
        axios
            .delete(`/api/v1/${this.state.userId}/medicines/${this.state.medicineId}`)
            .then(res => {
                this.setState({redirectToUser: true})
            })

    }

    render() {
        if (this.state.redirectToUser) {
            return (<Redirect to={`/${this.state.userId}/`}/>)
        }
        return (
            <div>
                <h3 className="text-center">{this.state.medicine.name}</h3>
                {
                    this.state.displayEditForm
                    ? <form onSubmit = {this.updateMedicine}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                value={this.state.medicine.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.medicine.description}
                            />
                        </div>
                        <div>
                            <label htmlFor="dosage">Dosage</label>
                            <input
                                id="dosage"
                                type="text"
                                name="dosage"
                                onChange={this.handleChange}
                                value={this.state.medicine.dosage}
                            />
                        </div>
                        <div>
                            <label htmlFor="amountRemaining">Amount Remaining</label>
                            <input
                                id="amountRemaining"
                                type="text"
                                name="amountRemaining"
                                onChange={this.handleChange}
                                value={this.state.medicine.amountRemaining}
                            />
                        </div>
                        <ButtonStyled>Submit</ButtonStyled>
                    </form>
                    : <div>
                        <div className="col">
                            <p>Name: {this.state.medicine.name}</p>
                            <p>Description: {this.state.medicine.description}</p>
                            <div className="row">
                                <p>Dosage: {this.state.medicine.dosage}</p>
                                <p>Amount Remaining: {this.state.medicine.amountRemaining}</p>
                            </div>
                        </div>
                        
                        <div>
                            {
                                this.state.medicine.needRefill
                                ? <div>
                                    You will need a refill soon. Contact your preferred pharamacy.
                                </div>
                                : null
                            }
                        </div>
                        <div className="row">
                            <ButtonStyled onClick = {this.toggleEditForm}>Edit Medicine Listing</ButtonStyled>
                            <ButtonStyled onClick={this.deleteMedicine}>Delete Medicine</ButtonStyled>
                        </div>
                    </div>
                }
                <Link to = {`/${this.state.userId}/`} >Back To Medicines</Link>
            </div>
        );
    }
}

export default SingleMedicine;