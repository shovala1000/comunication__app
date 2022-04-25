import React, { useState } from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ProfileHeader from '../profileHeader/ProfileHeader';
import { contactMap, Message, MessageData } from '../../userData/data';
import NewContact from '../newContact/NewContact';
import { MESSAGES_TYPE } from '../chatHistory-List/Message';
import ChatMessage from '../chatMessage-Box/ChatMessage';
import { getCurrentTime } from '../utils';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ChatScreen = (props) => {

    const [addMessage, setAddMessage] = useState(false);

    // save the state for error message when adding contact to the contacts list.
    const [currentError, setErrorMessage] = useState('');

    // saving the state for the alert message.
    const [isAlertActive, setAlertActive] = useState(false);

    let selectedContact = null;
    let classAlert = "alert alert-primary";

    // This useState is saving the current state of the contactMap in contactList.
    const [listState, setListState] = useState(contactMap.get(props.mainUserName).contactList);

    // This useState is saving the state for the selected contact, the contact that the current conversation is with.
    const [currentContact, setCurrentContact] = useState(selectedContact);


    // This loop finds the active chat in the map the save it on selectedContact.
    contactMap.get(props.mainUserName).contactList.forEach((MessageData) => {
        if (MessageData.contact.isActive === true) {
            selectedContact = MessageData.contact;
        }
    });


    // This function search in the contact's search box.
    const doSearch = function (q) {
        setListState(contactMap.get(props.mainUserName).contactList.filter((MessageData) => MessageData.contact.nickname.includes(q)));
    }


    // This function in handle conversation changing, pressing on contact from the contact list will invoke this function.
    const onConversationChange = function (newContact) {
        if (currentContact !== null) {
            currentContact.isActive = false;
        }
        newContact.isActive = true;
        setCurrentContact(newContact);
        setListState(contactMap.get(props.mainUserName).contactList);
    }


    // This function gets the nickname from the user and starts a conversation with him.
    const addContact = function (username) {
        document.getElementById("modal-textbox").value = '';
        // username invalid - default
        setErrorMessage('invalid username');
        setAlertActive(true);
        if (username === props.mainUserName) {
            //texting yourself
            setErrorMessage('can not able to add yourself');
            setAlertActive(true);
            return;
        }
        const newContact = contactMap.get(username).mainContact;
        //newContact is a register
        if (newContact) {
            let isExist = false;
            contactMap.get(props.mainUserName).contactList.forEach((MessageData) => {
                if (MessageData.contact.userName === username) {
                    isExist = true;
                }
            })
            //already exist in the contactList
            if (isExist) {
                setErrorMessage('username already exist');
                setAlertActive(true);
                return;
            }

            //add contact successfully
            contactMap.get(newContact.userName).mainContact.messages.set(props.mainUserName, []);
            contactMap.get(newContact.userName).contactList.push(new MessageData(contactMap.get(props.mainUserName).mainContact, '', ''));
            contactMap.get(props.mainUserName).mainContact.messages.set(newContact.userName, []);
            contactMap.get(props.mainUserName).contactList.push(new MessageData(newContact, '', ''));

            onConversationChange(newContact);
            setErrorMessage("");
            setAlertActive(false);
        }

    }


    function createNewMessage(info, type) {
        const currentTime = getCurrentTime();
        switch (type) {
            case MESSAGES_TYPE.TEXT:
                // setTypeMessage(MESSAGES_TYPE.TEXT);
                if (info.toString().length !== 0) {
                    contactMap.get(props.mainUserName).mainContact.messages.get(currentContact.userName).push(
                        new Message(currentTime, info, true, MESSAGES_TYPE.TEXT));
                    setAddMessage(true);
                    contactMap.get(currentContact.userName).mainContact.messages.get(contactMap.get(props.mainUserName).mainContact.userName).push(
                        new Message(currentTime, info, false, MESSAGES_TYPE.TEXT));


                    contactMap.get(props.mainUserName).contactList.filter((MessageData => MessageData.contact.userName === currentContact.userName))[0]
                        .latestMessage = info;
                    //mainUserName added currentContact but currentContact didn't add mainUserName.
                    if (contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName)) {
                        contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName).latestMessage = info;
                    }
                }
                break;

            case MESSAGES_TYPE.IMAGE:
                if (info.toString().length !== 1) {
                    contactMap.get(props.mainUserName).mainContact.messages.get(currentContact.userName).push(
                        new Message(currentTime, info, true, MESSAGES_TYPE.IMAGE));
                    contactMap.get(currentContact.userName).mainContact.messages.get(contactMap.get(props.mainUserName).mainContact.userName).push(
                        new Message(currentTime, info, false, MESSAGES_TYPE.IMAGE));
                    setAddMessage(true);

                    // console.log(contactMap.get(props.mainUserName).contactList.filter((MessageData) => MessageData.contact.userName === currentContact.userName)[0]);
                    contactMap.get(props.mainUserName).contactList.filter((MessageData) => MessageData.contact.userName === currentContact.userName)[0]
                        .latestMessage = 'Img';
                    //mainUserName added currentContact but currentContact didn't add mainUserName.
                    if (contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName)) {
                        contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName).latestMessage = 'Img';
                    }
                }
                break;

            case MESSAGES_TYPE.MICROPHONE:
                contactMap.get(props.mainUserName).mainContact.messages.get(currentContact.userName).push(
                    new Message(currentTime, info, true, MESSAGES_TYPE.MICROPHONE));
                contactMap.get(currentContact.userName).mainContact.messages.get(contactMap.get(props.mainUserName).mainContact.userName).push(
                    new Message(currentTime, info, false, MESSAGES_TYPE.MICROPHONE));
                setAddMessage(true);


                contactMap.get(props.mainUserName).contactList.filter((MessageData) => MessageData.contact.userName === currentContact.userName)[0]
                    .latestMessage = 'Audio';
                //mainUserName added currentContact but currentContact didn't add mainUserName.
                if (contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName)) {
                    contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName).latestMessage = 'Audio';
                }
                break;

            case MESSAGES_TYPE.VIDEO:
                if (info.toString().length !== 0) {
                    // setTypeMessage(MESSAGES_TYPE.VIDEO);

                    contactMap.get(props.mainUserName).mainContact.messages.get(currentContact.userName).push(
                        new Message(currentTime, info, true, MESSAGES_TYPE.VIDEO));
                    contactMap.get(currentContact.userName).mainContact.messages.get(contactMap.get(props.mainUserName).mainContact.userName).push(
                        new Message(currentTime, info, false, MESSAGES_TYPE.VIDEO));
                    setAddMessage(true);


                    contactMap.get(props.mainUserName).contactList.filter((MessageData) => MessageData.contact.userName === currentContact.userName)[0]
                        .latestMessage = 'Video';
                    //mainUserName added currentContact but currentContact didn't add mainUserName.
                    if (contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName)) {
                        contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName).latestMessage = 'Video';
                    }
                }
                break;
            default:
                return;
        }
        contactMap.get(props.mainUserName).contactList.filter((MessageData) => MessageData.contact.userName === currentContact.userName)[0]
            .latestMessageTime = currentTime;
        //mainUserName added currentContact but currentContact didn't add mainUserName.
        // if (contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName)) {
        contactMap.get(currentContact.userName).contactList.find((MessageData) => MessageData.contact.userName === props.mainUserName)
            .latestMessageTime = currentTime;
        // }
    }


    const mass = () => {
        if (currentContact !== null) {
            return contactMap.get(props.mainUserName).mainContact.messages.get(currentContact.userName);
        }
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
        <Container className='chat-screen'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
            <Row className=" chat-page">

                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className='left-menu'>
                    <Container className='left-menu-container'>
                        <Row className='profile-header-class'>
                            <Col className='profile-header'>
                                <ProfileHeader contact={contactMap.get(props.mainUserName).mainContact} />
                            </Col>
                        </Row>


                        <Row className='search-tn' style={isAlertActive ? { display: 'none' } : null}>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} className='contact-search'>
                                <ContactSearch doSearch={doSearch} />
                            </Col>
                            <Col className='new-contact-btn'>
                                <NewContact addContact={addContact} currentError={currentError}
                                    setErrorMessage={setErrorMessage} isAlertActive={isAlertActive}
                                    setAlertActive={setAlertActive} />
                            </Col>
                        </Row>

                        <Row style={isAlertActive ? null : { display: 'none' }} className='error-message'>
                            <Col className={classAlert} role="alert">{currentError}
                                <button type="button" className="btn-close" aria-label="Close"
                                    onClick={() => setAlertActive(false)}></button>
                            </Col>
                        </Row>

                        <Row className='contact-list'>
                            <Col className="people-list">
                                {<ContactList userName={props.mainUserName} listState={listState}
                                    onContactItemSelected={onConversationChange} />}
                            </Col>
                        </Row>
                    </Container>
                </Col>


                <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className='chat-menu'>
                    <Container className='chat-menu-container'>
                        <Row className='chat-header-class'>
                            <Col className='chat-header'>
                                <ChatHeader selectedChat={currentContact} />
                            </Col>
                        </Row>
                        <Row className='chat-history-class'>
                            <Col className='chat-history'>
                                {addMessage ? setAddMessage(false) : <ChatHistory messages={mass()} />}
                            </Col>
                        </Row>
                        <Row className='chat-message-box'>
                            <Col className='chat-message'>
                                <ChatMessage createMessage={createNewMessage} />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
    {/*console.log(contactMap)*/}
        </Container>
    );
};

export default ChatScreen;