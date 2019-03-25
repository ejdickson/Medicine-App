import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import Navigation from './components/Navigation'
import UsersList from './components/UsersList'
import FullUserPage from './components/FullUserPage'
import SingleMedicine from './components/SingleMedicine'
import MyFooter from './components/MyFooter'

const PageView = styled.div `
  margin: 0 auto;
  margin-bottom: 150px;
`

class App extends Component {
  render() {
    return (
      <Router>
        <PageView>
          <Navigation className="page-header"/>
          <Switch className="page-main">
            <Route exact path = "/" component = { UsersList } />
            <Route exact path = "/:userId" component = { FullUserPage } />
            <Route exact path = "/:userId/medicines/:medicineId" component = { SingleMedicine } />
          </Switch>
            <MyFooter className="page-footer"/>
        </PageView>
      </Router>
    )
  }
}

export default App;
