import React from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
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
    viewable_buildings: [],
    selected: null
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

  renderBuildings = () => {
    if (this.state.viewable_buildings) {
      return this.state.viewable_buildings.map(bldg => <Marker onClick={this.setSelected} key={bldg.bin} info={bldg} position={{lat: bldg.gis_lat, lng: bldg.gis_long}} />)
    }
  }

  renderSelectedToolTip = () => {
    console.log("Inside renderSelected")
    return (
      <InfoWindow marker={this.state.selected} visible={true} onClose={this.clearSelected}>
        <div>
          <h2>Building Here!</h2>
          <p>{this.state.selected.info.bin}</p>
        </div>
    </InfoWindow>
    )
  }

  setSelected = (props, marker, event) => {
    this.setState({selected: marker})
  }

  clearSelected = () => {
    this.setState({selected: null})
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

        <Marker onClick={this.markerClick} icon={{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}} position={{lat: this.state.focus_marker.lat, lng: this.state.focus_marker.lng}} />

        {this.renderBuildings()}
        {this.state.selected ? (this.renderSelectedToolTip()) : null}
      </Map>

    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);