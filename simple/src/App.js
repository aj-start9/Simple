import React, { Component } from 'react';
import './App.css';
import Order from './components/order';
import Auth from './components/auth';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    this.props.onAuthState(localStorage.getItem('token'));
    console.log(this.props.token)
  }

  componentWillReceiveProps() {
    console.log(this.props.token)
  }
  render() {
    return (
      <div className="App" style={{ borderTop: "100px solid red", height: "100vh" }}>
        <p style={{ fontSize: "50px" }}>Simple</p>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path="/orders" exact component={Order} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onAuthState: ((value) => dispatch({ type: 'authcheck', value: value }))
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
