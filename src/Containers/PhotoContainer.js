import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  } from 'react-router-dom';
import { Card, Carousel, Image, Modal, Button, Row, Col } from 'react-bootstrap';
import ModalImage from "react-modal-image";
import PhotoUploadForm from '../Components/PhotoUploadForm'

class PhotoContainer extends React.Component {

    state={
        clicked: false,
        modal_img: "",
        form: false
    }

    findProject = (pid) => {
        return this.props.building.projects.find(p => p.id === pid )
    }

    onClick = (e) => {
        let image = e.target.currentSrc
        this.setState({clicked: true, modal_img: image})
    }

    handleModalClose = () => {
        this.setState({clicked: false, modal_img: ""})
    }

    getZoomModal = () => {
        if (this.state.clicked) {
            console.log("rendering Modal", this.state.modal_img)
            return (
                <Modal className="modal" onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src={this.state.modal_img} alt="Construction Photo" />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }
    }

    getProjectImages = () => {
        let project = this.findProject(parseInt(this.props.windowParams.pid))
		return project.photos.map((photo, index) => {
			return (
				<Carousel.Item key={index}>
					<Image onClick={this.onClick} rounded className="d-block w-100" src={photo.img_url} alt={`Construction Photo ${index}`} />
					<Carousel.Caption>
						<p>{photo.description}</p>
					</Carousel.Caption>
				</Carousel.Item>
			);
		});
    };

    showForm = () => {
        this.setState(prevState => {
            return ({
                form: !prevState.form
            })
        })
    }

    photoForm = () => {
        if (this.state.form) {
            return (
                <Card>
                    <Card.Body>
                        <PhotoUploadForm addPhoto={this.props.addPhoto} projectId={parseInt(this.props.windowParams.pid)}/>
                    </Card.Body>
                </Card>
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <div>
                <div className="photo-carousel pb-2">
                    <Card>
                        <Card.Body>
                            <Card.Title as="h5">
                                <Row>
                                    <Col>
                                        Construction Photos:
                                    </Col>
                                    <Col className="text-right">
                                        <Button onClick={this.showForm} variant="secondary" size="sm">{this.state.form ? "Close Form" : "Add Photo"}</Button>
                                    </Col>
                                </Row>
                            </Card.Title>
                            <Carousel>{this.getProjectImages()}</Carousel>
                        </Card.Body>
                    </Card>
                </div>

                <div className="photo-form">
                    {this.photoForm()}
                </div>
            </div>
        )
    }
}

export default PhotoContainer