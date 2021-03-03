import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { Application } from '../../components/export';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'
import {DB} from '../../constants/DB'
import jwt_decode from "jwt-decode";
import { useHistory} from 'react-router-dom';

function Signin() {
    const [display,setDisplay] = useState("none")
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login_URL = `${DB}/signin`
    const history = useHistory();

    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }

    function refreshPage() {
        window.location.reload(false);
    }

    async function handleSignin(event){
        event.preventDefault();
        if(!email){
            return;
        }
        if(!password){
            return;
        }
        console.log(email, password);
        try{
            let res = await fetch(Login_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            let result = await res.json();
            
            if(result && result.success){
                console.log(result);
                if(result){
                    localStorage.setItem('authUser', result.username);
                    localStorage.setItem('authEmail', result.email);localStorage.setItem('authID', result.ID);
                    toggleDisplay();
                    history.push('/home');
                    refreshPage()
                }
                console.log("login success");
            }else if(result && result.success === false){
                alert(result.msg);
            }
        }catch(e){
            console.log(e);
        }
    }

    
    return (    
        <>
        <Button variant="primary" onClick={toggleDisplay}>Sign In</Button>
        <Application.Base display = {display}>
            <Application.Close toggleDisplay={toggleDisplay}><FontAwesomeIcon icon={faTimes} /></Application.Close>
            
        </Application.Base>  
        </>
    )
}

export default Signin