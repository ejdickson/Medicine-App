import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navigation from './components/Navigation'
import UsersList from './components/UsersList'
import SingleUser from './components/SingleUser'
import MedicineList from './components/MedicinesList'
import SingleMedicine from './components/SingleMedicine'
import MyFooter from './components/MyFooter'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path = "/" component = { UsersList } />
            <Route exact path = "/:id" component = { SingleUser } />
            <Route exact path = "/:id/medicines" component = { MedicineList } />
            <Route exact path = "/:id/medicines/:id" component = { SingleMedicine } />
          </Switch>
          <MyFooter />
        </div>
      </Router>
    )
  }
}

export default App;
