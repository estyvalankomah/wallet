import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function DebitWalletForm({data, callback}) {
    const debit_data = {
        id: data.id,
        amount: ""
    }

    const [walletData, setData] = useState(debit_data)

    const handleSubmit = e =>{
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/wallet/debit', {
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

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" min="0" value={walletData.amount} step=".01" onChange={e => setData({...walletData, amount: e.target.value})}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Debit wallet
            </Button>
        </Form>
    )
}

export default DebitWalletForm
