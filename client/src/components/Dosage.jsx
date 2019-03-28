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

class Dosage extends Component {
    state = {
        userId: this.props.userId,
        medicineId: this.props.medicineId,
        dosage: {
            number: '',
            measurement: '',
            asNeeded: false,
            hourly: false,
            hours: '',
            morning: false,
            afternoon: false,
            evening: false,
            bedTime: false
        },
        displayDosageForm: false,
    }

    getDosage = () => {
        axios
            .get(`/api/v1/${this.state.userId}/medicines/${this.state.medicineId}`)
            .then(res => {
                this.setState({dosage: res.data.dosage})
            })
    }

    componentDidMount = () => {
        this.getDosage()
    }

    toggleDosageForm = () => {
        this.setState((state, props) => {
            return ({displayDosageForm: !state.displayDosageForm})
        })
    }

    checkboxAsNeeded = () => {
        this.setState((state, props) => {
            return ({dosage: {
                number: this.state.dosage.number,
                measurement: this.state.dosage.measurement,
                asNeeded: !this.state.dosage.asNeeded,
                hourly: this.state.dosage.hourly,
                hours: this.state.dosage.hours,
                morning: this.state.dosage.morning,
                afternoon: this.state.dosage.afternoon,
                evening: this.state.dosage.evening,
                bedTime: this.state.dosage.bedTime
            }})
        })
    }

    checkboxHourly = () => {
        this.setState((state, props) => {
            return ({dosage: {
                number: this.state.dosage.number,
                measurement: this.state.dosage.measurement,
                asNeeded: this.state.dosage.asNeeded,
                hourly: !this.state.dosage.hourly,
                hours: this.state.dosage.hours,
                morning: this.state.dosage.morning,
                afternoon: this.state.dosage.afternoon,
                evening: this.state.dosage.evening,
                bedTime: this.state.dosage.bedTime
            }})
        })
    }

    checkboxMorning = () => {
        this.setState((state, props) => {
            return ({dosage: {
                number: this.state.dosage.number,
                measurement: this.state.dosage.measurement,
                asNeeded: this.state.dosage.asNeeded,
                hourly: this.state.dosage.hourly,
                hours: this.state.dosage.hours,
                morning: !this.state.dosage.morning,
                afternoon: this.state.dosage.afternoon,
                evening: this.state.dosage.evening,
                bedTime: this.state.dosage.bedTime
            }})
        })
    }

    checkboxAfternoon = () => {
        this.setState((state, props) => {
            return ({dosage: {
                number: this.state.dosage.number,
                measurement: this.state.dosage.measurement,
                asNeeded: this.state.dosage.asNeeded,
                hourly: this.state.dosage.hourly,
                hours: this.state.dosage.hours,
                morning: this.state.dosage.morning,
                afternoon: !this.state.dosage.afternoon,
                evening: this.state.dosage.evening,
                bedTime: this.state.dosage.bedTime
            }})
        })
    }

    checkboxEvening = () => {
        this.setState((state, props) => {
            return ({dosage: {
                number: this.state.dosage.number,
                measurement: this.state.dosage.measurement,
                asNeeded: this.state.dosage.asNeeded,
                hourly: this.state.dosage.hourly,
                hours: this.state.dosage.hours,
                morning: this.state.dosage.morning,
                afternoon: this.state.dosage.afternoon,
                evening: !this.state.dosage.evening,
                bedTime: this.state.dosage.bedTime
            }})
        })
    }

    checkboxBedTime = () => {
        this.setState((state, props) => {
            return ({dosage: {
                number: this.state.dosage.number,
                measurement: this.state.dosage.measurement,
                asNeeded: this.state.dosage.asNeeded,
                hourly: this.state.dosage.hourly,
                hours: this.state.dosage.hours,
                morning: this.state.dosage.morning,
                afternoon: this.state.dosage.afternoon,
                evening: this.state.dosage.evening,
                bedTime: !this.state.dosage.bedTime
            }})
        })
    }

    handleChange = (e) => {
        const updatedDosage = {...this.state.dosage}
        updatedDosage[e.target.name] = e.target.value
        this.setState({dosage: updatedDosage})
    }

    updateDosage = (e) => {
        e.preventDefault()
        axios
            .put(`/api/v1/${this.state.userId}/medicines/${this.state.medicineId}`, {
                dosage: {
                    number: this.state.dosage.number,
                    measurement: this.state.dosage.measurement,
                    asNeeded: this.state.dosage.asNeeded,
                    hourly: this.state.dosage.hourly,
                    hours: this.state.dosage.hours,
                    morning: this.state.dosage.morning,
                    afternoon: this.state.dosage.afternoon,
                    evening: this.state.dosage.evening,
                    bedTime: this.state.dosage.bedTime
                }
            })
            .then(res => {
                this.setState({dosage: res.data.dosage, displayDosageForm: false})
            })
        this.getDosage()
    }

