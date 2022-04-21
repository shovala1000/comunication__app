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

import {
    useParams,
    useNavigate,
    useLocation,
} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const ChatScreen = (props) => {


    const [addMessage, setAddMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
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
        document.getElementById("modal-textbox").value = '';
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
            } else {
                newContact.messages.set(props.contactChatInfo.mainContact.userName, []);
                props.contactChatInfo.mainContact.messages.set(newContact.userName, []);
                props.contactChatInfo.contactList.push(newContact);
                contactMap.set(newContact.userName, props.contactChatInfo);
                setContactList(props.contactChatInfo.contactList);
                onConversationChage(newContact);
                setErrorMessage("");
            }
        }
    }


    function getCurrentTime() {
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = time + ' ' + date;
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
                }
                break;

            case MESSAGES_TYPE.MICROPHONE:
                console.log("clicked on microphone");
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
                }
                break;
        }
        contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
            .latestMessageTime = currentTime;
        contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
            .latestMessageTime = currentTime;
        contactMap.get(props.contactChatInfo.mainContact.userName).contactList.filter((contact) => contact.userName === currentContact.userName)[0]
            .latestMessage = info;
        contactMap.get(currentContact.userName).contactList.filter((contact) => contact.userName === props.contactChatInfo.mainContact.userName)[0]
            .latestMessage = info;
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
        return contactMap.get(currentContact.userName).mainContact.messages.get(props.contactChatInfo.mainContact.userName);
    }
    const [typeMessage, setTypeMessage] = useState(MESSAGES_TYPE.TEXT);
    return (
        <Container className='chat-screen'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
            <Row className=" chat-page">

                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} className='left-menu'>
                    <Container className='left-menu-container'>
                        <Row className='profile-header-class'>
                            <Col className='profile-header'>
                                <ProfileHeader contact={props.contactChatInfo.mainContact}/>
                            </Col>
                        </Row>
                        <Row className='search-tn'>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} className='contact-search'>
                                <ContactSearch doSearch={doSearch}/>
                            </Col>
                            <Col className='new-contact-btn'>
                                <NewContact addContact={addContact}/>
                            </Col>
                            {/*<div id="errorMessage">{errorMessage}</div>*/}
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


                <Col className='chat-menu'>
                    <Container  className='chat-menu-container'>
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