import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import '../App.css';
import BuildingCard from './BuildingCard'

class BuildingShow extends React.Component {

    render() {
        return (
            <div className="building-show">
                <BuildingCard building={this.props.building}/>
            </div>
        )
    }
}

export default BuildingShow