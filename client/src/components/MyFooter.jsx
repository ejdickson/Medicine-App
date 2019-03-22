import React, { Component } from 'react';
import { Footer } from 'react-materialize'

class MyFooter extends Component {
    render() {
        return (
            <Footer copyrights="2019 Dickson-Designs" className='example'>
                <h5 className="white-text">Dickson-Designs</h5>
                <p className="grey-text text-lighten-4">Description of why built</p>
            </Footer>
        )
    }
}

export default MyFooter;