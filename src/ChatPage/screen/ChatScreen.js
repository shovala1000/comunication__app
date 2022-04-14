import React from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ChatMessage from '../chatMessage-Box/ChatMessage';
import ProfileHeader from '../profileHeader/ProfileHeader';
import { myContacts, selectedChat } from '../../userData/myContacts';
import {myMessages} from '../../userData/myMessages';

const ChatScreen = () => {
    return (
        <Container>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <ProfileHeader />
                            <ContactSearch />
                            <ContactList myContacts={myContacts}/>

                            <div className="chat">

                                <ChatHeader selectedChat={selectedChat}/>

                                <ChatHistory myMessages={myMessages}/>

                                <ChatMessage />
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default ChatScreen;