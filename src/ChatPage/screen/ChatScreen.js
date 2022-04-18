
import React, { useState } from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ChatMessage from '../chatMessage-Box/ChatMessage';
import ProfileHeader from '../profileHeader/ProfileHeader';
import { contactMap, Contact } from '../../userData/data';
import NewContact from '../newContact/NewContact';


const ChatScreen = (
    selectedContact,
) => {

    // This useState is saving the current state of the contactMap in contactList.
    const [contactList, setContactList] = useState(contactMap);

    // This function search in the contact's search box.
    const doSearch = function (q) {
        setContactList(Array.from(contactMap.values()).filter((item) => item.nickname.includes(q)));
    }

    // This loop finds the active chat in the map the save it on selectedContact.
    contactMap.forEach((item, index) => {
        if (item.isActive === true) {
            selectedContact = item;
        }
    });

    // This useState is saving the state for the selected contact, the contact that the current conversation is with.
    const [currentContact, setSelectedContact] = useState(selectedContact);

    // this function in handle convetsation changing, pressing on contact from the contact list will invoke this function.
    const onConversationChage = function (newContact) {
        currentContact.isActive = false;
        newContact.isActive = true;
        setSelectedContact(newContact);
        contactMap[newContact.userName] = newContact;
    }

    // This function gets the nickname from the user and starts a conversation with him.
    /*
        NOTICE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        After creating the users map, need to find the nickname and add it to the constructor.
    */
    const addContact = function (username) {
        let newContact = new Contact(
            username,
            'defalut-profile-picture.png',
            'avatar',
            username,
        )
        console.log(newContact);
        contactMap.set(newContact.userName, newContact);
        setContactList(contactMap);
        onConversationChage(newContact);
        console.log(contactMap);
    }

    /*
      The return value for this page.
         In ProfileHeader - The name of the user, and his Image.
         In NewContact - This component contain the code for adding a new contact to the contact list and start a new conversaion.
         In ContactSearch - This component contains the search box.
         In ContactList - This component contains the list of contact that whom the user has a chat with them. Showing details about the conversation.
         In ChatHeader - This component contains the name of the user nickname that the current chat is with.
         In ChatHistory - This component contains the chat history with that specific user.
         In ChatMessage - This component contains the send message box and the other application for sending messages.
     */
    return (
        <Container>

            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <div className="container">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <ProfileHeader />
                            <ContactSearch doSearch={doSearch} />
                            <NewContact addContact={addContact} />
                            <ContactList map={contactList}
                                selectedConversation={currentContact}
                                onContactItemSelected={onConversationChage} />

                            <div className="chat">


                                <ChatHeader selectedChat={currentContact} />

                                {<ChatHistory
                                    messages={currentContact.messages} />}
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
