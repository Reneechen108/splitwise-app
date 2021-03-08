import React, {useContext, useEffect} from 'react'
import { Row, Image, Form, Col } from 'react-bootstrap';
import logo from '../images/signup.png'
import category1 from '../images/shopping.png'
import category2 from '../images/daliy.png'
import category3 from '../images/form.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../contexts/userContext'
// import { ActivityContext } from '../contexts/activityContext'

function ActivityInput(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const {user} = useContext(UserContext)
    let month
    let data
    let currentInfo
    if(props.value && user){
        console.log("props.value", props.value);
        month = monthNames[parseInt(props.value.date.substring(5, 7))-1].substring(0,3)
        data = props.value.date.substring(8, 10)
        if(props.value.action){
            currentInfo = <h6>You get back USD ${-Number(props.value.amount).toFixed(2)}</h6>
        }else{
            currentInfo = <h6 style={{color:"red"}}>You owes USD ${Number(props.value.amount).toFixed(2)}</h6>
        }
    }
    return (
        <>
            {/* {date}  */}
        <Col>
            <Row>
                <Col sm={1}>
                    <Image src={category1} style={{width: "50px"}} rounded />
                </Col>
                <Col sm={9}>
                    <h4 style={{paddingTop: "6px", marginLeft: "10px"}}>{props.value.username===localStorage.getItem('authUser') ? "You" : props.value.username} update {props.value.description}<FontAwesomeIcon icon={faCamera} /></h4>
                    {currentInfo}
                </Col>
                <Col>
                <p>{month} {data}</p>
                </Col>
            </Row>
        </Col>
        <p style={{border: "1px solid black", width: "100%"}}></p>
        </>
    )
}

export default ActivityInput