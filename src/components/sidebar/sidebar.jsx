import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faCoins, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import './sidebar.css'
import DebitWalletForm from '../forms/debit_wallet_form'
import CreditWalletForm from '../forms/credit_wallet_form'
import { ToastContainer, Toast, ToastHeader, ToastBody } from 'react-bootstrap'

function Sidebar() {

    const [showDebitModal, setShowDebitModal] = useState(false);
    const handleCloseDebitModal = () => setShowDebitModal(false);
    const handleShowDebitModal = () => setShowDebitModal(true);

    const [showCreditModal, setShowCreditModal] = useState(false);
    const handleCloseCreditModal = () => setShowCreditModal(false);
    const handleShowCreditModal = () => setShowCreditModal(true);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("")
    const [toastStyle, setToastStyle] = useState("")

    const [balance, setBalance] = useState(0)

    useEffect(() => {
        
        return () => {
        }
    }, [balance])

    return (
        <div id="sidebar">
            <div id="top">M-Wallet</div>
            <div id="drawer">
                <div className="drawer-item">
                    <FontAwesomeIcon icon={faWallet} />
                    <span>Wallets</span>
                </div>
                <div className="drawer-item"  onClick={handleShowCreditModal}>
                    <FontAwesomeIcon icon={faCoins} />
                    <span>Credit wallet</span>
                </div>
                <div className="drawer-item" onClick={handleShowDebitModal}>
                    <FontAwesomeIcon icon={faHandHoldingUsd} />
                    <span>Debit wallet</span>
                </div>
            </div>
            <Modal show={showDebitModal} onHide={handleCloseDebitModal} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <ModalTitle>Debit Wallet</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <DebitWalletForm 
                        callback={(successful, message, balance, status) => {
                            handleCloseDebitModal();
                            setBalance(balance)
                            if (successful){
                                setToastMessage(message);
                                status == 200 ? setToastStyle('success'): setToastStyle('danger')
                                setShowToast(true);
                            }
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
                        callback={(successful, message, balance, status) => {
                            handleCloseCreditModal();
                            setBalance(balance)
                            if (successful){
                                setToastMessage(message);
                                status == 200 ? setToastStyle('success'): setToastStyle('danger')
                                setShowToast(true);
                            }
                    }}/>
                </ModalBody>
            </Modal>
            <ToastContainer className="p-3" position="top-end">
                <Toast onClose={() => setShowToast(false)} bg={toastStyle} show={showToast} delay={3000} autohide>
                    <ToastHeader closeButton>
                    <strong className="me-auto">Response</strong>
                    </ToastHeader>
                    <ToastBody>{toastMessage}</ToastBody>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default Sidebar
