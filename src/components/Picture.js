import React from 'react'
import { Form } from 'react-bootstrap';
import logo from '../images/signup.png'

function Picture() {
    return (
        <>
        <img src={logo} style={{width: "50%"}}/>
        <div className="mb-3">
            <Form.File id="formcheck-api-regular">
            <Form.File.Label>Regular file input</Form.File.Label>
            <Form.File.Input />
            </Form.File>
        </div>
        </>
    )
}

export default Picture