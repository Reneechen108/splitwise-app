import React, {useState,useContext}from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap';
import logo from '../../images/signup.png'
import {DB} from '../../constants/DB'
import { useHistory } from 'react-router-dom';

function Signup() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const [phone, setPhone] = useState('');
    const [disable,setDisable] = useState("none")

    const Register_URL = `${DB}/signup`
    const history = useHistory();
    async function handleSignup (event){
        event.preventDefault();
        try{
            console.log(username, email, password, phone);
            let res = await fetch(Register_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    psswd: password,
                    phone: phone
                })
            });
            let result = await res.json();
            console.log(result);
            if(result && result.success){
                console.log("successful signup");
                history.push('/home');
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
        <Row>
            <Col>
                <img src={logo} style={{width: "50%", margin: "auto", display: "block", marginTop: "100px"}}/>
            </Col>
            <Col>
                <Form style={{width: "50vw", padding: "4rem"}} onSubmit={handleSignup} method="POST">

                    <Form.Group controlId="formGridUsername">
                        <Form.Label>Hi there! My name is</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={({ target }) => setUsername(target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="formGridPassword">
                        <Form.Label>Here’s my password: </Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={({ target }) => setPassword(target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="formGridEmail">
                        <Form.Label>Here’s my email address: </Form.Label>
                        <Form.Control type="email" placeholder="Email 123@gmail.com" value={email} onChange={({ target }) => setEmail(target.value)} required/>
                    </Form.Group>

                    <Form.Group controlId="formGridPhone">
                        <Form.Label>And here’s my phone number: </Form.Label>
                        <Form.Control type="tel" placeholder="123-456-7890" value={phone} onChange={({ target }) => setPhone(target.value)} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
                    </Form.Group>


                    <Form.Text className="text-muted">Already had account? <Button variant="link">
                            Sign me in!
                    </Button></Form.Text>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Sign Up
                        </Button>
                    </Form.Group>
                    <h6>By signing up, you accept the Splitwise Terms of Service.</h6>
                </Form>
            </Col>
        </Row>
        </>
    )
}

export default Signup

/**
 * 
Implement Redux in following screens of your Splitwise Application :

User Signup
Login (implement Redux on Logout action as well
(optional) User Profile - includes updating and displaying all the information in Profile page using Redux
Redux Devtools needs to be installed in the browser.
 */