import React from 'react'
import ReactPaginate from 'react-paginate'
import './wallets.css'
import WalletTable from '../table/walletTable'

function Wallets() {

    const handlePageClick = () =>{

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
            />
        </div>
    )
}

export default Wallets
