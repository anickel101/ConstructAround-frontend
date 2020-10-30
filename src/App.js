import './App.css';
import {Component} from "react"
import MapContainer from './Containers/MapContainer'
import DataTest from './Components/DataTest'

class App extends Component {

  state = {
    viewable_buildings: []
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

  render() {
    return (
      <div>
        {console.log("buildings in state: ",this.state.viewable_buildings)}
        <MapContainer buildings={this.state.viewable_buildings}/>
        <DataTest />
      </div>
    );
  }
}

export default App;
