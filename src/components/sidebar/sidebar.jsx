import React from 'react'
import './sidebar.css'

function Sidebar() {
    return (
        <div id="sidebar">
            <div id="top">M-Wallet</div>
            <div id="drawer">
                <div className="drawer-item">Dashboard</div>
                <div className="drawer-item">Wallets</div>
                <div className="drawer-item">Credit</div>
                <div className="drawer-item">Debit</div>
            </div>
        </div>
    )
}

export default Sidebar
