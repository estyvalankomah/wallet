import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import './wallets.css'
import WalletTable from '../table/walletTable'
import { Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import toast, { Toaster } from "react-hot-toast";
import NewWalletForm from '../forms/new_wallet_form'

function Wallets() {

    const [wallets, setWallets] = useState([])
    const [totalWallets, setTotalWallets] = useState(0)
    const [walletsLoaded, setWalletsLoaded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [show, setShow] = useState(false);

    const successNotify = (msg) => toast.success(msg);
    const failNotify = (msg) => toast.error(msg)

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const loadWallets = () => {
        fetch(`http://localhost:5000/api/v1/wallets?pageNumber=${pageNumber}`)
            .then(response => response.json()
            .then(res => {
                setWallets(res.data)
                setTotalWallets(res.size)
            }))
    }

    useEffect(() => {
        if (!walletsLoaded) {
           loadWallets()
        }
        setWalletsLoaded(true)
    },[wallets, walletsLoaded, loadWallets])

    const pageCount = Math.ceil(totalWallets / 6)

    const handlePageClick = ({selected}) =>{
        setPageNumber(selected)
        fetch(`http://localhost:5000/api/v1/wallets?pageNumber=${selected}`)
            .then(response => response.json()
            .then(res => {
                setWallets(res.data)
                setTotalWallets(res.size)
            }))
    }

    return (
        <div id="wallets">
            <div id="top-row">
                <button id="new-wallet" onClick={handleShow}>New wallet</button>
                {/* <div id="search-bar">
                    <input type="search" name="" id=""/>
                </div> */}
            </div>
            <WalletTable 
                data={wallets}
                callback={(message, status) =>{
                    loadWallets();
                    status === 200 ? successNotify(message): failNotify(message)
                }}
                updateCallback= {(successful, message, status) => {
                    loadWallets();
                    if (successful){
                        status === 200 ? successNotify(message): failNotify(message)
                    }
                }} 
            />
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousLinkClassName={'page-link'}
                previousClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item'}
                activeClassName={'active'}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <ModalTitle>Add New Wallet</ModalTitle>
                </Modal.Header>
                <ModalBody>
                    <NewWalletForm 
                        callback={(successful, message, status) => {
                            loadWallets();
                            handleClose();
                            if (successful){
                                status === 200 ? successNotify(message): failNotify(message)
                            }
                        }} 
                    />
                </ModalBody>
            </Modal>
            <Toaster />
        </div>
    )
}

export default Wallets
