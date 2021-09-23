import React , {useContext, useState , useEffect , useCallback} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';

const ConversationsContext = React.createContext() 

export function useConversations(){
    return useContext(ConversationsContext)
}

export function ConversationsProvider({ id , children }) {

    const [conversations , setConversations] = useLocalStorage('conversations' , []);
    const { contacts } = useContacts();
    const[selectedConversationIndex , setSelectedConversationIndex] = useState(0);
    const socket = useSocket();

    const createConversation = (recepients) => {
        setConversations(prevConversations => {
            return[...prevConversations , {recepients , messages: []}]
        })
    }

    const addMessageToConversation = useCallback(({recepients , text , sender}) => {
        setConversations(prevConversations => {
            let madeChange = false;
            const newMessage = { sender , text};
            const newConversations = prevConversations.forEach(conversation => {
                if(arrayEquality(conversation.recepients , recepients)){
                    madeChange = true;
                    return {...conversation , messages: [...conversation.messages , newMessage]}
                }
            })

            if(madeChange){
                return newConversations;
            }
            else{
                return[...prevConversations , {recepients , messages: [newMessage]}]
            }
        })
    } , [setConversations]);

    useEffect(() => {
        if(socket === undefined) return

        socket.on('receive-message' , addMessageToConversation)

        return () => socket.off('receive-message')
    } , [socket , addMessageToConversation])

    const sendMessage = (recepients , text) => { 
        socket.emit('send-message' , {recepients , text})
        addMessageToConversation({recepients , text , sender: id})
    }

    const formattedConversations = conversations.map((conversation , index) => {
        const recepients = conversation.recepients.map(recepient => { 
            const contact = contacts.find(contact => {
                return contact.id === recepient
            }) 
            const name = (contact && contact.name) || recepient
            return { id: recepient , name}
        })

        const messages = conversation.messages.map(message => {
            const contact = contacts.find(contact => {
                return contact.id === message.sender;
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = id === message.sender
            return {...message , senderName: name , fromMe}
        })

        const selected = index === selectedConversationIndex
        return {...conversations , messages ,  recepients , selected}
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        sendMessage,
        selectConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}
 

const arrayEquality = (a,b) => {
    if(a.length !== b.length) return false;

    a.sort();
    b.sort();
    return a.every((element , index) => {
        return element === b[index]
    })
}