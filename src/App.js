import React, { Component } from 'react';
import './App.css';
import Chart from './Chart/Chart';
import Map from './Map/Map';
//import { Meter } from './meter.ts';
import { METERS } from './mock-meters'; 
import { DEMANDS } from './mock-demands';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: DEMANDS,
      selectedMeter: 1
    };
    this.changeData = this.changeData.bind(this);
 }

 changeData(i) {
  this.setState({selectedMeter: i});
}

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2 onClick={this.changeData}>Dashboard</h2>
        </div>
        <div>
          <Map 
            changeData={(i)=>{this.changeData(i)}}
            meters={METERS}/>
        </div>
        <div>
          <Chart data={this.state.data.filter((demand) => demand.meter == this.state.selectedMeter)} size={[500,500]} />
        </div>
      </div>
    );
  }
}

export default App;
