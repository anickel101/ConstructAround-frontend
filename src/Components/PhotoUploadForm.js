import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

class ImageUploadForm extends React.Component {

    state = {
        image: {},
        description: "",
        user_id: 1,
        project_id: this.props.projectId
    }



    onChange = (e) => {
        e.persist()
        this.setState(() => {
            return {
                [e.target.name]: e.target.files[0]
            }
        })
    }

    onChangeDesc = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    localSubmitHandler = (e) => {
        e.preventDefault()
        const form = new FormData()
        form.append("image", this.state.image)
        form.append("description", this.state.description)
        form.append("user_id", this.state.user_id)
        form.append("project_id", this.state.project_id)
        this.props.addPhoto(form)
        this.setState({
            image: {},
            description: ""
        })
    }


    render() {
        return (
            <Form className="mt-2" onSubmit={this.localSubmitHandler}>
                <Row>
                    <Col>
                        <Form.Control type="file" name="image" onChange={this.onChange} />
                    </Col>
                    <Col className="text-right">
                        <Button variant="primary" size="sm" type="submit">Add</Button>
                    </Col>
                </Row>
                <Form.Label>Image Description:</Form.Label>
                <Form.Control value={this.state.description} type="text" name="description" onChange={this.onChangeDesc} />
            </Form>
        )
    }
}

export default ImageUploadForm