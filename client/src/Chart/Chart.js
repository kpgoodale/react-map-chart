import React, { Component } from 'react'
import '../App.css'
import './Chart.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';

class Chart extends Component {
    constructor(props){
        super(props)
        this.createLineChart = this.createLineChart.bind(this)
     }

     componentDidMount() {
        this.createLineChart();
     }

     componentDidUpdate() {
        this.createLineChart();
     }

     createLineChart() {
        const node = this.node
        const dataMax = max(this.props.data.map((data) => data.value));
        const xScale = scaleLinear().domain([0,this.props.data.length]).range([0,this.props.size[1]]);
        const yScale = scaleLinear().domain([0,dataMax]).range([this.props.size[0],0]);
        
        const lineGenerator = line()
            .x((d) => {
                return xScale(new Date(Date.parse(d.time)).getHours());
            })
            .y((d) => {
                return yScale(d.value);
            });

        select(node).selectAll('path').remove();
        select(node).append('svg:path').attr('d',lineGenerator(this.props.data));
     }
  
    render() {
      return (
        <svg ref={node => this.node = node}
            width={500} height={500}>
        </svg>
      );
    }
  }
  export default Chart;