import React from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/form.png'

function Balance() {
    return (
        <>
        <Row>
            <Col md={3}>
            <Image src={logo} roundedCircle style={{width: "40px"}}/>
            </Col>
            <Col>
                <Row>
                    <h5>User x</h5>
                </Row>
                <Row>
                    <h4><span>owes</span>USD 16.21</h4>
                </Row>
            </Col>
        </Row>
        </>
    )
}

export default Balance