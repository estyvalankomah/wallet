import React, { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSquare, faPencilAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalBody, ModalTitle, ModalFooter } from 'react-bootstrap'
import './walletTable.css'
import UpdateWalletForm from '../forms/update_wallet_form'
import DebitWalletForm from '../forms/debit_wallet_form'
import CreditWalletForm from '../forms/credit_wallet_form'

function WalletTable({data, callback, updateCallback}) {

    // const empty_wallet = {
    //     first_name: "",
    //     last_name: "",
    //     other_name: "",
    //     identification_card_type: "",
    //     identification_card_number: "",
    //     available_balance: 0.00
    // }

    const [wallet, setWallet] = useState(data);
    const [id, setID] = useState(1);
    const [show, setShow] = useState(false);
    const [walletData, setWalletData] = useState({})


    const [showDebitModal, setShowDebitModal] = useState(false);
    const handleCloseDebitModal = () => setShowDebitModal(false);
    const handleShowDebitModal = (wallet) =>{
        setWalletData(wallet)
        setShowDebitModal(true);
    }

    const [showCreditModal, setShowCreditModal] = useState(false);
    const handleCloseCreditModal = () => setShowCreditModal(false);
    const handleShowCreditModal = (wallet) =>{
        setWalletData(wallet)
        setShowCreditModal(true);
    }

    const [confirmModal, setShowConfirmModal] = useState(false);
    const handleConfirmModal = (id) => {
        setID(id)
        setShowConfirmModal(!confirmModal);
    }
  
    useEffect(() => {
        
        return () => {
        }
    }, [wallet])

    const handleClose = () => setShow(false);
    const handleShow = (wallet) =>{
        setWalletData(wallet)
        setShow(true);
    }

    // const [dropdown, setDropdown] = useState(false);
    const handleDropdown = (e) =>{
        // if(!dropdown){
        //     setDropdown(true)
        //     e.target.parentNode.nextSibling.style.display="flex"          
        // }else{
        //     setDropdown(false)
        //     e.target.parentNode.nextSibling.style.display="none"
        // }
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
            setShowConfirmModal(false)
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

    const handleActivate = (walletID) =>{
        fetch(`http://localhost:5000/api/v1/wallet/${walletID}/activate`, {
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
                        <td><div className="status active-status">{wallet.status}</div></td> :
                        <td><div className="status disabled-status">{wallet.status}</div></td>
                    }
                    <td className="actions">
                        {
                            wallet.status === "active" ?
                            <div style={{height: "18px", width: "6rem"}}>
                                <div className="d-flex justify-content-between w-100">
                                    <FontAwesomeIcon title="Delete wallet" icon={faTrash} color="red" onClick={e => handleConfirmModal(wallet.id)} />
                                    <FontAwesomeIcon title="Edit wallet"  icon={faPencilAlt} onClick={e => handleShow(wallet)} />
                                    <FontAwesomeIcon title="Disable" icon={faSquare} onClick={e => handleDisable(wallet.id)} />
                                    <FontAwesomeIcon title="More" icon={faCaretDown} onClick={e => handleDropdown(e)} />
                                </div>
                                <div className="more-dropdown" aria-labelledby="dropdownMenuButton">
                                    <div className="dropdown-item" onClick={e => handleShowCreditModal(wallet)}>Credit</div>
                                    <div className="dropdown-item" onClick={e => handleShowDebitModal(wallet)}>Debit</div>
                                </div>
                            </div>
                             :
                             <div style={{height: "18px", width: "6rem"}}>
                                <div className="d-flex w-100 justify-content-between">
                                    <FontAwesomeIcon title="Delete wallet" icon={faTrash} color="red" onClick={e => handleDelete(wallet.id)} />
                                    <FontAwesomeIcon title="Edit wallet"  icon={faPencilAlt} onClick={e => handleShow(wallet)} />
                                    <FontAwesomeIcon title="Activate" icon={faSquare} color="rgb(29, 199, 29)" onClick={e => handleActivate(wallet.id)} />
                                    <FontAwesomeIcon title="More" icon={faCaretDown} onClick={e => handleDropdown(e)} />
                                </div>
                            </div>
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
            <Modal show={showDebitModal} onHide={handleCloseDebitModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <ModalTitle>Debit Wallet</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <DebitWalletForm
                        data={walletData}
                        callback={(successful, message, status) => {
                            handleCloseDebitModal();
                            updateCallback(successful, message, status) 
                        }}
                     />
                </ModalBody>
            </Modal>
            <Modal show={showCreditModal} onHide={handleCloseCreditModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <ModalTitle>Credit Wallet</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <CreditWalletForm 
                        data={walletData}
                        callback={(successful, message, status) => {
                            handleCloseCreditModal();
                            updateCallback(successful, message, status)
                    }}/>
                </ModalBody>
            </Modal>
            <Modal show={confirmModal} onHide={handleConfirmModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <ModalTitle>Delete Wallet</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    Are you sure you want to delete this wallet?
                </ModalBody>
                <ModalFooter>
                    <Button variant="danger" onClick={e => handleDelete(id)}>Confirm</Button>
                    <Button variant="secondary" onClick={handleConfirmModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default WalletTable