    render() {
        return (
            <div>
                { 
                    this.state.displayDosageForm
                    ? <form onSubmit = {this.updateDosage} className="col s12">
                    <div className="row">
                        <div className="col s2">
                            <label htmlFor="number">Dose</label>
                            <input
                                id="number"
                                type="text"
                                name="number"
                                onChange={this.handleChange}
                                value={this.state.dosage.number}
                            />
                        </div>
                        <div className="col s4">
                        <label htmlFor="measurement">Unit</label>
                            <input
                                id="measurement"
                                type="text"
                                name="measurement"
                                onChange={this.handleChange}
                                value={this.state.dosage.measurement}
                            />
                        </div>
                        <div className="col sm6">
                            <p>
                                <input 
                                    type="checkbox"
                                    name="asNeeded" 
                                    />
                                <span>As Needed?</span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                        {
                            this.state.dosage.morning
                            ? <p>
                                <label>
                                <input type="checkbox" checked="checked" onChange={this.checkboxMorning} />
                                <span>Morning</span>
                                </label>
                            </p>
                            :<p>
                                <label>
                                <input type="checkbox" onChange={this.checkboxMorning} />
                                <span>Morning</span>
                                </label>
                            </p>
                        }
                        {
                            this.state.dosage.afternoon
                            ? <p>
                                <label>
                                <input type="checkbox" checked="checked" />
                                <span>Afternoon</span>
                                </label>
                            </p>
                            :<p>
                                <label>
                                <input type="checkbox" />
                                <span>Afternoon</span>
                                </label>
                            </p>
                        }
                        {
                            this.state.dosage.evening
                            ? <p>
                                <label>
                                <input type="checkbox" checked="checked" />
                                <span>Evening</span>
                                </label>
                            </p>
                            :<p>
                                <label>
                                <input type="checkbox" />
                                <span>Evening</span>
                                </label>
                            </p>
                        }
                        {
                            this.state.dosage.bedTime
                            ? <p>
                                <label>
                                <input type="checkbox" checked="checked" />
                                <span>Before Bed</span>
                                </label>
                            </p>
                            :<p>
                                <label>
                                <input type="checkbox" />
                                <span>Before Bed</span>
                                </label>
                            </p>
                        }
                        </div>
                        <div className="col s6">
                            <div className="row">
                            {
                                this.state.dosage.hourly
                                ? <div className="row">
                                    <label>
                                        <input type="checkbox" checked="checked" />
                                    </label>
                                    <label htmlFor="hourly">Every</label>
                                        <input
                                            id="hourly"
                                            type="text"
                                            name="hourly"
                                            onChange={this.handleChange}
                                            value={this.state.dosage.hours}
                                        />
                                    <span>hour(s)</span>
                                </div>
                                :<div className="row">
                                    <label>
                                        <input type="checkbox" />
                                    </label>
                                    <label htmlFor="hourly">Every</label>
                                        <input
                                            id="hourly"
                                            type="text"
                                            name="hourly"
                                            onChange={this.handleChange}
                                            value={this.state.dosage.hours}
                                        />
                                    <span>hour(s)</span>
                                </div>
                            }
                            </div>
                        </div>
                    </div>
                    <ButtonStyled className="green lighten-3">Update Dosage!</ButtonStyled>
                </form>
                : <div className="col s12">
                    <div className="row">
                        <div className="col s6">
                            <p>Dosage: {this.state.dosage.number} {this.state.dosage.measurement}</p>
                        </div>
                        <div className="col sm6">
                            {
                                this.state.dosage.asNeeded
                                ? <p>
                                    <label>
                                    <input type="checkbox" checked="checked" disabled="disabled" />
                                    <span>As Needed</span>
                                    </label>
                                </p>
                                :<p>
                                    <label>
                                    <input type="checkbox" disabled="disabled" />
                                    <span>As Needed</span>
                                    </label>
                                </p>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <form className="col s6">
                            {
                                this.state.dosage.morning
                                ? <p>
                                    <label>
                                    <input type="checkbox" checked="checked" disabled="disabled" />
                                    <span>Morning</span>
                                    </label>
                                </p>
                                :<p>
                                    <label>
                                    <input type="checkbox" disabled="disabled" />
                                    <span>Morning</span>
                                    </label>
                                </p>
                            }
                            {
                                this.state.dosage.afternoon
                                ? <p>
                                    <label>
                                    <input type="checkbox" checked="checked" disabled="disabled" />
                                    <span>Afternoon</span>
                                    </label>
                                </p>
                                :<p>
                                    <label>
                                    <input type="checkbox" disabled="disabled" />
                                    <span>Afternoon</span>
                                    </label>
                                </p>
                            }
                            {
                                this.state.dosage.evening
                                ? <p>
                                    <label>
                                    <input type="checkbox" checked="checked" disabled="disabled" />
                                    <span>Evening</span>
                                    </label>
                                </p>
                                :<p>
                                    <label>
                                    <input type="checkbox" disabled="disabled" />
                                    <span>Evening</span>
                                    </label>
                                </p>
                            }
                            {
                                this.state.dosage.bedTime
                                ? <p>
                                    <label>
                                    <input type="checkbox" checked="checked" disabled="disabled" />
                                    <span>Before Bed</span>
                                    </label>
                                </p>
                                :<p>
                                    <label>
                                    <input type="checkbox" disabled="disabled" />
                                    <span>Before Bed</span>
                                    </label>
                                </p>
                            }
                        </form>
                        <div className="col s6">
                        {
                            this.state.dosage.hourly
                            ? <p>Every {this.state.dosage.hours} Hours</p>
                            : null
                        }
                         </div>
                    </div>
                </div>
                }
                <ButtonStyled onClick = {this.toggleDosageForm}>Change Your Dosage</ButtonStyled>
            </div>
        );
    }
}

export default Dosage;