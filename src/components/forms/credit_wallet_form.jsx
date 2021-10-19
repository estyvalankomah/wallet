import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function CreditWalletForm({callback}) {
    const credit_data = {
        id: "",
        amount: ""
    }

    const [data, setData] = useState(credit_data)

    const handleSubmit = e =>{
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/wallet/credit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(json => {
            callback(true, json.message, json.data.balance, json.status_code)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Wallet ID</Form.Label>
                <Form.Control type="text" value={data.id} onChange={e => setData({...data, id: e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" value={data.amount} onChange={e => setData({...data, amount: e.target.value})}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Credit wallet
            </Button>
        </Form>
    )
}

export default CreditWalletForm
