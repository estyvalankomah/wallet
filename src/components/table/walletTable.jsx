import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faSquare, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import './walletTable.css'

function WalletTable({data, pageNumber}) {

    const walletsPerPage = 6
    const pagesVisited = pageNumber * walletsPerPage

    const displayWallets = data
        .slice(pagesVisited, pagesVisited + walletsPerPage)
        .map((wallet) => {
            return (
                <tr>
                    <td>{wallet.first_name + " " +  wallet.other_name + " " + wallet.last_name}</td>
                    <td>{wallet.identification_card_type}</td>
                    <td>{wallet.identification_card_number}</td>
                    <td>{wallet.available_balance}</td>
                    <td><span className="active-status">{wallet.status}</span></td>
                    <td className="actions">
                        <FontAwesomeIcon title="Delete wallet" icon={faTrash} color="red" />
                        <FontAwesomeIcon title="Edit wallet"  icon={faPencilAlt} />
                        <FontAwesomeIcon title="Activate/Deactivate" icon={faSquare} />
                    </td>
                </tr>
            )
        })

    return (
        <div id="wallet-table">
            <table>
                <thead>
                    <tr>
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
        </div>
    )
}

export default WalletTable
