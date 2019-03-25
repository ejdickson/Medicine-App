import React, { Component } from 'react';
import { Footer } from 'react-materialize'

import styled from 'styled-components'

const PageStyle = styled.div`
  width: 100%;
  bottom: 0;
  position: fixed;

  body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }
`

class MyFooter extends Component {
    render() {
        return (
            <PageStyle>
                <Footer className="green lighten-1 white-text" copyrights="2019 Dickson-Designs">
                    <h6 className=""><a className="white-text" href="http://dickson-designs.com">Dickson-Designs Project 3: Medicine App</a></h6>
                </Footer>
            </PageStyle>
            
        )
    }
}

export default MyFooter;