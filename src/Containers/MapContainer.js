import React from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import mapStyle from "../Options/MapStyles"
 
const initialCenter = {
  lat: 40.665889,
  lng: -73.983694
}

const libraries = ["places"]

const mapContainerDims = {
  height: "100vh",
  width: "100vw"
}

class MapContainer extends React.Component {

  state={
    focus_marker: {}
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyle,
      disableDefaultUI: true,
      zoomControl: true
    })
  }

  handleClick = (mapProps, map, event) => {
    console.log("mapProps: ", mapProps)
    console.log("map: ", map)
    console.log("event: ", event)
    console.log(event.latLng.lat())
    this.setState({
      focus_marker: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        containerStyle={mapContainerDims}
        initialCenter={initialCenter}
        center={this.state.focus_marker}
        zoom={16}
        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
        onClick={this.handleClick}
        >

        <Marker position={{lat: this.state.focus_marker, lng: this.state.focus_marker}} />
      </Map>

    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);