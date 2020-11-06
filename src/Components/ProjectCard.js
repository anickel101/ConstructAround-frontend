import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

class ProjectCard extends React.Component {

    render() {
        return (
            <Card className="project-card pb-2" style={{ width: '15rem' }}>
                <Card.Body>
                    <Card.Title>Job Number: {this.props.project.job_num}</Card.Title>
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

                    <Link to={`/building/${this.props.project.building_id}/projects/${this.props.project.id}`}>
                        <Button className="ml-2" size="sm" variant="secondary">See More</Button>
                    </Link>
                        
                </Card.Body>
            </Card>
        )
    }
}

export default ProjectCard