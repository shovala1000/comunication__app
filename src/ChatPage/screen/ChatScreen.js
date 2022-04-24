import React, {useState} from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ProfileHeader from '../profileHeader/ProfileHeader';
import {contactMap} from '../../userData/data';
import NewContact from '../newContact/NewContact';
import {MESSAGES_TYPE} from '../chatHistory-List/Message';
import ChatMessage from '../chatMessage-Box/ChatMessage';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ChatScreen = (props) => {
    let selectedContact = null;
    const [addMessage, setAddMessage] = useState(false);
    const [currentError, setErrorMessage] = useState('');
    const [isAlertActive, setAlertActive] = useState(false);
    // This useState is saving the current state of the contactMap in contactList.
    const [contactList, setContactList] = useState(props.mainContact.messages.keys());

    // This useState is saving the state for the selected contact, the contact that the current conversation is with.
    const [currentContact, setSelectedContact] = useState(selectedContact);
    const [typeMessage, setTypeMessage] = useState(MESSAGES_TYPE.TEXT);


    // This function search in the contact's search box.
    const doSearch = function (q) {
        setContactList(Array.from(contactList).filter((item) => item.nickname.includes(q)));
    }

    // This loop finds the active chat in the map the save it on selectedContact.
    for (let i=0; i<contactList.length; i++){
        console.log(props.mainContact)
        let contactName = contactList.next();
        console.log(contactName);
        if (contactName.isActive === true) {
            setSelectedContact(contactName);
        }
    }

    // this function in handle conversation changing, pressing on contact from the contact list will invoke this function.
    const onConversationChage = function (newContact) {
        if (currentContact !== null) {
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
        document.getElementById("modal-textbox").value = '';
        // username invalid - default
        setErrorMessage('username invalid');
        setAlertActive(true);
        if (username === props.contactChatInfo.mainContact.userName) {
            //texting yourself
            setErrorMessage('can not able to add yourself');
            setAlertActive(true);
            return;
        }
        var newContact = contactMap.get(username).mainContact;
        if (newContact) {
            var isExist = false;
            contactList.forEach((value) => {
                if (value.userName === username) {
                    isExist = true;
                }
            })
            if (isExist) {
                //alreadyExist
                setErrorMessage('username already exist');
                setAlertActive(true);
            } else {
                //add contact successfully
                newContact.messages.set(props.contactChatInfo.mainContact.userName, []);
                currentContact.messages.set(newContact.userName, []);
                props.contactChatInfo.mainContact.messages.set(newContact.userName, []);
                contactList.push(newContact);
                contactMap.set(newContact.userName, props.contactChatInfo);
                setContactList(contactList);
                onConversationChage(newContact);
                setErrorMessage("");
                setAlertActive(false);
            }
        }
        console.log(contactMap);
    }


    function getCurrentTime() {
        var today = new Date();
        let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        let minutes = today.getMinutes();
        let time;
        if (minutes > 10) {
            time = today.getHours() + ":" + today.getMinutes();
        } else {
            time = today.getHours() + ":0" + today.getMinutes();
        }
        let dateTime = time + ', ' + date;
        return String(dateTime)
    }

    function createNewMessage(info, type) {
        console.log(info)
        var currentTime = getCurrentTime();
        // console.log("current time is: " + currentTime);
        switch (type) {
            case MESSAGES_TYPE.TEXT:
                setTypeMessage(MESSAGES_TYPE.TEXT);
                console.log("clicked on send text");
                if (info.toString().length !== 0) {
                    contactMap.get(props.contactChatInfo.mainContact.userName).mainContact.messages.get(currentContact.userName).push({
                        time: currentTime,
                        data: info,
                        isMyMessage: true,
                        type: MESSAGES_TYPE.TEXT
                    });
                    setAddMessage(true);
                    contactMap.get(currentContact.userName).mainContact.messages.get(props.contactChatInfo.mainContact.userName).push({
                        time: currentTime,
                        data: info,
                        isMyMessage: false,
                        type: MESSAGES_TYPE.TEXT
                    });
                    console.log(contactMap);
                    contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
                        .latestMessage = info;
                    contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
                        .latestMessage = info;
                }
                break;

            case MESSAGES_TYPE.IMAGE:
                console.log("clicked on image");
                if (info.toString().length !== 1) {
                    setTypeMessage(MESSAGES_TYPE.IMAGE);

                    contactMap.get(props.contactChatInfo.mainContact.userName).mainContact.messages.get(currentContact.userName).push({
                        time: currentTime,
                        data: info,
                        isMyMessage: true,
                        type: MESSAGES_TYPE.IMAGE
                    });
                    contactMap.get(currentContact.userName).mainContact.messages.get(props.contactChatInfo.mainContact.userName).push({
                        time: currentTime,
                        data: info,
                        isMyMessage: false,
                        type: MESSAGES_TYPE.IMAGE
                    });
                    setAddMessage(true);
                    contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
                        .latestMessage = 'Img';
                    contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
                        .latestMessage = 'Img';
                }
                break;

            case MESSAGES_TYPE.MICROPHONE:
                contactMap.get(props.contactChatInfo.mainContact.userName).mainContact.messages.get(currentContact.userName).push({
                    time: currentTime,
                    data: info,
                    isMyMessage: true,
                    type: MESSAGES_TYPE.MICROPHONE
                });
                contactMap.get(currentContact.userName).mainContact.messages.get(props.contactChatInfo.mainContact.userName).push({
                    time: currentTime,
                    data: info,
                    isMyMessage: false,
                    type: MESSAGES_TYPE.MICROPHONE
                });
                console.log(contactMap);
                setAddMessage(true);
                contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
                    .latestMessage = 'Audio';
                contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
                    .latestMessage = 'Audio';
                break;

            case MESSAGES_TYPE.VIDEO:
                console.log("clicked on video");
                if (info.toString().length !== 0) {
                    setTypeMessage(MESSAGES_TYPE.VIDEO);

                    contactMap.get(props.contactChatInfo.mainContact.userName).mainContact.messages.get(currentContact.userName).push({
                        time: currentTime,
                        data: info,
                        isMyMessage: true,
                        type: MESSAGES_TYPE.VIDEO
                    });
                    contactMap.get(currentContact.userName).mainContact.messages.get(props.contactChatInfo.mainContact.userName).push({
                        time: currentTime,
                        data: info,
                        isMyMessage: false,
                        type: MESSAGES_TYPE.VIDEO
                    });
                    console.log(contactMap);
                    setAddMessage(true);
                    contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
                        .latestMessage = 'Video';
                    contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
                        .latestMessage = 'Video';
                }
                break;
        }
        contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
            .latestMessageTime = currentTime;
        contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
            .latestMessageTime = currentTime;
        // contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
        //     .latestMessage = info;
        // contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
        //     .latestMessage = info;
        setContactList(contactMap.get(props.contactChatInfo.mainContact.userName).contactList);
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
    const mass = () => {
        if (currentContact !== null) {
            // return contactMap.get(currentContact.userName).mainContact.messages.get(props.contactChatInfo.mainContact.userName);
            return contactMap.get(props.connectedUser).mainContact.messages.get(currentContact.userName);
        }
    }

    let classAlert = "alert alert-primary";
    // if (isAlertActive === false) {
    //     classAlert = 'alert alert-primary'// + '-hide'
    // }


    return (
        <Container className='chat-screen'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
            <Row className=" chat-page">

                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className='left-menu'>
                    <Container className='left-menu-container'>
                        <Row className='profile-header-class'>
                            <Col className='profile-header'>
                                <ProfileHeader contact={props.contactChatInfo.mainContact}/>
                            </Col>
                        </Row>


                        <Row className='search-tn' style={isAlertActive?{display:'none'}:null}>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} className='contact-search'>
                                <ContactSearch doSearch={doSearch}/>
                            </Col>
                            <Col className='new-contact-btn'>
                                <NewContact addContact={addContact} currentError={currentError}
                                            setErrorMessage={setErrorMessage} isAlertActive={isAlertActive}
                                            setAlertActive={setAlertActive}/>
                            </Col>
                        </Row>
                        <Row style={isAlertActive?null:{display:'none'}} className='error-message'>
                            <Col className={classAlert} role="alert">{currentError}>
                                <button type="button" className="btn-close" aria-label="Close"
                                        onClick={() => setAlertActive(false)}></button>
                            </Col>
                        </Row>
                        <Row className='contact-list'>
                            <Col className="people-list">
                                <ContactList map={contactList}
                                             selectedConversation={currentContact}
                                             onContactItemSelected={onConversationChage}/>
                            </Col>
                        </Row>
                    </Container>
                </Col>


                <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9} className='chat-menu'>
                    <Container className='chat-menu-container'>
                        <Row className='chat-header-class'>
                            <Col className='chat-header'>
                                <ChatHeader selectedChat={currentContact}/>
                            </Col>
                        </Row>
                        <Row className='chat-history-class'>
                            <Col className='chat-history'>
                                {addMessage ? setAddMessage(false) : <ChatHistory messages={mass()}/>}
                            </Col>
                        </Row>
                        <Row className='chat-message-box'>
                            <Col className='chat-message'>
                                <ChatMessage createMessage={createNewMessage}/>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );

};

export default ChatScreen;