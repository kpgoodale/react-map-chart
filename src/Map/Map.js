import React, { Component } from 'react'
import '../App.css'
import './Map.css';

class Map extends Component {
    constructor(props){
        super(props)
     }

     componentDidMount() {
        let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 43.4598273, lng: -80.5085954 },
          zoom: 13,
          mapTypeId: 'roadmap',
        });

        let marker = new window.google.maps.Marker({
            map: map,
            position: {lat: 43.4598273, lng: -80.5085954}
          });

          marker.addListener('click', () => {
            alert('marker clicked');
          });
      }

     render() {
        return (
          <div id='map'></div>
        );
      }
    }
    export default Map;
