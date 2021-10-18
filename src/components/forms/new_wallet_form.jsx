import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function NewWalletForm() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [otherName, setOtherName] = useState("")
    const [idCardType, setIdCardType] = useState("")
    const [idCardNumber, setIdCardNumber] = useState("")
    const [availableBalance, setAvailableBalance] = useState(null)

    const handleSubmit = e =>{
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Other Name(s)</Form.Label>
                <Form.Control type="text" value={otherName} onChange={e => setOtherName(e.taarget.value)} />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>ID Card Type</Form.Label>
                    <Form.Select defaultValue="Choose..." value={idCardType} onChange={e => setIdCardType(e.target.value)}>
                        <option disabled>Choose...</option>
                        <option value="Ghana Card">Ghana Card</option>
                        <option value="Passport">Passport</option>
                        <option value="Voter's ID">Voter's ID</option>
                        <option value="Driver's License">Driver's License</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>ID Card Number</Form.Label>
                    <Form.Control type="text" value={idCardNumber} onChange={e => setIdCardNumber(e.target.value)} />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3">
                <Form.Label>Available Balance</Form.Label>
                <Form.Control type="text" value={availableBalance} onChange={e => setAvailableBalance(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Create new wallet
            </Button>
        </Form>
    )
}

export default NewWalletForm
