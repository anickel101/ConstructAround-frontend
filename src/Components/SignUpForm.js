import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {

    state = {
        username: "",
        password: "",
        // password_check: "",
        first_name: "",
        last_name: "",
        img_url: "",
        business: "",
        phone: ""
        
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.signup(this.state)
        // this.setState({username: "", password: ""})
    }

    render() {
        return (
            <Container className="login-overlay">
                {/* {this.state.password != this.state.password_check ? <Alert size="sm" variant={'warning'}>Passwords Don't Match</Alert> : null} */}
                <Form onSubmit={this.submitHandler}>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Control size="sm" type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control size="sm" type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                    </Form.Group>

                    {/* <Form.Group controlId="formBasicPasswordCheck">
                        <Form.Control size="sm" type="password" name="password_check" placeholder="Re-enter Password" value={this.state.password_check} onChange={this.changeHandler} />
                    </Form.Group> */}

                    <Form.Group controlId="formBasicFirstName">
                        <Form.Control size="sm" type="text" name="first_name" placeholder="First Name" value={this.state.first_name} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Control size="sm" type="text" name="last_name" placeholder="Last Name" value={this.state.last_name} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicBusiness">
                        <Form.Control size="sm" type="text" name="business" placeholder="Business" value={this.state.business} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Control size="sm" type="text" name="phone" placeholder="Phone Number" value={this.state.phone} onChange={this.changeHandler} />
                    </Form.Group>

                    <Form.Group controlId="formBasicImage">
                        <Form.Control size="sm" type="text" name="img_url" placeholder="Link for Profile Pic" value={this.state.img_url} onChange={this.changeHandler} />
                    </Form.Group>

                    








                    <Button size="sm" className="mr-4" variant="primary" type="submit">
                        Sign Up
				    </Button>
                    <Link to="/login">Back to Login</Link>
                </Form>
            </Container>
        );
    }
}

export default SignUpForm;