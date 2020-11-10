import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Card, Button} from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import '../App.css';
import BuildingMini from './BuildingMini'
import PermitContainer from '../Containers/PermitContainer.js'
import ProjectCard from './ProjectCard'
// import UserContainer from '../Containers/UserContainer'
import CommentContainer from '../Containers/CommentContainer'
import PhotoContainer from '../Containers/PhotoContainer'
import UserContainer from '../Containers/UserContainer'

class ProjectShow extends React.Component {

    findProject = (pid) => {
        return this.props.building.projects.find(p => p.id === pid )
    }

    render() {
        return (
            <div className="project-show">
                <BuildingMini building={this.props.building}/>
                <ProjectCard buttons={true} project={this.findProject(parseInt(this.props.windowParams.pid))}/>
                <Switch>
                    <Route path="/building/:id/projects/:pid/permits" render={() => <PermitContainer building={this.props.building} windowParams={this.props.windowParams}/>} />
                    <Route path="/building/:id/projects/:pid/photos" render={() => <PhotoContainer building={this.props.building} windowParams={this.props.windowParams} addPhoto={this.props.addPhoto}/>} />
                    <Route path="/building/:id/projects/:pid/comments" render={() => <CommentContainer building={this.props.building} windowParams={this.props.windowParams} addCommentHandler={this.props.addCommentHandler}/>} />
                    <Route path="/building/:id/projects/:pid/stakeholders" render={() => <UserContainer building={this.props.building} windowParams={this.props.windowParams}/>} />
                </Switch>
            </div>
        )
    }
}

export default ProjectShow