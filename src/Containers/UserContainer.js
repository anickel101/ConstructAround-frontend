import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Route, Switch } from 'react-router-dom';
import { Card, CardGroup, ListGroup, Row, Col, Image } from 'react-bootstrap';

class UserContainer extends React.Component {

    findProject = (pid) => {
        return this.props.building.projects.find(p => p.id === pid )
    }

    getStakeholders = () => {

        let project = this.findProject(parseInt(this.props.windowParams.pid))
        console.log("project stakeholders: ", project.stakeholders)
		return project.stakeholders.map((s, i) => {
			return (
				<ListGroup.Item key={i}>
                    <Row>
                        <Col xs={3}>
                            <Image src={s.img_url} roundedCircle fluid />
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={8}>
                                    {s.name}
                                </Col>
                                <Col className="text-right text-muted">
                                    {s.type}
                                </Col>
                            </Row>
                            <Row className="text-muted">
                                <Col>
                                    {s.business}
                                </Col>
                            </Row>
                            <Row className="text-muted">
                                <Col>
                                    {s.phone}
                                </Col>
                            </Row>
 
                        </Col>
                    </Row>
				</ListGroup.Item>
			);
		});
    };

    render() {
        return (
            <CardGroup>
                <Card className="stakeholders-card">
                    <Card.Body>
                        <Card.Title>Project Stakeholders</Card.Title>
                        <ListGroup className="stakeholder-list">
                            {this.getStakeholders()}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </CardGroup>
        )
    }

}

export default UserContainer