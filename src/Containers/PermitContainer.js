import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  } from 'react-router-dom';
import { CardGroup } from 'react-bootstrap';
import BuildingMini from '../Components/BuildingMini'
import PermitCard from '../Components/PermitCard'

class PermitContainer extends React.Component {

    findProject = (pid) => {
        return this.props.building.projects.find(p => p.id === pid )
    }

    renderPermitCards = () => {
        let project = this.findProject(parseInt(this.props.windowParams.pid))
        return project.permits.map((permit) => <PermitCard key={permit.id} project={project} permit={permit}/>)
    }

    render() {
        return (
            <div className="permit-container">
                <BuildingMini building={this.props.building} fromPermit={true} projectId={this.props.windowParams.pid}/>
                <CardGroup className="permit-cards">
                    {this.renderPermitCards()}
                </CardGroup>
            </div>
        )
    }
}

export default PermitContainer