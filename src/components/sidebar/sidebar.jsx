import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faWallet } from '@fortawesome/free-solid-svg-icons'
import './sidebar.css'

function Sidebar() {
    return (
        <div id="sidebar">
            <div id="top">M-Wallet</div>
            <div id="drawer">
                <div className="drawer-item">
                    <FontAwesomeIcon icon={faHome} />
                    <span>Dashboard</span>
                </div>
                <div className="drawer-item">
                    <FontAwesomeIcon icon={faWallet} />
                    <span>Wallets</span>
                </div>
                {/* <div className="drawer-item">Credit</div>
                <div className="drawer-item">Debit</div> */}
            </div>
        </div>
    )
}

export default Sidebar
