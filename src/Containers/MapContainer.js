import React from 'react'
import {Map, GoogleApiWrapper, Marker, InfoWindow, Circle} from 'google-maps-react';
import mapStyle from "../Options/MapStyles"
 
const initialCenter = {
  lat: 40.665889,
  lng: -73.983694
}

const mapContainerDims = {
  height: "100vh",
  width: "100vw"
}

class MapContainer extends React.Component {

  state={
    focus_marker: {},
    viewable_buildings: [],
    selected: null,
    center: {}
  }

  componentDidMount() {
    this.setState({
      viewable_buildings: this.props.buildings,
      center: initialCenter
    })
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
    if (this.props.buildings) {
      return this.props.buildings.map(bldg => <Marker onClick={this.setSelected} key={bldg.bin} info={bldg} position={{lat: bldg.gis_lat, lng: bldg.gis_long}} />)
    }
  }

  renderSearchedBuildings = () => {
    if (this.props.searched_buildings) {
      return this.props.searched_buildings.map(bldg => <Marker onClick={this.setSelected} key={bldg.bin} info={bldg} position={{lat: bldg.gis_lat, lng: bldg.gis_long}} icon={{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
      />)
    }
  }

  renderSearchCircle = () => {
    if (this.state.center.lat) {
      return (
        <Circle
        radius={this.props.range*1.27}
        center={this.state.center}
        onMouseover={() => console.log('mouseover')}
        onClick={() => console.log('click')}
        onMouseout={() => console.log('mouseout')}
        strokeColor='transparent'
        strokeOpacity={0}
        strokeWeight={5}
        fillColor='#FF0000'
        fillOpacity={0.2}
      />
      )
    }
  }

  renderSelectedToolTip = () => {
    return (
      <InfoWindow marker={this.state.selected} visible={true} onClose={this.clearSelected}>
        <div>
          <h2>Building Here!</h2>
          <p>{this.state.selected.info.bin}</p>
          <p>Lat: {this.state.selected.info.gis_lat}</p>
          <p>Long: {this.state.selected.info.gis_long}</p>
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

        {this.renderSearchCircle()}

        {this.renderBuildings()}
        {this.renderSearchedBuildings()}

        {this.state.selected ? (this.renderSelectedToolTip()) : null}
      </Map>

    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);