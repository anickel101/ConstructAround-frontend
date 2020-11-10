import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import pluralize from 'pluralize'

const boroNums = {
    "MANHATTAN": 1,
    "BRONX": 2,
    "BROOKLYN": 3,
    "QUEENS": 4,
    "STATEN ISLAND": 5
}

class BuildingCard extends React.Component {

    getStreetView = () => {

        let location = this.props.building.full_address
        let size = "600x300"
        let key = process.env.REACT_APP_GOOGLE_API_KEY

        return `https://maps.googleapis.com/maps/api/streetview?location=${location}&size=${size}&key=${key}`

    }

    projectCount = () => {
        return this.props.building.projects.length
    }

    boroNum = () => {
        return boroNums[this.props.building.borough]
    }

    render() {
        console.log("Building Card project prop: ", this.props.building)
        return (
            <Card className="building-card pb-2" >
                <Card.Img className="building-card-img p-2" variant="top" src={this.getStreetView()} />
                <Card.Body className="pt-1">
                    <Card.Title as="h5">{this.props.building.full_address}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                    <Card.Text>
                        <Container>
                            <Row>
                                <Col>BIN: {this.props.building.bin}</Col>
                                <Col>Block: {this.props.building.block}</Col>
                            </Row>
                            <Row>
                                <Col>Lot: {this.props.building.lot}</Col>
                                <Col>Boro: {this.boroNum()}</Col>
                            </Row>
                            <Row>
                                <Col>This building has {pluralize('project', this.projectCount(), true)} active.</Col>
                            </Row>
                        </Container>
                    </Card.Text>
                    <Row>
                        <Col xs={2}>
                            <Link to={`/building/${this.props.building.id}/projects`}>
                                <Button className="ml-2" size="sm" variant="primary">Projects</Button>
                            </Link>
                        </Col>
                        <Col xs={4}>
                            <Button className="ml-2" size="sm" variant="secondary" href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${this.boroNum()}&houseno=${this.props.building.house_num}&street=${this.props.building.street_name}`} target="_blank">More at DOB</Button>
                        </Col>
                        <Col xs={6} className="text-right">
                            <Link to="/">
                                <Button className="ml-2" size="sm" variant="outline-secondary">X</Button>
                            </Link>
                        </Col>
                    </Row>


                </Card.Body>
            </Card>
        )
    }
}

// path="/building/:id/projects"

export default BuildingCard