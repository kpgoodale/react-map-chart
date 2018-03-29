import React, { Component } from 'react'
import '../App.css'
import './Chart.css';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { axisLeft } from 'd3-axis';

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
        const margin = {top: 20, right: 20, bottom: 30, left: 50};
        const dataMax = max(this.props.data.map((data) => Number(data.value)));
        const width = this.props.size[0] - margin.left - margin.right;
        const height = this.props.size[1] - margin.top - margin.bottom;
        const xScale = scaleLinear().domain([0,this.props.data.length]).range([0,width]);
        const yScale = scaleLinear().domain([0,dataMax]).range([height,0]);

        const yAxis = axisLeft()
            .scale(yScale)
            .ticks(5);
        
        const lineGenerator = line()
            .x((d) => {
                return xScale(new Date(Date.parse(d.time)).getHours());
            })
            .y((d) => {
                return yScale(d.value);
            });

        select(node).selectAll('g').remove();
        let svg = select(node).append("g").attr("transform", "translate(" + margin.left +"," + margin.top +")");
        svg.append("g")
            .append('svg:path').attr('d',lineGenerator(this.props.data));
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
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