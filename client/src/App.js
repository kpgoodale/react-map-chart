import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import MeterExplore from './MeterExplore/MeterExplore';
import Table from './Table/Table';
//import { Meter } from './meter.ts';
//import { METERS } from './mock-meters'; 
//import { DEMANDS } from './mock-demands';

class App extends Component {
  constructor(props){
    super(props);
    this.meters = '';
    this.demands = '';
 }

componentDidMount() {
  let getMeters = fetch('meters/', {
    accept: "application/json"
  }).then((response) => {return response.json();})
    .then((data) => this.meters = data);

  let getDemands = fetch('demands/', {
      accept: "application/json"
    }).then((response) => {return response.json();})
      .then((data) => this.demands = data);
}

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Dashboard</h2>
          <nav>
            <Link to="/meter-explore">Meter Explore</Link>
            <Link to="/table">Meter List</Link>
          </nav>
        </div>
        <Route
          path='/meter-explore'
          render={(props) => <MeterExplore {...props} demands={this.demands} meters={this.meters}/> }
        />
        <Route
          path='/table'
          render={(props) => <Table {...props} meters={this.meters}/>}
        />
      </div>
    );
  }
}

export default App;
