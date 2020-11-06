import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import BuildingShow from '../Components/BuildingShow'
import ProjectContainer from '../Containers/ProjectContainer'

class BuildingDataContainer extends React.Component {

    state={
        building: this.props.building
    }

    render() {
        console.log("BDC Props: ", this.props)
        if (this.state.building) {
            return (
                <Switch>
                    <Route path="/building/:id/projects" render={() => <ProjectContainer building={this.state.building} />} />
                    <Route path="/building/:id" render={(windowProps) => <BuildingShow building={this.state.building} windowProps={windowProps} />} />
                </Switch>
            )
        } else {
            return (
                <Redirect to="/"/>
            )
        }
    }

}


export default BuildingDataContainer