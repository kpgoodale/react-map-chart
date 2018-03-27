import React, { Component } from 'react';
import './App.css';
import Chart from './Chart/Chart';
import Map from './Map/Map';
//import { Meter } from './meter.ts';
import { METERS } from './mock-meters'; 
//import { DEMANDS } from './mock-demands';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {data: [
      {time:0, value:5},
      {time:1, value:10},
      {time:2, value:1},
      {time:3, value:3},
      {time:4, value:6},
      {time:5, value:7},
      {time:6, value:11},
      {time:7, value:5},
      {time:8, value:7}
    ]};
    this.changeData = this.changeData.bind(this);
 }

 changeData(i) {
   alert(i);
  this.setState({data: [
    {time:0, value:5},
    {time:1, value:10},
    {time:2, value:1}
  ]});
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
          <Chart data={this.state.data} size={[500,500]} />
        </div>
      </div>
    );
  }
}

export default App;
