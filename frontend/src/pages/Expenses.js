import React, {useState,useContext, useEffect}from 'react'
import { Button, Form, Col, Row, Image, Dropdown, Jumbotron, Container } from 'react-bootstrap';
import DashNav from '../pages/Dashboard/dashNav'
import ExpenseInput from '../components/ExpenseInput'
import ActivityInput from '../components/ActivityInput'
import Balance from '../components/Balance'
import SingleExpense from '../pages/SingleExpense'
import logo from '../images/signup.png'
import {DB} from '../constants/DB'
import {ActivityContext} from '../contexts/activityContext'

function Expenses(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];

    const [userInfo, setUserInfo] = useState()

    const {activities} = useContext(ActivityContext)
    const leave_URL = `${DB}/reject`

    let expenseList = [];

    // console.log("props.expense[0].G_ID", props.expense[0].G_ID);
    

    console.log("expense");
    if(props.expense){
        let after = props.expense.filter(p => p.role !== 1)
        console.log("after", after);
        after.map((item, index) => {
            expenseList.push(<ExpenseInput value={item} key={index} />)
        });
    }

    expenseList.sort((a, b) => (a.props.value.date > b.props.value.date) ? -1 : 1)
    
    function leave(){
        let allExpense = props.expense.filter(p => (p.user===localStorage.getItem('authID') && p.role !== 1 && p.amount !== 0))
        console.log("allExpense", allExpense);
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

    return (
        <>
        <Col sm={6}>
            <Jumbotron style={{padding: "10px"}}>
                    <Container>
                        <Row>   
                            <Image src={logo} style={{width: "50px"}}></Image>
                            <h3>Home Expenses</h3>
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
            <Balance id={props.expense[0].G_ID} key={Math.random()}/>
            <a href="#">View details ...</a>
        </Col>
        </>
    )
}

export default Expenses