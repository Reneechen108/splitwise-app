import React, { useState } from 'react'
import { Modal, Button, Image, Row, Col, InputGroup, FormControl} from 'react-bootstrap';
import category1 from '../images/form.png'

function SingleExpense() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Add an expense
        </Button>

        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
            <Modal.Title>Add an expense</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "300px" }}>
                <Row style={{borderBottom: "1px solid black"}}>
                    <h6>With you and: </h6>
                </Row>
                <p></p>
                <Row>
                    <Col md={3}>
                        <Image src={category1} style={{width: "100px"}} rounded />
                    </Col>
                    <Col md={7}>
                        <InputGroup className="mb-3">
                            <FormControl
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Append>
                            <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default SingleExpense;