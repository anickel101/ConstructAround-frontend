import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css';

class ProjectCard extends React.Component {

    render() {
        return (
            <Card className="project-card" style={{ width: '15rem' }}>
                <Card.Body>
                    <Card.Title>Project Info</Card.Title>
                    <Card.Text>
                        Project Info goes here!
                    </Card.Text>
                    
                        <Link to="/building/13">
                            <Button variant="secondary">Back to Projects</Button>
                        </Link>
                        
                </Card.Body>
            </Card>
        )
    }
}

export default ProjectCard