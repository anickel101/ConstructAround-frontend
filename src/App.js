import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Component } from "react"
import { Route, withRouter } from 'react-router-dom'

import SearchBar from './Components/SearchBar'
import Map from './Containers/Map'
import Title from './Components/Title'
import Slider from './Components/Slider'
import BuildingDataContainer from './Containers/BuildingDataContainer'

class App extends Component {

  state = {
    buildings: [],
    range: 400,
    center: {
      lat: 40.665889,
      lng: -73.983694
    },
    selected: null
  }

  componentDidMount() {
    this.getBuildings()
  }

  getBuildings() {
    fetch("http://localhost:3000/buildings")
      .then(res => res.json())
      .then(data => {
        this.setState({ buildings: data })
      })
  }

  updateRange = (newRange) => {
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    let searchLat = this.coordToString(this.state.center.lat)
    let searchLng = this.coordToString(this.state.center.lng)

    // BUG: need to make sure center lat/long are 6 decimalsm per NYC data
    // console.log(`http://localhost:3000/buildings/${searchLat}/${searchLng}/${newRange}`)

    fetch(`http://localhost:3000/buildings/${searchLat}/${searchLng}/${newRange}`, options)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          buildings: data,
          range: newRange
        })
      })
  }

  updateCenter = (newLat, newLng) => {
    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    let choppedLat = newLat.toFixed(6)
    let choppedLng = newLng.toFixed(6)

    let searchLat = String(choppedLat.replace(".", ""))
    let searchLng = String(choppedLng.replace(".", ""))

    fetch(`http://localhost:3000/buildings/${searchLat}/${searchLng}/${this.state.range}`, options)
      .then(resp => resp.json())
      .then(data => {
        // console.log("buildings after updateCenter(): ", data)
        this.setState({
          buildings: data,
          center: {
            lat: parseFloat(choppedLat),
            lng: parseFloat(choppedLng)
          }
        })
      })
  }

  coordToString = (coord) => {
    return coord.toString().replace(".", "")
  }

  selected = () => {
    let split = this.props.location.pathname.split("/")
    console.log("Building ID: ", parseInt(split[2]))
    console.log("Building Data: ", this.state.buildings.find(b => b.id === parseInt(split[2])))
    return this.state.buildings.find(b => b.id === parseInt(split[2]))
  }

  setSelected = (bldg) => {
    this.setState({selected: bldg})
  }

  clearSelected = () => {
    this.setState({selected: null})
  }

  render() {
    console.log("App rendering...")

    return (
      <div>
          <Title />
          <SearchBar center={this.state.center} updateCenter={this.updateCenter} search={this.search}/>
          <Slider range={this.state.range} updateRange={this.updateRange} />
          <Map buildings={this.state.buildings} range={this.state.range} center={this.state.center} selected={this.state.selected} setSelected={this.setSelected} clearSelected={this.clearSelected} />

          <Route path="/building" render={(windowProps) => <BuildingDataContainer building={this.selected()} windowProps={windowProps}/>} />
      </div>

    );
  }
}

export default withRouter(App);