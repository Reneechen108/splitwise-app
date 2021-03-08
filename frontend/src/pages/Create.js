import React, {useState, useContext} from 'react'
import { Button, Form, Col, Row, InputGroup, FormControl } from 'react-bootstrap';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Picture from '../components/Picture'
import CreateInput from '../components/CreateInput'
import { Application } from '../components/export';
import {DB} from '../constants/DB'
import axios from 'axios';

function Create(props) {
   
    const [display,setDisplay] = useState("none")
    const [picture,setPicture] = useState()
    const [group, setGroup] = useState()
    const [number, setNumber] = useState(0)
    const [users, setUsers] = useState()
    const [input, setInput] = useState()

    const create_URL = `${DB}/update`
    let items = []
    let userList = []

    const handleSearch = (newItem) => {
        console.log("newItem", newItem);
        userList.push(newItem)
    }

    for (let i = 0; i < number; i++) {
        items.push(
            <>
            <div style={{display: "flex"}}>
                <CreateInput createItem={handleSearch}/>
                <FontAwesomeIcon icon={faTimes} onClick={() => setNumber(number-1)}></FontAwesomeIcon>
            </div>
            </>
        );
    }
    if(document.getElementById('display'))
        console.log("html: ", document.getElementById('display').innerHTML);

    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const createItem= async(newItem) => {
        setPicture(newItem.image)
        console.log("inside createItem");
    }

    async function allUser(){
        let current = localStorage.getItem('authID')
        let allUser = []
        userList.map(u => allUser.push(u.ID))
        allUser.push(parseInt(current))
        setUsers(allUser)
        console.log(picture, group, users);
        const formData = new FormData();
        formData.append('name', group);
        formData.append('users', allUser);
        formData.append('upload','group');
        formData.append('picture', picture);
        axios({
            method: "POST",
            url: create_URL,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(response => {
            if(!response.data.success)
                alert(response.data.msg)
        });
    }

    function search(e){
        props.search({value: e.target.value})
    }

    return (
        <>
        <InputGroup className="mb-3">
                <FormControl
                placeholder="Search for group"
                aria-label="groups"
                aria-describedby="basic-addon2"
                onChange={search}
                />
                <InputGroup.Append>
                <Button variant="outline-secondary" onClick={toggleDisplay}>+ add</Button>
                </InputGroup.Append>
        </InputGroup>
        <Application.Group display = {display}>
            <Application.Close toggleDisplay={toggleDisplay}><FontAwesomeIcon icon={faTimes} /></Application.Close>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                    <Picture createItem={createItem}/>
                </Col>
                <Col sm={8}>
                    <h4>START A NEW GROUP</h4>
                    <h6>My group shall be called...</h6>
                    <Form.Control type="text" placeholder="Enter group name" onChange={({target}) => setGroup(target.value)} />
                    <h4>GROUP MEMBERS</h4>
                    {items}
                    {/* {console.log("here", items)} */}
                    <Button variant="link" onClick={() => setNumber(number+1)}>+ Add a person</Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Button variant="danger" onClick={allUser}>Save</Button>
            </Row>
        </Application.Group>  
        </>
    )
}

export default Create