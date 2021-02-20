import React from 'react'
import { Navbar, Button, Nav, NavDropdown } from 'react-bootstrap';

function LoginNav() {
    
    function logout() {
        localStorage.setItem('authUser', '');
    }
    return (
        <>
        <Navbar>
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
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                <Nav.Link href="/home">Active</Nav.Link>
                </Nav.Item>
                <NavDropdown title="Dropdown" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4" onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar>
        </>
    )
}

export default LoginNav