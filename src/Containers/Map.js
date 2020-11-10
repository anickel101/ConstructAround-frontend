import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import mapStyle from "../Options/MapStyles"


const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };
  
  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
  };

class Map extends Component {

  renderBuildingMarkers = () => {
      return this.props.buildings.map(bldg => <Marker key={bldg.id} bldg={bldg} onClick={() => this.props.setSelected(bldg)} position={{lat: bldg.gis_lat, lng: bldg.gis_long}}/>)
  }

  componentDidMount() {
      this.mapRef = React.createRef()
  }


  renderSearchCenter = () => {
    return (
      <Circle
      radius={5}
      center={this.props.center}
      strokeColor='transparent'
      strokeOpacity={0}
      strokeWeight={5}
      fillColor='blue'
      fillOpacity={0.2}
    />
    )
  }

  renderSearchCircle = () => {
    return (
      <Circle
      radius={this.props.range*1.1}
      center={this.props.center}
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

  render() {
    return (
        <div>
            <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={this.props.center}
            zoom={16}
            options={options}
            ref={this.mapRef}
            >

                {this.renderBuildingMarkers()}

                {this.renderSearchCenter()}

                {this.renderSearchCircle()}

                {this.props.selected ? (<InfoWindow position={{lat: this.props.selected.gis_lat, lng: this.props.selected.gis_long}} onCloseClick={this.props.clearSelected} >
                    <div>
                        <h5>Building!</h5>
                        <p>BIN: {this.props.selected.bin}</p>
                        <Link to={`/building/${this.props.selected.id}`} id={`${this.props.selected.id}`}>See More</Link>
                    </div>
                </InfoWindow>) : null}

            </GoogleMap>
        </div>
    )
  }

}

export default Map