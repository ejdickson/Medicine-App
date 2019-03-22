import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

class MedicinesList extends Component {
    state = {
        medicines: [],
        newMedicine: {
            name: '',
            description: '',
            dosage: '',
            amountRemaining: '',
            needRefill: false,
        },
        displayMedicineForm: false,
        userId: this.props.match.params.userId
    }

    componentDidMount = () => {
         axios
            .get(`/api/v1/${this.state.userId}/medicines`)
            .then(res => {
                console.log(res.data)
                this.setState({ medicines: res.data})
            })
    }

    toggleMedicineForm = () => {
        this.setState((state, props) => {
            return ({displayMedicineForm: !state.displayMedicineForm})
        })
    }

    handleChange = (e) => {
        const changeNewMedicine = {...this.state.newMedicine}
        changeNewMedicine[e.target.name] = e.target.value
        this.setState({newMedicine: changeNewMedicine})
    }

    createMedicine = (e) => {
        e.preventDefault()
        axios
            .post(`/api/v1/${this.state.userId}/medicines`, {
                name: this.state.newMedicine.name,
                description: this.state.newMedicine.description,
                dosage: this.state.newMedicine.dosage,
                amountRemaining: this.state.newMedicine.amountRemaining,
                needRefill: false
            })
            .then(res => {
                const medicinesList = [...this.state.medicines]
                medicinesList.unshift(res.data)
                this.setState({
                    newMedicine: {
                        name: '',
                        description: '',
                        dosage: '',
                        amountRemaining: '',
                        needRefill: false,
                    },
                    displayMedicineForm: false,
                    medicines: medicinesList
                })
            })
    }

    render() {
        return (
            <div>
                <h1>List of all of a single user's medicines (name only)</h1>
                {
                    this.state.medicines.map(medicine => {
                        return (
                            <div key = {medicine._id}>
                                <Link to ={`/${this.state.userId}/medicines/${medicine._id}`}>{medicine.name}</Link>
                            </div>
                        )
                    })
                }
                <button onClick = {this.toggleMedicineForm}> + New Medicine</button>
                {
                    this.state.displayMedicineForm
                    ? <form onSubmit={this.createMedicine}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                                value={this.state.newMedicine.name}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.newMedicine.description}
                            />
                        </div>
                        <div>
                            <label htmlFor="dosage">Dosage</label>
                            <input
                                id="dosage"
                                type="text"
                                name="dosage"
                                onChange={this.handleChange}
                                value={this.state.newMedicine.dosage}
                            />
                        </div>
                        <div>
                            <label htmlFor="amountRemaining">Amount Remaining</label>
                            <input
                                id="amountRemaining"
                                type="text"
                                name="amountRemaining"
                                onChange={this.handleChange}
                                value={this.state.newMedicine.amountRemaining}
                            />
                        </div>
                        <button>Submit</button>
                    </form>
                    : null
                }
            </div>
        );
    }
}

export default MedicinesList;