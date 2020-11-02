import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Component} from "react"
import MapContainer from './Containers/MapContainer'
import DataTest from './Components/DataTest'
import Slider from './Components/Slider'

class App extends Component {

  state = {
    viewable_buildings: [],
    range: 1000
  }

  getBuildings() {
    fetch("http://localhost:3000/buildings")
    .then(res => res.json())
    .then(data => {
        this.setState({
        viewable_buildings: [...data]
      })
    })
  }

  componentDidMount() {
    this.getBuildings()
  }

  updateRange = (newRange) => {
    console.log("In updateRange")
    console.log(newRange)
    this.setState({range: newRange})
  }

  render() {
    return (
      <div>
        {console.log("buildings in state: ",this.state.viewable_buildings)}
        <Slider updateRange={this.updateRange} range={this.state.range}/>
        <MapContainer buildings={this.state.viewable_buildings} range={this.state.range}/>
        <DataTest />
      </div>
    );
  }
}

export default App;
