import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

class ProjectCard extends React.Component {

    followButtonHandler = () => {
        if (this.props.project.stakeholders.find(s => s.id === this.props.current_user.id)) {
            return <Button className="ml-2" onClick={this.unfollowHandler} size="sm" variant="outline-danger">♡</Button>
        } else {
            return  <DropdownButton size="sm" id="follow-button" title="♥">
                        <Dropdown.ItemText className="text-muted">Type:</Dropdown.ItemText>
                        <Dropdown.Item as="button" value="owner" onClick={this.followHandler}>owner</Dropdown.Item>
                        <Dropdown.Item as="button" value="applicant" onClick={this.followHandler}>applicant</Dropdown.Item>
                        <Dropdown.Item as="button" value="contractor" onClick={this.followHandler}>contractor</Dropdown.Item>
                        <Dropdown.Item as="button" value="follower" onClick={this.followHandler}>follower</Dropdown.Item>
                    </DropdownButton>
        }
    }

    unfollowHandler = () => {
        let follow = this.props.current_user.user_projects.find(up => up.project_id === this.props.project.id)
        console.log("At ProjectCard, followId = ", follow)
        this.props.unfollowHandler(follow.id)
    }

    followHandler = (e) => {
        console.log("CLICKED", e.target.value, this.props.current_user.id, this.props.project.id )

        let follow = {
            user_id: this.props.current_user.id,
            project_id: this.props.project.id,
            category: e.target.value
        }
    
        this.props.followHandler(follow)
    }

    buttons = () => {
        if (this.props.buttons === true) {
            return (
                <React.Fragment>
                    <Row>
                        <Col xs={10}>
                            <Link to={`/building/${this.props.project.building_id}/projects/${this.props.project.id}/permits`}>
                                <Button className="ml-2" size="sm" variant="secondary">Permits</Button>
                            </Link>

                            <Link to={`/building/${this.props.project.building_id}/projects/${this.props.project.id}/photos`}>
                                <Button className="ml-2" size="sm" variant="secondary">Photos</Button>
                            </Link>

                            <Link to={`/building/${this.props.project.building_id}/projects/${this.props.project.id}/comments`}>
                                <Button className="ml-2" size="sm" variant="secondary">Comments</Button>
                            </Link>

                            <Link to={`/building/${this.props.project.building_id}/projects/${this.props.project.id}/stakeholders`}>
                                <Button className="ml-2" size="sm" variant="secondary">Stakeholders</Button>
                            </Link>
                        </Col>
                        <Col className="text-right">
                            {this.followButtonHandler()}
                        </Col>
                    </Row>
                </React.Fragment>
            )
        } else {
            return (
                <Link to={`/building/${this.props.project.building_id}/projects/${this.props.project.id}`}>
                    <Button className="ml-2" size="sm" variant="secondary">See More</Button>
                </Link>
            )
        }
    }

    closeButton = () => {
        return (
            <Link to={`/building/${this.props.project.building_id}/projects`}>
                <Button className="ml-2" size="sm" variant="outline-secondary">X</Button>
            </Link>
        )
    }

    render() {
        if (this.props.project) {
            return (
                <Card className="project-card mb-2">
                    <Card.Body>
                        <Card.Title>
                            <Row>
                                <Col xs={10}>
                                    Job Number: {this.props.project.job_num}
                                </Col>
                                <Col className="text-right">
                                    {this.closeButton()}
                                </Col>
                            </Row></Card.Title>
                        <Card.Text className="mb-2 text-muted">
                            <Container>
                                <Row>
                                    <Col>
                                        Job Type: {this.props.project.job_type}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Job Description: {this.props.project.job_description ? this.props.project.job_description : "N/A"}
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Text>
    
                        {this.buttons()}
    
                    </Card.Body>
                </Card>
            )
        } else {
            return null
        }

    }
}

export default ProjectCard