import React from 'react'
import './view.css'
import Wallets from '../wallets/wallets'

function View(){
    return (
        <div id="view">
            <div id="header">
                <div id="wallet-name">M-Wallet</div>
                <div id="profile">
                    <div id="avatar">O</div>
                    <div>Ophelia</div>
                </div>
            </div>
            <div id="main-view">
                <Wallets />
            </div>
        </div>
    )
}

export default View
