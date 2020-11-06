import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button} from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import '../App.css';
import BuildingCard from './BuildingCard'
import PermitContainer from '../Containers/PermitContainer.js'
import ProjectCard from './ProjectCard'
import UserContainer from '../Containers/UserContainer'
import CommentContainer from '../Containers/CommentContainer'

class ProjectShow extends React.Component {

    render() {
        return (
            <div className="building-show">
                <BuildingCard />
                <ProjectCard />
                <PermitContainer />
                <UserContainer />
                <CommentContainer />
            </div>
        )
    }
}

export default ProjectShow