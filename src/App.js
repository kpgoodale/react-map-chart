import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import MeterExplore from './MeterExplore/MeterExplore';
import Table from './Table/Table';
//import { Meter } from './meter.ts';
import { METERS } from './mock-meters'; 
import { DEMANDS } from './mock-demands';

class App extends Component {
  constructor(props){
    super(props);
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
          render={(props) => <MeterExplore {...props} demands={DEMANDS} meters={METERS}/> }
        />
        <Route
          path='/table'
          render={(props) => <Table {...props} meters={METERS}/>}
        />
      </div>
    );
  }
}

export default App;
