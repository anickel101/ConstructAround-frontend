import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import {Form, Col} from 'react-bootstrap'
 
const Slider = (props) => {
 
  const [ value, setValue ] = useState(props.range); 
 
  return (
      <div className="slider">
        <Form>
            <Form.Group>
            <Form.Label column sm="4">
                Range (ft.)
            </Form.Label>
            <Col sm="8">
                <RangeSlider
                min={0}
                max={3000}
                step={100}
                tooltipPlacement='top'
                tooltip='auto'
                value={value}
                variant='secondary'
                onChange={e => setValue(e.target.value)}
                onAfterChange={e => props.updateRange(e.target.value)}
                />
            </Col>
            </Form.Group>
        </Form>
      </div>
  );
 
};

export default Slider;