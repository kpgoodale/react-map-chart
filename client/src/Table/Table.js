import React, { Component } from 'react'
import '../App.css'
import './Table.css';

class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterOptions: [],
            sortAlgorithms: [
                {
                    compareFunction: (a,b,isAsc) => isAsc ? (a.id - b.id) : (b.id - a.id),
                    isAsc: false,
                    priority: 1,
                    name: "sortId"
                },
                {
                    compareFunction: (a,b,isAsc) => isAsc ? (new Date(a.installed_at) - new Date(b.installed_at)) : (new Date(b.installed_at) - new Date(a.installed_at)),
                    isAsc: true,
                    priority: 0,
                    name: "sortOther"
                }
            ],
            filterValue: ""
        }
        this.handleSortByIdClick = this.handleSortByIdClick.bind(this);
        this.handleSortByDateClick = this.handleSortByDateClick.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
     }

     sortMeters(meters,sortAlgorithms) {
        // put the sortAlgorithms in order by priority (higher priority will overwrite lower priority)
        let sorted = sortAlgorithms.sort((sortOptionA,sortOptionB) => sortOptionA.priority - sortOptionB.priority)
        // use meters for initial values, and incrementally apply the sortAlgorithms based on priority
        .reduce((accumulatedSort,sortOption) => { 
            return accumulatedSort.sort((meterA,meterB) => sortOption.compareFunction(meterA,meterB,sortOption.isAsc))
        }, meters);

        return sorted;
     }

     filterMeters(meters,filterValue) {
        return meters.filter((meter) => filterValue === "" ? true : meter.status === filterValue);
     }

     handleSortByIdClick() {
         //TODO: use more elegant way of setting the state
        let newState = this.state;
        newState.sortAlgorithms.find((element) => element.name == "sortId").priority = 1;
        newState.sortAlgorithms.find((element) => element.name == "sortOther").priority = 0;
        newState.sortAlgorithms.find((element) => element.name == "sortId").isAsc = !newState.sortAlgorithms.find((element) => element.name == "sortId").isAsc;
        this.setState({newState});        
     }

     handleSortByDateClick() {
        //TODO: use more elegant way of setting the state
       let newState = this.state;
       newState.sortAlgorithms.find((element) => element.name == "sortOther").priority = 1;
       newState.sortAlgorithms.find((element) => element.name == "sortId").priority = 0;
       newState.sortAlgorithms.find((element) => element.name == "sortOther").isAsc = !newState.sortAlgorithms.find((element) => element.name == "sortOther").isAsc;
       this.setState({newState});        
    }

    handleFilterChange(event) {
        this.setState({filterValue: event.target.value});
    }

     render() {
        //TODO: this shouldn't be mutating props.meters
        let filteredMeters = this.filterMeters(this.props.meters,this.state.filterValue);
        //TODO: refactor to use filtermeters().sortmeters(). or filter(fn).sort(fn), similar to how .map works
        let rows = this.sortMeters(filteredMeters,this.state.sortAlgorithms).map((meter) => {
            return (
                <tr key={meter.id}>
                    <td>{meter.id}</td>
                    <td>{meter.latitude},{meter.longitude}</td>
                    <td>{meter.status}</td>
                    <td>{meter.postal_code}</td>
                    <td>{meter.location_description}</td>
                    <td>{meter.installed_at}</td>
                </tr>
            );
        });
        return (
        <div>
            <div>
                <select value={this.state.filterValue} onChange={this.handleFilterChange}>
                    <option value="">Filter by</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
                Clicking ID or Installed On header will sort
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th onClick={this.handleSortByIdClick}>ID</th>
                        <th>Lat/Lng</th>
                        <th>Status</th>
                        <th>Postal Code</th>
                        <th>Location Description</th>
                        <th onClick={this.handleSortByDateClick}>Installed On</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
        );
      }
    }
    export default Table;