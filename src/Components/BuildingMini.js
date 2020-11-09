import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';
import pluralize from 'pluralize'
import Avatar from 'react-avatar';


const boroNums = {
    "MANHATTAN": 1,
    "BRONX": 2,
    "BROOKLYN": 3,
    "QUEENS": 4,
    "STATEN ISLAND": 5
}

class BuildingMini extends React.Component {

    backToProjectButton = () => {
        if (this.props.fromPermit) {
            return (
                <Link to={`/building/${this.props.building.id}/projects/${this.props.projectId}`}>
                    <Button className="ml-2" size="sm" variant="secondary">Back to Project</Button>
                </Link>
            )
        } else {
            return null
        }
    }

    projectCount = () => {
        return this.props.building.projects.length
    }

    boroNum = () => {
        return boroNums[this.props.building.borough]
     }

     closeButton = () => {
         return (
            <Link to="/">
                <Button className="ml-2" size="sm" variant="danger">X</Button>
            </Link>
         )
     }

    render() {
        return (
            <div className="building-mini pb-2">
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title as="h5">
                            <Row>
                                <Col xs={10}>
                                    {this.props.building.full_address}
                                </Col>
                                <Col className="text-right">
                                    {this.closeButton()}
                                </Col>
                            </Row>
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">This building has {pluralize('project', this.projectCount(), true)} active.</Card.Subtitle>
                            <Link to={`/building/${this.props.building.id}`}>
                                <Button className="ml-2" size="sm" variant="primary">Back to Building</Button>
                            </Link>
                            <Button className="ml-2" size="sm" variant="secondary" href={`http://a810-bisweb.nyc.gov/bisweb/PropertyProfileOverviewServlet?boro=${this.boroNum()}&houseno=${this.props.building.house_num}&street=${this.props.building.street_name}`}>More at DOB</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default BuildingMini