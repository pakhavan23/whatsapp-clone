import React , { useState } from 'react';
import { Modal, Form, Button} from 'react-bootstrap';
import { useContacts  } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

export default function NewConversationModal({ closeModal }) {

    const [selectedContactIds , useSelectedContactIds] = useState([])
    const { contacts } = useContacts();
    const { createConversation } = useConversations();

    const handleCheckboxChange = (id) => {
        useSelectedContactIds(prevId => {
            if(prevId.includes(id)){
                return prevId.filter(prevId => {
                    return id !== prevId
                })
            } else {
                return [...prevId , id]
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createConversation(selectedContactIds);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Create a New Conversations</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {contacts.map(contats => (
                        <Form.Group controlId={contacts.id} key={contacts.id}>
                            <Form.Check 
                                type="checkbox"
                                value={selectedContactIds.include(contact.id)}
                                label={contact.name}
                                onChange={() => handleCheckboxChange(contact.id)}
                            />
                        </Form.Group>
                    ))}
                    <Button type="submit">Start</Button>
                </Form>
            </Modal.Body>
        </>
    )
}