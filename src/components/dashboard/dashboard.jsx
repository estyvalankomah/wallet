import React from 'react'
import './dashboard.css'
import Sidebar from '../sidebar/sidebar'
import View from '../view/view'

function Dashboard() {
    return (
        <div id="dashboard">
            <Sidebar />
            <View />
        </div>
    )
}

export default Dashboard
