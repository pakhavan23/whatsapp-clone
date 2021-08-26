import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = ({id}) => {
    return (
        <div className="d-flex" style={{height: '100vh', width: '50%'}}>
            <Sidebar id={id} />
        </div>
    )
        
}

export default Dashboard;