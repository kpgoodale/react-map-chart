import React, { Component } from 'react';
import Chart from '../Chart/Chart';
import Map from '../Map/Map';


class MeterExplore extends Component {
    constructor(props){
      super(props);
      this.state = {
        data: this.props.demands,
        selectedMeter: 1
      };
      this.changeData = this.changeData.bind(this);
    }
  
    changeData(i) {
        this.setState({selectedMeter: i});
    }
  
    render() {
      return (
        <div>
            <div>
                <Map 
                  changeData={(i)=>{this.changeData(i)}}
                  meters={this.props.meters}/>
            </div>
            <div>
                <Chart data={this.state.data.filter((demand) => demand.meter == this.state.selectedMeter)} size={[500,500]} />
            </div>
        </div>
      );
    }
}

export default MeterExplore;