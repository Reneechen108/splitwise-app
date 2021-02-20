import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { Application } from '../../components/export';

function Signin() {
    const [display,setDisplay] = useState("none")
    const [username, setuUsername] = useState('');
    const [password, setPassword] = useState('');
    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }

    async function handleSignin(event){
        event.preventDefault();
        if(!username){
            return;
        }
        if(!password){
            return;
        }
        alert(username + password)
        localStorage.setItem('authUser', username);
    }

    return (    
        <>
        <Button variant="primary" onClick={toggleDisplay}>Sign In</Button>
        <Application.Base display = {display}>
            <Application.Close><i className="far fa-window-close"></i></Application.Close>
            <Form onSubmit={handleSignin}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" onChange={({ target }) => setuUsername(target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your info with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={({ target }) => setPassword(target.value)}/>
                </Form.Group>
                <Form.Text className="text-muted">Haven't have account? 
                    <Button variant="link">
                            Sign me in!
                    </Button>
                </Form.Text>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Application.Base>  
        </>
    )
}

export default Signin