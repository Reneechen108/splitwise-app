import React from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/signup.png'

function CreateInput() {
    return (
        <>
        <Row>
            <Col sm={2}>
                <Image src={logo} roundedCircle style={{width: "30px"}}/>
            </Col>
            <Col sm={4}>
                <Form.Control type="email" placeholder="Enter email" />
            </Col>
            <Col sm={6}>
                <Form.Control type="email" placeholder="Enter email" />
            </Col>
        </Row>
        </>
    )
}

export default CreateInput