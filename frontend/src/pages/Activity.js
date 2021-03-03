import React, {useState,useContext,useEffect}from 'react'
import { Button, Col, Row, Image, Jumbotron, Container } from 'react-bootstrap';
import DashNav from '../pages/Dashboard/dashNav'
import ActivityInput from '../components/ActivityInput'
import {DB} from '../constants/DB'
// import ExpenseInput from '../components/ExpenseInput'
function Activity() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const recent_URL= `${DB}/recent`
    const [posts, setPosts] = useState()
    const [owns, setOwns] = useState()
    // const [expenses, setExpenses] = useState()

    let expenseList = [];

    useEffect( ()=>{
        try{
            fetch(recent_URL, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: localStorage.getItem("authID")
                })
            }).then(res => res.json()).then(result=>{
                setPosts(result.posts)
                setOwns(result.owns)
                console.log("this is a posts", result.posts);
                console.log("this is a owns", result.owns);
            })
        }catch(e){
            console.log(e);
        }
    },[])

    if(posts){
        posts.map((item, index) => {
            expenseList.push(<ActivityInput value={item} key={index} />)
        });
    }
    if(owns){
        owns.map((item, index) => {
            expenseList.push(<ActivityInput value={item} key={index+50} />)
        });
    }

    expenseList.sort((a, b) => (a.props.value.date > b.props.value.date) ? -1 : 1)

    return (
        <>
        <Col sm={6}>
            <Jumbotron style={{padding: "10px"}}>
                <Container>
                    <Row>   
                        <h3>Recent Activity</h3>
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
        </>
    )
}

export default Activity