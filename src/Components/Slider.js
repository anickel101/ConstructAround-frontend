import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import { Form, Col, Row, Container } from 'react-bootstrap'

const Slider = (props) => {

  const [value, setValue] = useState(props.range);

  return (
    <div className="slider">
      <Form>
        <Form.Group>
          <Container>
          <Row>
            <Col >
              <Form.Label >
                Range (m)
              </Form.Label>
            </Col>
          </Row>
          <Row>
            <Col>
              <RangeSlider
                min={0}
                max={1000}
                tooltipPlacement='top'
                tooltip='auto'
                value={value}
                variant='secondary'
                onChange={e => setValue(e.target.value)}
                onAfterChange={e => props.updateRange(e.target.value)}
              />
            </Col>
          </Row>
          </Container>
        </Form.Group>
      </Form>
    </div>
  );

};

export default Slider;