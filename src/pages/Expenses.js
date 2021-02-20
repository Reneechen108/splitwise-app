import React, {useState,useContext}from 'react'
import { Button, Form, Col, Row, Image, Dropdown } from 'react-bootstrap';
import DashNav from '../pages/Dashboard/dashNav'
import ExpenseInput from '../components/ExpenseInput'
import Balance from '../components/Balance'
import SingleExpense from '../pages/SingleExpense'
import logo from '../images/signup.png'

function Expenses() {

    return (
        <>
        <Row>
            <Col md={3}>
                <DashNav />
            </Col>
            <Col md={6}>
                <Row>
                    <Image src={logo} style={{width: "50px"}}></Image>
                    <h1>Home Expenses</h1>
                    <SingleExpense />
                    {/* <Dropdown style={{paddingLeft: "50px"}}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown> */}
                </Row>
                <Row>
                    <h6>{new Date().getFullYear()}</h6>
                </Row>
                <Row>
                    <ExpenseInput />
                    <ExpenseInput />
                </Row>
            </Col>
            <Col md={3}>
                <h4>GROUP BALANCES</h4>
                <Balance />
                <a href="#">View details ...</a>
            </Col>
        </Row>
        </>
    )
}

export default Expenses