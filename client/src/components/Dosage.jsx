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
                            <label htmlFor="asNeeded">As Needed?</label>
                            {
                                this.state.dosage.asNeeded
                                ? <input
                                    checked
                                    id="asNeeded"
                                    type="checkbox"
                                    name="asNeeded"
                                    onClick={this.checkboxAsNeeded}
                                    value={this.state.dosage.asNeeded}
                                />
                                : <input
                                    id="asNeeded"
                                    type="checkbox"
                                    name="asNeeded"
                                    onClick={this.checkboxAsNeeded}
                                    value={this.state.dosage.asNeeded}
                                />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s6">
                            <div className="row">
                                <label htmlFor="morning">Morning</label>
                                {
                                    this.state.dosage.morning
                                    ? <input
                                        checked
                                        id="morning"
                                        type="checkbox"
                                        name="morning"
                                        onClick={this.checkboxMorning}
                                        value={this.state.dosage.morning}
                                    />
                                    : <input
                                        id="morning"
                                        type="checkbox"
                                        name="morning"
                                        onClick={this.checkboxMorning}
                                        value={this.state.dosage.morning}
                                    />
                                }
                            </div>
                            <div className="row">
                                <label htmlFor="afternoon">Afternoon</label>
                                {
                                    this.state.dosage.afternoon
                                    ? <input
                                        checked
                                        id="afternoon"
                                        type="checkbox"
                                        name="afternoon"
                                        onClick={this.checkboxAfternoon}
                                        value={this.state.dosage.afternoon}
                                    />
                                    :<input
                                        id="afternoon"
                                        type="checkbox"
                                        name="afternoon"
                                        onClick={this.checkboxAfternoon}
                                        value={this.state.dosage.afternoon}
                                    />
                                }
                            </div>
                            <div className="row">
                                <label htmlFor="evening">Evening</label>
                                {
                                    this.state.dosage.evening
                                    ? <input
                                        checked
                                        id="evening"
                                        type="checkbox"
                                        name="evening"
                                        onClick={this.checkboxEvening}
                                        value={this.state.dosage.evening}
                                    />
                                    :<input
                                        id="evening"
                                        type="checkbox"
                                        name="evening"
                                        onClick={this.checkboxEvening}
                                        value={this.state.dosage.evening}
                                    />
                                }
                            </div>
                            <div className="row">
                                <label htmlFor="bedTime">Before Bed</label>
                                {
                                    this.state.dosage.bedTime
                                    ? <input
                                        checked
                                        id="bedTime"
                                        type="checkbox"
                                        name="evening"
                                        onClick={this.checkboxBedTime}
                                        value={this.state.dosage.bedTime}
                                    />
                                    :<input
                                        id="bedTime"
                                        type="checkbox"
                                        name="evening"
                                        onClick={this.checkboxBedTime}
                                        value={this.state.dosage.bedTime}
                                    />
                                }
                            </div>
                        </div>
                        <div className="col s6">
                            <div className="row">
                                <div>
                                    <label htmlFor="hourly">Every</label>
                                    {
                                        this.state.dosage.hourly
                                        ? <input
                                            checked
                                            id="hourly"
                                            type="checkbox"
                                            name="hourly"
                                            onClick={this.checkboxHourly}
                                            value={this.state.dosage.hourly}
                                        />
                                        :<input
                                            id="hourly"
                                            type="checkbox"
                                            name="hourly"
                                            onClick={this.checkboxHourly}
                                            value={this.state.dosage.hourly}
                                        />
                                    }
                                </div>
                                
                                <label htmlFor="hour">hours</label>
                                <input
                                    id="hours"
                                    type="text"
                                    name="hours"
                                    onChange={this.handleChange}
                                    value={this.state.dosage.hours}
                                />
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