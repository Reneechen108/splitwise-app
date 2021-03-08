import React, {useState,useEffect,useContext}from 'react'
import { Button, Form, Col, Row, Jumbotron, Container, Pagination, Tooltip, OverlayTrigger, Popover } from 'react-bootstrap';
import DashNav from '../pages/Dashboard/dashNav'
import {DB} from '../constants/DB'
import Expenses from './Expenses'
import {UserContext} from '../contexts/userContext'
import {GroupContext} from '../contexts/groupContext'
import Activity from '../pages/Activity'
import axios from 'axios'
import {ActivityContext} from '../contexts/activityContext'

function Dashboard() {
    let title = ["total balance", "you owe", "you are owed"]
    const [group, setGroup] = useState()
    const [expense, setExpense] = useState()
    const [userOwed, setUserOwed] = useState()
    const [userOwe, setUserOwe] = useState()
    const {user} = useContext(UserContext);
    const {groups} = useContext(GroupContext);
    const [name,setName] = useState()
    const [one,setOne] = useState(0)
    const [two,setTwo] = useState(0)
    const [three,setThree] = useState(0)
    const [display,setDisplay] = useState("display")

    const {activities} = useContext(ActivityContext)

    function toggleDisplay(){
        if(display === "none")
            setDisplay("display")
        else
            setDisplay("none")
    }


    let user_URL = `${DB}/getInfo`
    let userOwe_URL = `${DB}/getOweInfo`
    let update_URL = `${DB}/updateExpenses`
    

    function refreshPage() {
        window.location.reload(false);
    }
    useEffect( ()=>{
        let data = {ID: localStorage.getItem('authID')}
        axios.post(user_URL,data)
            .then(response => {
                console.log(response);
                if(response.status === 200){
                    console.log("user owe: ", response.data.dataset);
                    setUserOwed(response.data.dataset)
                }
            });  
        axios.post(userOwe_URL,data)
            .then(response => {
                console.log(response);
                if(response.status === 200){
                    console.log("user owe: ", response.data.dataset);
                    setUserOwe(response.data.dataset)
                }
            });   
    },[])

    const createItem= async(newItem) => {
        let expense = activities.filter(a => a.G_ID === newItem.ID)
        console.log("expense!!!", expense);
        setExpense(expense)
        setDisplay("none")
        setName(newItem.name)
    }

    function settleUp(){
        console.log("click");
        let dateWithdate = {
            ID: localStorage.getItem('authID'),
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        axios.post(update_URL,dateWithdate)
            .then(response => {
                console.log(response);
                if(response.status === 200){
                    console.log("updated!");
                }
                refreshPage();
            });  
    }

    let groupInfoTwo = []
    let groupInfoThree = []
    let twoGroup = []
    let threeGroup = []
    let totalOwed = []

    if(userOwed&&user&&groups&&userOwe){
        let two = 0
        let three = 0
        userOwed.map((item, index) => {
            threeGroup.push(
                <>
                <div key={index}>
                    <img src={item.picture} alt="" style={{width:"30px", height: "30px"}}/>    
                    {item.username} owes you ${item.amount} for "{item.description}"
                </div>
                <p style={{borderBottom: "1px solid black", padding: "3px"}}/>
                </>
            )
            three += item.amount;
        })
        console.log("inside", userOwe);
        userOwe.map((item, index) => {
            twoGroup.push(
                <>
                <div key={index}>
                    <img src={item.picture} alt="" style={{width:"30px", height: "30px"}}/>    
                    You owe {item.username} ${item.owe} for "{item.description}"
                </div>
                <p style={{borderBottom: "1px solid black", padding: "3px"}}/>
                </>
            )
            two += item.owe;
        })
        groupInfoTwo.push(twoGroup)
        groupInfoThree.push(threeGroup);
        totalOwed.push(
            <>
                <Pagination.Item key={Math.random()} style={{width: "250px"}}>
                    {title[0]}<br />$ {Number(three-two).toFixed(2)}
                </Pagination.Item>
                <Pagination.Item key={Math.random()} style={{width: "250px"}}>
                    {title[1]}<br />$ {Number(two).toFixed(2)}
                </Pagination.Item>
                <Pagination.Item key={Math.random()} style={{width: "250px"}}>
                    {title[2]}<br />$ {three}
                </Pagination.Item>
            </>
        )
    }

    // console.log("expense",expense);
    console.log("createItem",createItem.newItem);
    let dashContent = expense && expense.length>0 ? <Expenses id={expense[0].G_ID} name={name} key={Math.random()}/> : <Activity />

    let content = display==="display" ? <>
        <Col sm={9} style={{display:display}}>
            <Row style={{height: "194px"}}>
                <Jumbotron style={{padding: "10px", width: "100%"}}>
                    <Container>
                        <Row>   
                            <Col sm={8} key="1">
                                <h1>Dashboard</h1>
                            </Col>
                            <Col key="2">
                                <Button variant="danger" onClick={settleUp}>Settle up</Button>
                            </Col>
                            <Pagination size="lg" style={{margin: "0 auto"}}>
                                {totalOwed}
                            </Pagination>
                        </Row>
                    </Container>
                </Jumbotron>
            </Row>
            <Row style={{margin: "0 auto"}} className="justify-content-md-center">
                <h3 style={{width: "300px"}}>You owe</h3>
                <h3>You are owed</h3>
            </Row>
            <Row className="justify-content-md-center" style={{height: "100%"}}>
                <Col style={{borderRight: "1px solid black", padding: 0}}>
                    {groupInfoTwo}
                </Col>
                <Col className="ml-3">
                    {groupInfoThree}
                </Col>
            </Row>
        </Col>
    </> : dashContent
    return (
        <>
        <Row>
            <Col sm={3}>
                <DashNav createItem={createItem} />
            </Col>
            {content}
        </Row>
         
        </>
    )
}

export default Dashboard