import React from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo1 from '../images/shopping.png'
import logo2 from '../images/daliy.png'

function ActivityInput() {
    return (
        <>
        <Col md={2}>
            <Image src={logo1} rounded style={{width: "50px"}}/>
            <Image src={logo2} roundedCircle style={{width: "25px", position: "relative", right: "20px", top: "20px"}}/>
        </Col>
        <Col md={9} style={{lineHeight: "0.1"}}>
            <h6>User1 <span>added</span> "Grocery outlet" <span>in</span> "Home Expenses".</h6>
            <h5><span>You owe </span>USD9.12</h5>
            <p>{new Date().getDate()}</p>
        </Col>
        <p style={{border: "1px solid black", width: "100%"}}></p>
        </>
    )
}

export default ActivityInput