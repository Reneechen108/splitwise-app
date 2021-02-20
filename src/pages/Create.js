import React from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picture from '../components/Picture'
import CreateInput from '../components/CreateInput'

function Profile() {
    let title = ["Your name", "Your email address", "Your phone number"]
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Form.File.Label>
                {title[number-1]}
                <a href="#"><FontAwesomeIcon icon={faPen} />Edit</a><br />
                {number}
            </Form.File.Label>
        );
        items.push(<br />)
        items.push(<br />)
    }

    let others = ["Your default currency", "Your time zone", "Language"]
    let other_items = [];
    for (let number = 1; number <= 3; number++) {
        other_items.push(
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>{others[number-1]}</Form.Label>
                <Form.Control as="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                </Form.Control>
            </Form.Group>
        );
    }

    return (
        <>
        <Row className="justify-content-md-center">
            <Col sm={2}>
                <Picture />
            </Col>
            <Col sm={4}>
                <h4>START A NEW GROUP</h4>
                <h6>My group shall be called...</h6>
                <Form.Control type="email" placeholder="Enter email" />
                <h4>GROUP MEMBERS</h4>
                <CreateInput />
                <a href="#"> + Add a person</a>
            </Col>
        </Row>
        <Row className="justify-content-md-center">
            <Button variant="danger">Save</Button>
        </Row>
        </>
    )
}

export default Profile