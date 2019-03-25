import React, { Component } from 'react';

import SingleUser from './SingleUser'
import MedicinesList from './MedicinesList'


class FullUserPage extends Component {
    state = {
        userId: this.props.match.params.userId,
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 m4 l3">
                    <SingleUser userId={this.state.userId}/>
                </div>
                <div className= "col s12 m8 l9">
                    <MedicinesList userId={this.state.userId}/>
                </div>
            </div>
        );
    }
}

export default FullUserPage;