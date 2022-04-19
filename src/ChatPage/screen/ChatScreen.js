
import React, { useState } from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ChatMessage from '../chatMessage-Box/ChatMessage';
import ProfileHeader from '../profileHeader/ProfileHeader';
import {Contact, contactMap} from '../../userData/data';
import NewContact from '../newContact/NewContact';

const ChatScreen=(props)=>{
    let selectedContact;
    // This useState is saving the current state of the contactMap in contactList.
    const [contactList, setContactList] = useState(props.contactChatInfo.contactList);

    // This function search in the contact's search box.
    const doSearch = function (q) {
        setContactList(Array.from(props.contactChatInfo.contactList).filter((item) => item.nickname.includes(q)));
    }

    // This loop finds the active chat in the map the save it on selectedContact.
    props.contactChatInfo.contactList.forEach((item) => {
        if (item.isActive === true) {
            selectedContact = item;
        }
    });

    // This useState is saving the state for the selected contact, the contact that the current conversation is with.
    const [currentContact, setSelectedContact] = useState(selectedContact);

    // this function in handle conversation changing, pressing on contact from the contact list will invoke this function.
    const onConversationChage = function (newContact) {
        currentContact.isActive = false;
        newContact.isActive = true;
        setSelectedContact(newContact);
        //contactMap[newContact.userName] = newContact;
    }

    // This function gets the nickname from the user and starts a conversation with him.
    /*
        NOTICE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        After creating the users map, need to find the nickname and add it to the constructor.
    */
    const addContact = function (username) {
        let newContact = contactMap.get(username).mainContact;
        var isExist = false;
        //********* need to set an error if newcontact===undefined or already in the list
        props.contactChatInfo.contactList.forEach((value)=>{
            if(value.userName===username){
                isExist=true;
            }
        })
        if(isExist){
            //alreadyExist
        }else{
            newContact.messages.set(props.contactChatInfo.mainContact.userName,[]);
            props.contactChatInfo.mainContact.messages.set(newContact.userName,[]);
            props.contactChatInfo.contactList.push(newContact);
            contactMap.set(newContact.userName, props.contactChatInfo);
            setContactList(props.contactChatInfo.contactList);
        }
        onConversationChage(newContact);
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
                            <ProfileHeader contact={props.contactChatInfo.mainContact} />
                            <ContactSearch doSearch={doSearch} />
                            <NewContact addContact={addContact} />
                            <ContactList map={contactList}
                                selectedConversation={currentContact}
                                onContactItemSelected={onConversationChage} />
                            <div className="chat">
                                <ChatHeader selectedChat={currentContact} />
                                {<ChatHistory
                                    messages={currentContact.messages.get(props.contactChatInfo.mainContact.userName)} />}
                                <ChatMessage />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ChatScreen;