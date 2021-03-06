import React, { useState , useCallback } from 'react';
import { Form, InputGroup , Button} from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';
import '../styles/conversation.css';

const OpenConversation = () => {

    const[text , setText] = useState('');
    const setRef = useCallback(node => {
        if(node){
            node.scrollIntoView({smooth: true});
        }
    } , []);
    const { sendMessage , selectedConversation } = useConversations();

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(selectedConversation.recepients.map(r => r.id) , text);
        setText('');
    }

    return(
        <div className="d-flex flex-column flex-grow-1 open-c">
            <div className="flex-grow-1 overflow-auto chat-b">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message , index) => {
                        const lastMessage = selectedConversation.messages.length -1 === index
                        return(
                            <div ref={lastMessage ? setRef : null} key={index} className={`my-1 d-flex flex-column  ${message.fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`}>
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''} `}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={handleSubmit} className="i-group">
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control 
                          as="textarea" 
                          className="c-input"
                          required 
                          value={text}
                          onChange={e => setText(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button type="submit">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation;