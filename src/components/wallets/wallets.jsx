import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import './wallets.css'
import WalletTable from '../table/walletTable'
import { Modal, ModalBody, ModalTitle } from 'react-bootstrap'
import NewWalletForm from '../forms/new_wallet_form'

function Wallets() {

    const [wallets, setWallets] = useState([])
    const [walletsLoaded, setWalletsLoaded] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        if (!walletsLoaded) {
            fetch('http://localhost:5000/api/v1/wallets')
            .then(response => response.json()
            .then(res => {
                setWallets(res.data)
            }))
        }
        setWalletsLoaded(true)
    },[wallets, walletsLoaded])

    const pageCount = Math.ceil(wallets.length / 6)

    const handlePageClick = ({selected}) =>{
        setPageNumber(selected)
    }

    return (
        <div id="wallets">
            <div id="top-row">
                <button id="new-wallet" onClick={handleShow}>New wallet</button>
                <div id="search-bar">
                    <input type="search" name="" id=""/>
                </div>
            </div>
            <WalletTable data={wallets} pageNumber={pageNumber}  />
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
                    <NewWalletForm />
                </ModalBody>
            </Modal>
        </div>
    )
}

export default Wallets
