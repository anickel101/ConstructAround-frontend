import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardGroup } from 'react-bootstrap';
import BuildingMini from '../Components/BuildingMini'
import ProjectCard from '../Components/ProjectCard'

class ProjectContainer extends React.Component {

    renderProjectCards = () => {
        let cards = this.props.building.projects.map((project) => <ProjectCard key={project.id} project={project} />)
        console.log(cards)
        return cards
    }

    render() {
        console.log("In Project Container... ", this.props.building.projects)
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