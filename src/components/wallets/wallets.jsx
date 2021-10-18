import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import './wallets.css'
import WalletTable from '../table/walletTable'

function Wallets() {

    const [items, setItems] = useState([])

    const handlePageClick = (data) =>{
        console.log(data)
    }

    return (
        <div id="wallets">
            <div id="top-row">
                <button>New wallet</button>
                <div id="search-bar">
                    <input type="search" name="" id=""/>
                </div>
            </div>
            <WalletTable />
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={5}
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
        </div>
    )
}

export default Wallets
