import React from 'react'
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import logo from '../../images/signup.png'
import { faFlag, faList, faTag, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function DashNav() {
    return (
        <>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><img src={logo} style={{width: "30px"}}/><strong style={{color: "green"}}>Dashboard</strong></li>
            <li class="list-group-item"><FontAwesomeIcon icon={faFlag} /><strong> Recent activity</strong></li>
            <li class="list-group-item"><FontAwesomeIcon icon={faList} /><strong> All expenses</strong></li>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="GROUPS"
                aria-label="groups"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Button variant="outline-secondary">+ add</Button>
                </InputGroup.Append>
            </InputGroup>
            <li class="list-group-item"><FontAwesomeIcon icon={faTag} /><strong> Group 1</strong></li>
            <li class="list-group-item"><FontAwesomeIcon icon={faTag} /><strong> Group 2</strong></li>
            <InputGroup className="mb-3">
                <FormControl
                placeholder="FRIENDS"
                aria-label="friends"
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Button variant="outline-secondary">+ add</Button>
                </InputGroup.Append>
            </InputGroup>
            <li class="list-group-item"><FontAwesomeIcon icon={faUser} /><strong> Friend 1</strong></li>
            <li class="list-group-item"><FontAwesomeIcon icon={faUser} /><strong> Friend 2</strong></li>
            <li class="list-group-item"><FontAwesomeIcon icon={faUser} /><strong> Friend 3</strong></li>
        </ul>
        </>
    )
}

export default DashNav

