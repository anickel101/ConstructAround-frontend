import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoadScript } from '@react-google-maps/api'
import { BrowserRouter } from 'react-router-dom';


const libraries = ["places"];

ReactDOM.render(
  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY} libraries={libraries}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LoadScript>, document.getElementById('root'));
