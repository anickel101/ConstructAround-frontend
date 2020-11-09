import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  } from 'react-router-dom';
import {  } from 'react-bootstrap';

class CommentContainer extends React.Component {

    findProject = (pid) => {
        return this.props.building.projects.find(p => p.id === pid )
    }

    render() {
        return (
            <div className="Comment-container">
                <h3>Comment Container</h3>
            </div>
        )
    }
}

export default CommentContainer