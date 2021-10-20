import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

function NewWalletForm({callback}) {

    const empty_wallet = {
        first_name: "",
        last_name: "",
        other_name: "",
        identification_card_type: "",
        identification_card_number: "",
        available_balance: ""
    }

    const [wallet, setWallet] = useState(empty_wallet)

    const handleSubmit = e =>{
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/wallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(wallet)
        })
        .then(res => res.json())
        .then(json => {
            callback(true, json.message, json.status_code)
        })
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" value={wallet.first_name} onChange={e => setWallet({...wallet, first_name: e.target.value})} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" value={wallet.last_name} onChange={e => setWallet({...wallet, last_name: e.target.value})} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Other Name(s)</Form.Label>
                    <Form.Control type="text" value={wallet.other_name} onChange={e => setWallet({...wallet, other_name: e.target.value})} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>ID Card Type</Form.Label>
                        <Form.Select defaultValue="Choose..." value={wallet.identification_card_type} onChange={e => setWallet({...wallet, identification_card_type: e.target.value})}>
                            <option disabled>Choose...</option>
                            <option value="Ghana card">Ghana card</option>
                            <option value="Passport">Passport</option>
                            <option value="Voter's ID">Voter's ID</option>
                            <option value="Driver's License">Driver's License</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>ID Card Number</Form.Label>
                        <Form.Control type="text" value={wallet.identification_card_number} onChange={e => setWallet({...wallet, identification_card_number: e.target.value})} required />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Available Balance</Form.Label>
                    <Form.Control type="text" value={wallet.available_balance} onChange={e => setWallet({...wallet, available_balance: e.target.value})} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create new wallet
                </Button>
            </Form>
        </>
    )
}

export default NewWalletForm
