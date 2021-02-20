import React, {useState,useContext}from 'react'
import { Button, Form, Col, Row, Jumbotron, Container, Pagination, Tooltip, OverlayTrigger, Popover } from 'react-bootstrap';
import DashNav from '../pages/Dashboard/dashNav'

function Dashboard() {
    let title = ["total balance", "you owe", "you are owed"]
    let items = [];
    for (let number = 1; number <= 3; number++) {
        items.push(
            <Pagination.Item key={number} style={{width: "250px"}}>
            {title[number-1]}<br />{number}
            </Pagination.Item>,
        );
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Popover right</Popover.Title>
            <Popover.Content>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
            </Popover.Content>
        </Popover>
        );

    return (
        <>
        <Row>
            <Col sm={4}>
                <DashNav />
            </Col>
            <Col sm={8}>
                <Row>
                    <Jumbotron style={{padding: "10px"}}>
                        <Container>
                            <Row>   
                                <Col sm={8}>
                                    <h1>Dashboard</h1>
                                </Col>
                                <Col>
                                    <Button variant="danger">Add a bill</Button>
                                    <Button variant="warning" className="ml-3">Settle up</Button>
                                </Col>
                                <Pagination size="lg" style={{margin: "0 auto"}}>{items}</Pagination>
                            </Row>
                        </Container>
                    </Jumbotron>
                </Row>
                <Row style={{margin: "0 auto"}}>
                    <h3>You owe</h3>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                            <Button variant="secondary" className="ml-3">Click me to see</Button>
                        </OverlayTrigger>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button variant="secondary" className="ml-3">Click me to see</Button>
                    </OverlayTrigger>{' '}
                    <h3>  You are owed</h3>
                </Row>
                <Row>
                    <Col style={{borderRight: "1px solid black", width: "300px"}}>
                        <p>hehe</p>
                    </Col>
                    <Col>
                        <p>hehe</p>
                    </Col>
                </Row>
            </Col>
        </Row>
         
        </>
    )
}

export default Dashboard