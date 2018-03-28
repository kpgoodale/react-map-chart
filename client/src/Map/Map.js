import React, { Component } from 'react'
import '../App.css'
import './Map.css';

class Map extends Component {
    constructor(props){
        super(props);
        this.map = null;
     }

    componentDidMount() {
        this.addMap();
        this.addMarkers(this.map);
    }

    shouldComponentUpdate() { return true };

    componentDidUpdate() {
        this.addMarkers(this.map);
    }

    addMap() {
        this.map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 49.1014, lng: -122.109 },
            zoom: 13,
            mapTypeId: 'roadmap',
        });
    }

    addMarkers(map) {
        this.props.meters.forEach((meter) => {
            let marker = new window.google.maps.Marker({
                map: map,
                position: {lat: meter.latitude, lng: meter.longitude}
            });
            let infoWindowContent = "<ul class='infoWindow'>"
                + "<li> ID: " + meter.id + "</li>"
                + "<li> Latitude: " + meter.latitude + "</li>"
                + "<li> Longitude: " + meter.longitude + "</li>"
                + "<li> Status: " + meter.status + "</li>"
                + "<li> Postal Code: " + meter.postal_code + "</li>"
                + "<li> Location Description: " + meter.location_description + "</li>"
                + "<li> Installed At: " + meter.installed_at + "</li>"
                + "</ul>";
            let infoWindow = new window.google.maps.InfoWindow({
                content: infoWindowContent
            });
            marker.addListener('click', () => {
                this.props.changeData(meter.id);
            });
            marker.addListener('mouseover',()=> {
                infoWindow.open(map,marker);
            });
            marker.addListener('mouseout',()=> {
                infoWindow.close();
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
