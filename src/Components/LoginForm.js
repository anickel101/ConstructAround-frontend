import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {

    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.login(this.state)
        // this.setState({username: "", password: ""})
    }

    render() {
        return (
            <Container className="pt-3 login-overlay text-muted">
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Control size="sm" type="text" name="username" placeholder="Username..." value={this.state.username} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control size="sm" type="password" name="password" placeholder="Password..." value={this.state.password} onChange={this.changeHandler} />
                    </Form.Group>
                    <Button size="sm" className="mr-4" variant="primary" type="submit">
                        Login
				    </Button>
                    <Link size="sm" to="/signup">Sign Up</Link>


                </Form>
            </Container>
        );
    }
}

export default LoginForm;