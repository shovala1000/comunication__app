
import React, { useState } from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ProfileHeader from '../profileHeader/ProfileHeader';
import { contactMap } from '../../userData/data';
import NewContact from '../newContact/NewContact';
import { MESSAGES_TYPE, NewMessage } from '../chatHistory-List/Message';
import ChatMessage from '../chatMessage-Box/ChatMessage';

const ChatScreen = (props) => {
    const [errorMessage, setErrorMessage] = useState("");
    let selectedContact = null;

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
        if (currentContact != null) {
            currentContact.isActive = false;
        }
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
        // username invalid - default
        setErrorMessage('username invalid');
        if (username === props.contactChatInfo.mainContact.userName) {
            //texting yourself
            setErrorMessage('can not able to add yourself');
            return;
        }
        var newContact = contactMap.get(username).mainContact;
        if (newContact) {
            setErrorMessage('no problem');
            var isExist = false;
            props.contactChatInfo.contactList.forEach((value) => {
                if (value.userName === username) {
                    isExist = true;
                }
            })
            if (isExist) {
                //alreadyExist
                setErrorMessage('username already exist');
            }
            else {
                newContact.messages.set(props.contactChatInfo.mainContact.userName, []);
                props.contactChatInfo.mainContact.messages.set(newContact.userName, []);
                props.contactChatInfo.contactList.push(newContact);
                contactMap.set(newContact.userName, props.contactChatInfo);
                setContactList(props.contactChatInfo.contactList);
                onConversationChage(newContact);
                setErrorMessage("");
            }
            return;
        }
    }


    function getCurrentTime() {
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = time + ' ' + date;
        return String(dateTime);
    }


    function createNewMessage(info, type) {
        var currentTime = getCurrentTime();
        // console.log("current time is: " + currentTime);
        switch (type) {
            case MESSAGES_TYPE.TEXT:
                // console.log("in createNewMessage");
                // console.log(info);
                // console.log(type);

                // currentContact.latestMessageTime = currentTime;
                // currentContact.messages.push(NewMessage(currentTime,MESSAGES_TYPE.TEXT, info, true));
                // props.contactChatInfo.mainContact.messages.set(selectedContact.userName,[... NewMessage(currentTime,MESSAGES_TYPE.TEXT, info, true)]);
                // currentContact.latestMessage = info;
                // currentContact.latestMessageTime = currentTime;
                // selectedContact.messages.push(NewMessage(currentTime,MESSAGES_TYPE.TEXT, info, false));
                // selectedContact.latestMessage = info;
                // selectedContact.latestMessageTime = currentTime;
                // console.log(contactMap);
                console.log("clicked on send text");
                break;

            case MESSAGES_TYPE.IMAGE:
                console.log("clicked on image");
                break;

            case MESSAGES_TYPE.MICROPHONE:
                console.log("clicked on microphone");
                break;

            case MESSAGES_TYPE.VIDEO:
                console.log("clicked on video");
                break;

            default:
                return null;
        }

    }

    function checkMessagesStatus(){
        if (currentContact !== null) {
            return currentContact.messages.get(props.contactChatInfo.mainContact.userName);
        } else {
            return currentContact;
        }
    }

    let messageStatus = checkMessagesStatus();


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
                                <div id="errorMessage">{errorMessage}</div>
                                <ContactList map={contactList}
                                    selectedConversation={currentContact}
                                    onContactItemSelected={onConversationChage} />
                                <div className="chat">
                                    <ChatHeader selectedChat={currentContact} />
                                    {<ChatHistory
                                        messages={messageStatus} />}
                                    <ChatMessage createMessage={createNewMessage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
};

export default ChatScreen;
