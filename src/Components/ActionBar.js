import React from 'react'
import { Card, Row, Col, Image, Button, ButtonGroup, Dropdown } from 'react-bootstrap';


class ActionBar extends React.Component {

    render() {
        return (
            <div className="action-bar">
                <Card className="m-2 p-2">
                    <Row>
                        <Col className="mb-2">
                            <Image fluid src="https://assets.website-files.com/5e7dea65020852f342803d4e/5e8f5ac1e800669015545d59_The%20Kai%20Bond%20-%20Black%20Men%20Talk%20Tech.jpg" roundedCircle fluid />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center mb-2">
                            Welcome!
                        </Col>
                    </Row>
                    <Row >
                        <Col>
                            <ButtonGroup vertical size="sm" style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button className="mb-2" variant="outline-secondary">Logout</Button>
                                <Button className="mb-2" variant="outline-primary">Searches</Button>
                                <Dropdown size="sm">
                                    <Dropdown.Toggle size="sm" variant="outline-primary" id="dropdown-basic">
                                        Followeds
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">12 Prospect Ave.</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">599 Johnson Ave.</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">415 9th Street</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default ActionBar