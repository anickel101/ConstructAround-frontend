import './App.css';
import {Component} from "react"
import MapContainer from './Containers/MapContainer'
import DataTest from './Components/DataTest'

class App extends Component {

  render() {
    return (
      <div>
        <MapContainer />
        <DataTest />
      </div>
    );
  }
}

export default App;
