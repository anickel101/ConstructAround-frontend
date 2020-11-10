import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import BuildingShow from '../Components/BuildingShow'
import ProjectContainer from '../Containers/ProjectContainer'
import PermitContainer from '../Containers/PermitContainer'
import ProjectShow from '../Components/ProjectShow'

class BuildingDataContainer extends React.Component {

    state={
        building: this.props.building
    }

    render() {
        if (this.state.building) {
            return (
                <div className="building-info">
                    <Switch>
                        <Route path="/building/:id/projects/:pid" render={({match}) => <ProjectShow building={this.state.building} windowParams={match.params} addPhoto={this.props.addPhoto} addCommentHandler={this.props.addCommentHandler} />} />
                        <Route path="/building/:id/projects" render={() => <ProjectContainer building={this.state.building} />} />
                        <Route path="/building/:id" render={(windowProps) => <BuildingShow building={this.state.building} windowProps={windowProps} addCommentHandler={this.props.addCommentHandler} />} />
                    </Switch>
                </div>
            )
        } else {
            return (
                <Redirect to="/"/>
            )
        }
    }

}

export default BuildingDataContainer