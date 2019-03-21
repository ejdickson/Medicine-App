import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import UsersList from './components/UsersList'
import SingleUser from './components/SingleUser'
import MedicineList from './components/MedicinesList'
import SingleMedicine from './components/SingleMedicine'
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path = "/" component = { UsersList } />
            <Route exact path = "/:id" component = { SingleUser } />
            <Route exact path = "/:id/medicines" component = { MedicineList } />
            <Route exact path = "/:id/medicines/:id" component = { SingleMedicine } />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
