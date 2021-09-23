import React from 'react';
import Sidebar from './Sidebar';
import OpenConversation from './OpenConversation';
import { useConversations } from '../contexts/ConversationsProvider';
import '../styles/dashboard.css';

const Dashboard = ({id}) => {

    const {selectedConversation} = useConversations();

    return (
        <div className="d-flex dashboard">
            <Sidebar id={id} />
            {selectedConversation && <OpenConversation />}
        </div>
    )
        
}

export default Dashboard;