import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

class SingleMedicine extends Component {
    state = {
        medicine: {
            name: '',
            description: '',
            dosage: '',
            amountRemaining: '',
            needRefill: false
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
                needRefill: false
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
            return (<Redirect to={`/${this.state.userId}/medicines`}/>)
        }
        return (
            <div>
                <h1>Single Medicine page with more details</h1>
                <button onClick = {this.toggleEditForm}>Edit Medicine Listing</button>
                {
                    this.state.displayEditForm
                    ? <form onSubmit = {this.updateMedicine}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={this.state.handleChange}
                                value={this.state.medicine.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                onChange={this.state.handleChange}
                                value={this.state.medicine.description}
                            />
                        </div>
                        <div>
                            <label htmlFor="dosage">Dosage</label>
                            <input
                                id="dosage"
                                type="text"
                                name="dosage"
                                onChange={this.state.handleChange}
                                value={this.state.medicine.dosage}
                            />
                        </div>
                        <div>
                            <label htmlFor="amountRemaining">Amount amountRemaining</label>
                            <input
                                id="amountRemaining"
                                type="text"
                                name="amountRemaining"
                                onChange={this.state.handleChange}
                                value={this.state.medicine.amountRemaining}
                            />
                        </div>
                        <button>Submit</button>
                    </form>
                    : <div>
                        <div>
                            Name: {this.state.medicine.name}
                        </div>
                        <div>
                            Description: {this.state.medicine.description}
                        </div>
                        <div>
                            Dosage: {this.state.medicine.dosage}
                            Amount Remaining: {this.state.medicine.amountRemaining}
                        </div>
                        <div>
                            Need Refill?
                        </div>
                        <div>
                            No longer taking this medicine?
                            <button onClick={this.deleteMedicine}>Delete Medicine</button>
                        </div>
                    </div>
                }
                <Link to = {`/${this.state.userId}/medicines`} >Back To Medicines</Link>
            </div>
        );
    }
}

export default SingleMedicine;