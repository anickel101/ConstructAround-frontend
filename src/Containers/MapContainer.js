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
    focus_marker: {},
    viewable_buildings: []
  }

  componentDidMount() {
    this.setState({viewable_buildings: this.props.buildings})
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyle,
      disableDefaultUI: true,
      zoomControl: true
    })
  }

  handleClick = (mapProps, map, event) => {
    this.setState({
      focus_marker: {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    })
  }

  markerClick = (props, marker, event) => {
  }

  renderBuildings = () => {
    if (this.state.viewable_buildings) {
      return this.state.viewable_buildings.map(bldg => <Marker key={bldg.bin} position={{lat: bldg.gis_lat, lng: bldg.gis_long}} />)
    }
  }

  render() {
    return (
      <Map
        google={this.props.google}
        containerStyle={mapContainerDims}
        initialCenter={initialCenter}
        center={this.state.focus_marker}
        zoom={18}
        onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
        onClick={this.handleClick}
        >

        <Marker onClick={this.markerClick} position={{lat: this.state.focus_marker.lat, lng: this.state.focus_marker.lng}} />

        {this.renderBuildings()}

      </Map>

    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);