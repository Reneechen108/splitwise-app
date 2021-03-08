import React, {useState,useContext, useEffect}from 'react'
import { Button, Form, Col, Row, Image, Dropdown, Jumbotron, Container } from 'react-bootstrap';
import ActivityInput from '../components/ActivityInput'
import Balance from '../components/Balance'
import SingleExpense from '../pages/SingleExpense'
import logo from '../images/signup.png'
import {DB, DB_PIC} from '../constants/DB'
import {ActivityContext} from '../contexts/activityContext'
import {GroupContext} from '../contexts/groupContext'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Application } from '../components/export';
import Picture from '../components/Picture'

function Expenses(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const [display,setDisplay] = useState("none")
    const [picture,setPicture] = useState()
    const [name,setName] = useState()

    const {activities} = useContext(ActivityContext)
    const {groups} = useContext(GroupContext)
    const leave_URL = `${DB}/reject`
    
    let pic = `${DB_PIC}/${props.id}/profile.png`
    let expenseList = [];
    
    if(activities && groups){
        let activity = activities.filter(a=> a.G_ID === props.id)
        activity.map((item, index) => {
            expenseList.push(<ActivityInput value={item} key={index} />)
        });
    }

    expenseList.sort((a, b) => (a.props.value.date > b.props.value.date) ? -1 : 1)
    
    function leave(){
        let allExpense = props.expense.filter(p => (p.user===localStorage.getItem('authID') && p.role !== 1 && p.amount !== 0))
        if(allExpense.length > 0){
            alert("You should pay off all the expenses before you leave the group!")
        }else{
            fetch(leave_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: parseInt(props.expense[0].G_ID),
                    member: localStorage.getItem('authID')
                })
            }).then(res => res.json()).then(result=>{
                console.log(result.dataset);
            })
        }
    }

    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }

    const createItem= async(newItem) => {
        setPicture(newItem.image)
        console.log("inside createItem");
    }

    return (
        <>
        <Col sm={6}>
            <Jumbotron style={{padding: "10px"}}>
                    <Container>
                        <Row>   
                            <Image src={pic} style={{width: "50px",height: "50px"}} />
                            <h3>{name} Expenses</h3>
                            <SingleExpense />
                            <Button variant="secondary" className="ml-3" onClick={leave}>
                                Leave Group
                            </Button>
                        </Row>
                        <Row>
                            <h6>{monthNames[new Date().getMonth()]} {new Date().getFullYear()}</h6>
                        </Row>
                    </Container>
                </Jumbotron>
            <Row>
                {expenseList}
            </Row>
        </Col>
        <Col sm={3}>
            <h4>GROUP BALANCES</h4>
            <Balance id={props.id} key={Math.random()}/>
            <Button variant="link" className="ml-3" onClick={toggleDisplay}>
                Edit...
            </Button>
        </Col>
        <Application.Group display = {display}>
            <Application.Close toggleDisplay={toggleDisplay}><FontAwesomeIcon icon={faTimes} /></Application.Close>
            <Row className="justify-content-md-center">
                <Col sm={4}>
                    <Picture createItem={createItem} old={pic}/>
                </Col>
                <Col sm={8}>
                    <h4>Change Group Information</h4>
                    <h6>My new group name shall be called...</h6>
                    <Form.Control type="text" placeholder={props.name} onChange={({target}) => setName(target.value)}/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Button variant="danger" >Save</Button>
            </Row>
        </Application.Group>  
        </>
    )
}

export default Expenses