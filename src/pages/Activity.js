import React, {useState,useContext}from 'react'
import { Button, Form, Col, Row, Image, Dropdown } from 'react-bootstrap';
import DashNav from '../pages/Dashboard/dashNav'
import ActivityInput from '../components/ActivityInput'

function Activity() {

    return (
        <>
        <Row>
            <Col md={3}>
                <DashNav />
            </Col>
            <Col md={6}>
                <Row>
                    <h1>Recent activity</h1>
                </Row>
                <Row>
                    <ActivityInput />
                    <ActivityInput />
                </Row>
            </Col>
            <Col md={3}>
                {/* <h4>GROUP BALANCES</h4>
                <Balance />
                <a href="#">View details ...</a> */}
            </Col>
        </Row>
        </>
    )
}

export default Activity