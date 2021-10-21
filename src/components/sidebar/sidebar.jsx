import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import './sidebar.css'

function Sidebar() {

    return (
        <div id="sidebar">
            <div id="top">M-Wallet</div>
            <div id="drawer">
                <div className="drawer-item">
                    <FontAwesomeIcon icon={faWallet} />
                    <span>Wallets</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
