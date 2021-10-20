import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import './walletTable.css'
import UpdateWalletForm from '../forms/update_wallet_form'

function WalletTable({data, callback, updateCallback}) {

    const empty_wallet = {
        first_name: "",
        last_name: "",
        other_name: "",
        identification_card_type: "",
        identification_card_number: "",
        available_balance: 0.00
    }

    const [wallet, setWallet] = useState(data);
    const [show, setShow] = useState(false);
    const [walletData, setWalletData] = useState(empty_wallet)
  
    useEffect(() => {
        
        return () => {
        }
    }, [wallet])

    const handleClose = () => setShow(false);
    const handleShow = (wallet) =>{
        setWalletData(wallet)
        setShow(true);
    } 

    const handleDelete = (walletID) =>{
        fetch(`http://localhost:5000/api/v1/wallet/${walletID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(json => {
            callback(json.message, json.status_code)
        })
    }

    const handleDisable = (walletID) =>{
        fetch(`http://localhost:5000/api/v1/wallet/${walletID}/disable`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(json => {
            callback(json.message, json.status_code)
        })
    }

    const displayWallets = data
        .map((wallet) => {
            return (
                <tr>
                    <tr>{wallet.id}</tr>
                    <td>{wallet.first_name + " " +  wallet.other_name + " " + wallet.last_name}</td>
                    <td>{wallet.identification_card_type}</td>
                    <td>{wallet.identification_card_number}</td>
                    <td>{wallet.available_balance}</td>
                    {
                        wallet.status === "active" ? 
                        <td><span className="active-status">{wallet.status}</span></td> :
                        <td><span className="disabled-status">{wallet.status}</span></td>
                    }
                    <td className="actions">
                        {
                            wallet.status === "active" ?
                            <>
                            <FontAwesomeIcon title="Delete wallet" icon={faTrash} color="red" onClick={e => handleDelete(wallet.id)} />
                            <FontAwesomeIcon title="Edit wallet"  icon={faPencilAlt} onClick={e => handleShow(wallet)} />
                            <FontAwesomeIcon title="Disable" icon={faSquare} onClick={e => handleDisable(wallet.id)} /></> :
                            <>
                            <FontAwesomeIcon title="Delete wallet" icon={faTrash} color="red" onClick={e => handleDelete(wallet.id)} />
                            <FontAwesomeIcon title="Edit wallet"  icon={faPencilAlt} onClick={e => handleShow(wallet)} /></>
                        }
                    </td>
                </tr>
            )
        })

    return (
        <div id="wallet-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>ID Card Type</th>
                        <th>ID Card Number</th>
                        <th>Available Balance</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayWallets}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Update Wallet</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <UpdateWalletForm 
                        data={walletData} 
                        callback={(successful, message, status) => {
                            handleClose();
                            updateCallback(successful, message, status)     
                        }} 
                    />
                </ModalBody>
            </Modal>
        </div>
    )
}

export default WalletTable
