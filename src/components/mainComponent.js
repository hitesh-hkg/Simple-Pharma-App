import React, { Component } from 'react';
import { Switch, Route, Redirect , withRouter } from 'react-router-dom';
import Header from './headerComponent';
import Home from './homeComponent';
import Orders from './ordersComponent';
class Main extends Component {
  constructor(props) {
    super(props);
    this.state={
        orders:null
    }
  }
  render() {
    return (
      <div className="Main">
          <Header/>
          <Switch>
              <Route path='/home' component={()=><Home />} />
              <Route path='/orders' component={() => <Orders/>} />
              <Redirect to="/home" />
          </Switch>
      </div>
    );
  }
}

export default Main;