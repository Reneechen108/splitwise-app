import React from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/signup.png'
import category1 from '../images/shopping.png'
import category2 from '../images/daliy.png'
import category3 from '../images/form.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'


function ExpenseInput() {
    let dates = ['Jan 31', 'Feb 20']

    return (
        <>
        <Col md={1}>
            <h6>{dates[0].split(' ')[0]}</h6>
            <h4>{dates[0].split(' ')[1]}</h4>
        </Col>
        <Col md={7}>
            <Row>
                <Image src={category1} style={{width: "50px"}} rounded />
                <h4 style={{paddingTop: "6px", marginLeft: "10px"}}>Grocery outlet<FontAwesomeIcon icon={faCamera} /></h4>
            </Row>
        </Col>
        <Col md={4}>
            <h6>User x</h6>
            <h4>USD15.34</h4>
        </Col>
        <p style={{border: "1px solid black", width: "100%"}}></p>
        </>
    )
}

export default ExpenseInput