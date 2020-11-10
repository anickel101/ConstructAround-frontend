import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  } from 'react-router-dom';
import { Card, Row, Col, Button, ListGroup, FormControl, InputGroup } from 'react-bootstrap';

class CommentContainer extends React.Component {

    state={
        project_id: this.props.windowParams.pid,
        content: "",
        user_id: 1
    }

    findProject = (pid) => {
        return this.props.building.projects.find(p => p.id === pid )
    }

    // showForm = () => {
    //     this.setState(prevState => {
    //         return ({
    //             form: !prevState.form
    //         })
    //     })
    // }

    changeHandler = (e) => {
        this.setState({content: e.target.value})
    }

    localClickHandler = () => {
        this.props.addCommentHandler(this.state)
        this.setState({
            content: ""
        })
    }

    renderNewCommentInput = () => {
        return (
            <div>
            <InputGroup className="mb-1">
                <FormControl value={this.state.content} onChange={this.changeHandler} as="textarea" aria-label="With textarea" />
            </InputGroup>
            <Button size="sm" onClick={this.localClickHandler}>Add Comment</Button>
            </div>
        )
    }

    renderComments = () => {
        let project = this.findProject(parseInt(this.props.windowParams.pid))
        console.log("Comments: ", project.comments)
        return project.comments.map((c, i) => <ListGroup.Item variant="light" className="text-muted" key={i}>{`${c.post_date} - ${c.name}:  ${c.content}`}</ListGroup.Item>)        
    }

    render() {
        return (
            <div>
                <div className="comment-board pb-2">
                    <Card>
                        <Card.Body>
                            <Card.Title as="h5">
                                <Row>
                                    <Col>
                                        Comments:
                                    </Col>
                                    {/* <Col className="text-right">
                                        <Button onClick={this.showForm} variant="secondary" size="sm">{this.state.form ? "Close Form" : "Make Comment"}</Button>
                                    </Col> */}
                                </Row>
                            </Card.Title>
                            <Card.Text>
                                <ListGroup className="comment-list mb-1" >
                                    {this.renderComments()}
                                </ListGroup>
                                {this.renderNewCommentInput()}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}

export default CommentContainer