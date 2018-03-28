import React, { Component } from 'react'
import '../App.css'
import './Table.css';

class Table extends Component {
    constructor(props){
        super(props);
        this.state = {
            sortedMeters: this.props.meters
        };
        this.sortById = this.sortById.bind(this);
     }


     componentDidMount() {
        
     }

     sortById() {
        /*
        let sortedMeters = this.state.sortedMeters.sort((a,b) => a.id - b.id);
        console.log(sortedMeters);
        this.setState({sortedMeters: sortedMeters});
        */
     }


     render() {
        
        let rows = this.props.meters.map((meter) => {
            return (
                <tr>
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
          <table class='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Lat/Lng</th>
                    <th>Status</th>
                    <th>Postal Code</th>
                    <th>Location Description</th>
                    <th>Installed On</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
        );
      }
    }
    export default Table;