import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

class ProjectCard extends React.Component {

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
                            <Link to={`/building/${this.props.project.building_id}/projects/${this.props.project.id}/comments`}>
                                <Button className="ml-2" size="sm" variant="primary">♥</Button>
                            </Link>
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
    }
}

export default ProjectCard