import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'

function CreditWalletForm({data, callback}) {
    const credit_data = {
        id: data.id,
        amount: ""
    }

    const [walletData, setData] = useState(credit_data)

    const handleSubmit = e =>{
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/wallet/credit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(walletData)
        })
        .then(res => res.json())
        .then(json => {
            callback(true, json.message, json.status_code)
        })
    }

    useEffect(() => {
        console.log(credit_data.id)
    })

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Enter credit amount</Form.Label>
                <Form.Control type="text" value={walletData.amount} onChange={e => setData({...walletData, amount: e.target.value})}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Credit wallet
            </Button>
        </Form>
    )
}

export default CreditWalletForm
