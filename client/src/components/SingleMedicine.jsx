import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

import Dosage from './Dosage'

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
            dosage: {}
        },
        redirectToUser: false,
        displayEditForm: false,
        userId: this.props.match.params.userId,
        medicineId: this.props.match.params.medicineId
    }

    getMedicineData = () => {
        axios
            .get(`/api/v1/${this.state.userId}/medicines/${this.state.medicineId}`)
            .then(res => {
                this.setState({medicine: res.data})
            })
    }

    componentDidMount = () => {
        this.getMedicineData()
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

    checkboxOverTheCounter = () => {
        this.setState((state, props) => {
            return ({medicine: {
                nameCommon: this.state.medicine.nameCommon,
                namePrescription: this.state.medicine.namePrescription,
                description: this.state.medicine.description,
                prescribingDoctor: this.state.medicine.prescribingDoctor,
                overTheCounter: !this.state.medicine.overTheCounter
            }})
        })
    }

    updateMedicine = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/${this.state.userId}/medicines/${this.state.medicineId}`, {
                nameCommon: this.state.medicine.nameCommon,
                namePrescription: this.state.medicine.namePrescription,
                description: this.state.medicine.description,
                prescribingDoctor: this.state.medicine.prescribingDoctor,
                overTheCounter: this.state.medicine.overTheCounter
            })
            .then(res => {
                this.setState({medicine: res.data, displayEditForm: false})
            })
        this.getMedicineData()
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
                    ? <form onSubmit = {this.updateMedicine} className="col s12">
                        <div className="row">
                            <div className="col s12 m6">
                                <label htmlFor="nameCommon">Common Name</label>
                                <input
                                    id="nameCommon"
                                    type="text"
                                    name="nameCommon"
                                    onChange={this.handleChange}
                                    value={this.state.medicine.nameCommon}
                                />
                            </div>  
                            <div className="col s12 m6">
                                <label htmlFor="namePrescription">Prescription Name</label>
                                <input
                                    id="namePrescription"
                                    type="text"
                                    name="namePrescription"
                                    onChange={this.handleChange}
                                    value={this.state.medicine.namePrescription}
                                />
                            </div> 
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <label htmlFor="description">Description</label>
                                <input
                                    id="description"
                                    type="text"
                                    name="description"
                                    onChange={this.handleChange}
                                    defaultValue={this.state.medicine.description}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s8">
                                <label htmlFor="prescribingDoctor">Prescribed By</label>
                                <input
                                    id="prescribingDoctor"
                                    type="text"
                                    name="prescribingDoctor"
                                    onChange={this.handleChange}
                                    value={this.state.medicine.prescribingDoctor}
                                />
                            </div>  
                            <div className="col s4">
                                <label htmlFor="overTheCounter">Over The Counter?</label>
                                {
                                    this.state.medicine.overTheCounter 
                                    ? <input
                                        checked
                                        id="overTheCounter"
                                        type="checkbox"
                                        name="overTheCounter"
                                        onClick={this.checkboxOverTheCounter}
                                        value={this.state.medicine.overTheCounter}
                                    />
                                    : <input
                                        id="overTheCounter"
                                        type="checkbox"
                                        name="overTheCounter"
                                        onClick={this.checkboxOverTheCounter}
                                        value={this.state.medicine.overTheCounter}
                                    />
                                }
                            </div> 
                        </div>
                        <ButtonStyled>Submit</ButtonStyled>
                    </form>
                    : <div>
                        <div className="col s12 m12">
                            <div className="row">
                                <div className="col s12 m6">
                                    <p>Common Name: {this.state.medicine.nameCommon}</p>
                                </div>
                                <div className="col s12 m6">
                                    <p>Prescription Name: {this.state.medicine.namePrescription}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col sm12 md12">
                                    <p>Description: {this.state.medicine.description}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12 m6">
                                    <p>Prescribed By: {this.state.medicine.prescribingDoctor}</p>
                                </div>
                                <div className="col s12 m6">
                                {
                                    this.state.medicine.overTheCounter
                                    ? <p>
                                        <label>
                                        <input type="checkbox" checked="checked" disabled="disabled" />
                                        <span>Over The Counter</span>
                                        </label>
                                    </p>
                                    :<p>
                                        <label>
                                        <input type="checkbox" disabled="disabled" />
                                        <span>Over The Counter</span>
                                        </label>
                                    </p>
                                }
                                </div>
                            </div>
                            <hr/>
                            <Dosage 
                                userId={this.state.userId}
                                medicineId={this.state.medicineId} />
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