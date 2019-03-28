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

class MedicinesList extends Component {
    state = {
        userId: this.props.userId,
        medicines: [],
        newMedicine: {
            nameCommon: '',
            namePrescription: '',
            description: '',
            prescribingDoctor: '',
            overTheCounter: false,
            dosage: {}
        },
        displayMedicineForm: false
    }

    getAllMedicines = () => {
        axios
            .get(`/api/v1/${this.state.userId}/medicines`)
            .then(res => {
                console.log(res.data)
                this.setState({ medicines: res.data})
            })
    }

    componentDidMount = () => {
        this.getAllMedicines()
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
                nameCommon: this.state.newMedicine.nameCommon,
                namePrescription: this.state.newMedicine.namePrescription,
                description: this.state.newMedicine.description,
                prescribingDoctor: this.state.newMedicine.prescribingDoctor,
                overTheCounter: false,
                dosage: {},
            })
            .then(res => {
                const medicinesList = [...this.state.medicines]
                medicinesList.unshift(res.data)
                this.setState({
                    newMedicine: {
                        nameCommon: '',
                        namePrescription: '',
                        description: '',
                        prescribingDoctor: '',
                        overTheCounter: false,
                        dosage: {}
                    },
                    displayMedicineForm: false,
                    medicines: medicinesList
                })
            })
        this.getAllMedicines()
    }

    render() {
        return (
            <div>
                <h3>Medicines</h3>
                <ButtonStyled onClick = {this.toggleMedicineForm}>
                    <i className="small material-icons">add_circle</i>
                    New Medicine
                </ButtonStyled>
                {
                    this.state.displayMedicineForm
                    ? <form onSubmit={this.createMedicine} className="col s12">
                        <div className="row">
                            <div className="col s12 m6">
                                <label htmlFor="nameCommon">Common Name</label>
                                <input
                                    id="nameCommon"
                                    type="text"
                                    name="nameCommon"
                                    onChange={this.handleChange}
                                    value={this.state.newMedicine.nameCommon}
                                />
                            </div>
                            <div className="col s12 m6">
                                <label htmlFor="namePrescription">Prescription Name</label>
                                <input
                                    id="namePrescription"
                                    type="text"
                                    name="namePrescription"
                                    onChange={this.handleChange}
                                    value={this.state.newMedicine.namePrescription}
                                />
                            </div>
                        </div>
                        <div className="col s12">
                            <label htmlFor="description">Description</label>
                            <input
                                id="description"
                                type="text"
                                name="description"
                                onChange={this.handleChange}
                                value={this.state.newMedicine.description}
                            />
                        </div>
                        <div className="row">
                            <div className="col s8">
                                <label htmlFor="prescribingDoctor">Prescribed By</label>
                                <input
                                    id="prescribingDoctor"
                                    type="text"
                                    name="prescribingDoctor"
                                    onChange={this.handleChange}
                                    value={this.state.newMedicine.prescribingDoctor}
                                />
                            </div>
                            <div className="col s4">
                                <p>
                                    <input 
                                        type="checkbox"
                                        name="overTheCounter" 
                                        />
                                    <span>Over The Counter?</span>
                                </p>
                            </div>
                        </div>
                        
                        <ButtonStyled>Submit</ButtonStyled>
                    </form>
                    : null
                }
                {
                    this.state.medicines.map(medicine => {
                        return (
                            <div key = {medicine._id}>
                                <ButtonStyled className="green lighten-3 btn-large">
                                    <Link to ={`/${this.state.userId}/medicines/${medicine._id}`} className="white-text">{medicine.nameCommon}</Link>
                                </ButtonStyled>   
                            </div>
                        )
                    })
                }

            </div>
        );
    }
}

export default MedicinesList;