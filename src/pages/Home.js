import React, {useState} from 'react'
import { Navbar, Jumbotron, Button, Row, Col } from 'react-bootstrap';
import { faApple, faAndroid } from '@fortawesome/free-brands-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Footer from '../components/Footer'
import img from '../images/home.png'
import { Application } from '../components/export';
import Signin from './userauth/Signin'
import '../App.css'

function Home() {

    return (
        <>
        <Jumbotron style={{minHeight: "450px"}}>
            <Row>
                <Col sm={4}>
                    <h1>Less stress when sharing expenses</h1>
                    <p style={{paddingTop: "4rem", paddingBottom: "4rem"}}>
                        Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.
                    </p>
                    <Button variant="primary">Sign Up</Button>

                    <h6>Free for iPhone <FontAwesomeIcon icon={faApple} />,Android <FontAwesomeIcon icon={faAndroid} />, and web.</h6>
                </Col>
                <Col sm={8}><img src={img} style={{width: "100%"}}></img></Col>
            </Row>
        </Jumbotron>
        <Footer />
        </>
    )
}

export default Home