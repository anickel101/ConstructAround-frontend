import React from 'react'
import { Card, Row, Col, Image, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { Link, Redirect, withRouter } from 'react-router-dom'



class ActionBar extends React.Component {

    getImage = () => {
        if (this.props.current_user.img_url) {
            return <Image fluid roundedCircle src={this.props.current_user.img_url} />
        } else {
            return <Image fluid roundedCircle src="https://www.vippng.com/png/detail/416-4161690_empty-profile-picture-blank-avatar-image-circle.png" />
        }
    }

    goToHome = () => {
        console.log("GO HOME")
        this.props.history.push("/login")
    }

    getLoginButton = () => {
        return <Button size="sm" className="mb-2" variant="outline-secondary" onClick={this.goToHome}>Login</Button>
    }

    getLogoutButton = () => {
        return <Button size="sm" className="mb-2" variant="outline-secondary" onClick={this.props.logout}>Logout</Button> 
    }

    searchesDropdown = () => {
        return (
            <Dropdown size="sm">
                <Dropdown.Toggle size="sm" variant="outline-primary" id="dropdown-basic">
                    Searches
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">12 Prospect Ave.</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">599 Johnson Ave.</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">415 9th Street</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    followedsDropdown = () => {
        return (
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
        )
    }

    render() {
        console.log("ActionBar props: ", this.props)
        return (
            <div className="action-bar">
                <Card className="m-2 p-2">
                    <Row>
                        <Col className="mb-2">
                            {this.getImage()}
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
                                {this.props.current_user.username ? this.getLogoutButton() : this.getLoginButton()}
                                {this.props.current_user.username ? this.searchesDropdown() : null}
                                {this.props.current_user.username ? this.followedsDropdown() : null}
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Card>
            </div>
        )
    }
}

export default withRouter(ActionBar)