import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Route, Switch } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';

class CommentContainer extends React.Component {

    state = {

    }

    render() {
        console.log("CommentContainer rendered")
        return (
            <CardGroup>
                <Card className="project-card" style={{ width: '15rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Comments</Card.Title>
                        <Card.Text>
                            Comment input
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        )
    }

}

export default CommentContainer