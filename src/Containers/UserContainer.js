import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Route, Switch } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';

class UserContainer extends React.Component {

    state = {

    }

    render() {
        console.log("UserContainer rendered")
        return (
            <CardGroup>
                <Card className="project-card" style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Users Go Here</Card.Title>
                    </Card.Body>
                </Card>
            </CardGroup>
        )
    }

}

export default UserContainer