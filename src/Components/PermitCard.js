import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

class PermitCard extends React.Component {

    render() {
        return (
            <Card className="permit-card pb-2">
                <Card.Body>
                    <Card.Title>Permit Number: {this.props.permit.sign_number}</Card.Title>
                    <Card.Text className="mb-2 text-muted">
                        <Container>
                            <Row>
                                <Col>
                                    Status: {this.props.permit.permit_status}
                                </Col>
                                <Col>
                                    Work Type: {this.props.permit.work_type}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Issued: {this.props.permit.issued_date}
                                </Col>
                                <Col>
                                    Expires: {this.props.permit.expiration_date}
                                </Col>
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default PermitCard