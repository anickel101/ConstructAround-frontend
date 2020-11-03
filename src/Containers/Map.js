import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow, Circle } from '@react-google-maps/api';
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

    state={
        selected: null
    }

    renderBuildingMarkers = () => {
        return this.props.buildings.map(bldg => <Marker key={bldg.id} bldg={bldg} onClick={() => this.setSelected(bldg)} position={{lat: bldg.gis_lat, lng: bldg.gis_long}}/>)
    }

    componentDidMount() {
        this.mapRef = React.createRef()
    }

    setSelected = (bldg) => {
        this.setState({
            selected: bldg
        })
      }
    
      clearSelected = () => {
        this.setState({selected: null})
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
            radius={this.props.range*1.0}
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

                    {this.state.selected ? (<InfoWindow position={{lat: this.state.selected.gis_lat, lng: this.state.selected.gis_long}} onCloseClick={this.clearSelected} >
                        <div>
                            <h5>Building!</h5>
                            <p>BIN: {this.state.selected.bin}</p>
                            <p>Lat: {this.state.selected.gis_lat}</p>
                            <p>Lon: {this.state.selected.gis_long}</p>
                        </div>
                    </InfoWindow>) : null}

                </GoogleMap>
            </div>
        )
    }

}

export default Map