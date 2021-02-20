import React, {useState,useContext}from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import logo from '../../images/signup.png'
import { Application } from '../../components/export';
import Signin from './Signin'

function Signup() {
    return (
        <>
        <Row>
            <Col>
                <img src={logo} style={{width: "50%", margin: "auto", display: "block", marginTop: "100px"}}/>
            </Col>
            <Col>
                <Form style={{width: "50vw", padding: "4rem"}}>

                    <Form.Group controlId="formGridUsername">
                        <Form.Label>Hi there! My name is</Form.Label>
                        <Form.Control placeholder="Username" />
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Here’s my password: </Form.Label>
                        <Form.Control ptype="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formGridEmail">
                        <Form.Label>And here’s my email address: </Form.Label>
                        <Form.Control type="email" placeholder="Email 123@gmail.com" />
                    </Form.Group>

                    <Form.Text className="text-muted">Already had account? <Button variant="link">
                            Sign me in!
                    </Button></Form.Text>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form.Group>
                    <h6>By signing up, you accept the Splitwise Terms of Service.</h6>
                </Form>
            </Col>
        </Row>
        </>
    )
}

export default Signup