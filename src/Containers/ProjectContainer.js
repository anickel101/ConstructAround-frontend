import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup } from 'react-bootstrap';
import BuildingMini from '../Components/BuildingMini'
import ProjectCard from '../Components/ProjectCard'
import Avatar from 'react-avatar';


class ProjectContainer extends React.Component {

    renderProjectCards = () => {
        return this.props.building.projects.map((project) => <ProjectCard key={project.id} project={project} />)
    }

    render() {
        return (
            <div className="project-container">
                <BuildingMini building={this.props.building}/>
                <CardGroup className="project-cards">
                    {this.renderProjectCards()}
                </CardGroup>
            </div>
        )
    }
}

export default ProjectContainer