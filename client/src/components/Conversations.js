import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider'

export default function Conversations() {

    const { conversations , selectConversationIndex } = useConversations();

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation , index) => (
                <ListGroup.Item
                  className="c-item"
                  key={index}
                  action
                  onClick={() => selectConversationIndex(index)}
                  active={conversation.selected}
                 >
                    {conversation.recepients.map(r => r.name).join(', ')}
                </ListGroup.Item> 
            ))}
        </ListGroup>
    )
}
