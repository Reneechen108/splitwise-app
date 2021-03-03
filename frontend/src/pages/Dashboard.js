import React, {useState,useEffect,useContext}from 'react'
import { Button, Form, Col, Row, Jumbotron, Container, Pagination, Tooltip, OverlayTrigger, Popover } from 'react-bootstrap';
import DashNav from '../pages/Dashboard/dashNav'
import {DB} from '../constants/DB'
import Expenses from './Expenses'
import {UserContext} from '../contexts/userContext'
import {GroupContext} from '../contexts/groupContext'
import Activity from '../pages/Activity'

function Dashboard() {
    let title = ["total balance", "you owe", "you are owed"]
    const [group, setGroup] = useState()
    const [expense, setExpense] = useState()
    const [userInfo, setUserInfo] = useState()
    const [userOwe, setUserOwe] = useState()
    const {user} = useContext(UserContext);
    const {groups} = useContext(GroupContext);
    const [displayWin,setDisplayWin] = useState("none")
    const [one,setOne] = useState(0)
    const [two,setTwo] = useState(0)
    const [three,setThree] = useState(0)
    const [display,setDisplay] = useState("display")

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
        try{
            fetch(user_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: localStorage.getItem('authID')
                })
            }).then(res => res.json()).then(result=>{
                console.log("userInfo: ", result.dataset);
                setUserInfo(result.dataset)
            })
        }catch(e){
            console.log(e);
        }
        try{
            fetch(userOwe_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: localStorage.getItem('authID')
                })
            }).then(res => res.json()).then(result=>{
                console.log("userInfo: ", result.dataset);
                setUserOwe(result.dataset)
                console.log("userOwe", userOwe);
            })
        }catch(e){
            console.log(e);
        }
    },[])

    const popover = (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Popover right</Popover.Title>
            <Popover.Content>
            And here's some <strong>amazing</strong> content. It's very engaging.
            right?
            </Popover.Content>
        </Popover>
    );

    const createItem= async(newItem) => {
        console.log("this is newItem", newItem.ID);
        console.log("this is recent", newItem.recent);
        setDisplay("none")
        if(newItem.ID){
            const getExpense_URL = `${DB}/expense/${newItem.ID}`
            await fetch(getExpense_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ID: newItem.ID
                })
            }).then(res => res.json()).then(result=>{
                // console.log("result.dataset", result.dataset);
                setExpense(result.dataset)
            })
        }
        if(newItem.recent){
            setExpense('')
        }
    }

    function settleUp(){

        if(displayWin === "none")
            setDisplayWin("display")
        else
            setDisplayWin("none")
    }

    let groupInfoTwo = []
    let groupInfoThree = []
    let twoGroup = []
    let threeGroup = []
    let totalOwed = []

    if(userInfo&&user&&groups&&userOwe){
        console.log("inside", userInfo);
        let two = 0
        let three = 0
        // let groupCost = 0
        for(let i = 0; i < userInfo.length; i++){
            let eachOwed = userInfo[i].amount
            // let groupName = groups.filter(g=>g.G_ID===userInfo[i].G_ID)
            let userName = user.filter(u=>u.ID===parseInt(userInfo[i].user))
            let sep = (i+1 != userInfo.length && userInfo[i].description !== userInfo[i+1].description) ? 
            <p style={{borderBottom: "1px solid black", padding: "3px"}}></p> : <p></p>  
            let num = Math.floor(Math.random() * 200)
            threeGroup.push(
                <>
                <div key={num}>
                    <img src={userName[0].picture} alt="" style={{width:"30px", height: "30px"}}/>    
                    {userName[0].username} owes you {eachOwed} for "{userInfo[i].description}"
                </div>
                {sep}
                </>
            )
            three += eachOwed
        }
        
        for(let i = 0; i < userOwe.length; i++){
            let eachOwed = userOwe[i].amount
            let userName = user.filter(u=>u.ID===parseInt(userOwe[i].user))
            let userOwedName = user.filter(u=>u.ID===parseInt(userOwe[i].host))
            let sep = (i+1 != userOwe.length && userOwe[i].description !== userOwe[i+1].description) ? 
            <p style={{borderBottom: "1px solid black", padding: "3px"}}></p> : <p></p>     
            let num = Math.floor(Math.random() * 200) 
            twoGroup.push(
                <>
                <div key={num}>
                    <img src={userName[0].picture} alt="" style={{width:"30px", height: "30px"}}/>    
                    You owe {userOwedName[0].username} {userOwe[i].amount} for "{userOwe[i].description}"
                </div>
                {sep}
                </>
            )
            two += eachOwed
        }
        groupInfoTwo.push(twoGroup)
        groupInfoThree.push(threeGroup);
        if(displayWin==="none"){
            two = 0
            three = 0 
        }
        totalOwed.push(
            <>
                <Pagination.Item key={title[0]} style={{width: "250px"}}>
                    {title[0]}<br />{Number(three-two).toFixed(2)}
                </Pagination.Item>
                <Pagination.Item key={title[1]} style={{width: "250px"}}>
                    {title[1]}<br />{Number(two).toFixed(2)}
                </Pagination.Item>
                <Pagination.Item key={title[2]} style={{width: "250px"}}>
                    {title[2]}<br />{three}
                </Pagination.Item>
            </>
        )
    }

    console.log("expense",expense);
    let dashContent = expense ? <Expenses expense={expense}/> : <Activity />

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
                <h3>You owe</h3>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button variant="secondary" className="ml-3">Click me to see</Button>
                </OverlayTrigger>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                    <Button variant="secondary" className="ml-3">Click me to see</Button>
                </OverlayTrigger>{' '}
                    <h3>You are owed</h3>
            </Row>
            <Row className="justify-content-md-center" style={{height: "100%"}}>
                <Col style={{borderRight: "1px solid black", padding: 0}}>
                    {groupInfoTwo}
                </Col>
                <Col className="ml-3">
                    <p></p>
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