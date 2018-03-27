import React, { Component } from 'react'
import '../App.css'
import './Map.css';

class Map extends Component {
    constructor(props){
        super(props);
     }

     componentDidMount() {
         // Configure the map
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 49.1014, lng: -122.109 },
          zoom: 13,
          mapTypeId: 'roadmap',
        });

        // Configure the markers
        this.props.meters.forEach((meter) => {
            new window.google.maps.Marker({
                map: map,
                position: {lat: meter.latitude, lng: meter.longitude}
            }).addListener('click', (marker) => {
                this.props.changeData(meter.id);
            });
        });
      }

     render() {
        return (
          <div id='map'></div>
        );
      }
    }
    export default Map;
