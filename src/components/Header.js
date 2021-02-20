import React from 'react'
import { Navbar, Button } from 'react-bootstrap';
import Signin from '../pages/userauth/Signin'

function Header() {
    return (
        <>
        <Navbar bg="light" variant="dark">
            <Navbar.Brand href="#home" style={{color: "black"}} className="col-md-9 col-sm-6">
            <img
                alt=""
                src="../logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Splitwise
            {' '}
            </Navbar.Brand>
            <div className="col-md-3 col-sm-6">
                <Button variant="link">Sign up</Button>
                <Signin />
            </div>
        </Navbar>
        </>
    )
}

export default Header