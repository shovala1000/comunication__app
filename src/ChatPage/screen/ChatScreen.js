import React, {useEffect, useState} from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ProfileHeader from '../profileHeader/ProfileHeader';
import NewContact from '../newContact/NewContact';
import ChatMessage from '../chatMessage-Box/ChatMessage';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {context} from "../../userData/data";

const ChatScreen = (props) => {
    // save the state for error message when adding contact to the contacts list.
    const [currentError, setErrorMessage] = useState('');
    // saving the state for the alert message.
    const [isAlertActive, setAlertActive] = useState(false);
    let selectedContact = null;
    let classAlert = "alert alert-primary";
    // This useState is saving the state for the selected contact, the contact that the current conversation is with.
    const [currentContact, setCurrentContact] = useState(selectedContact);
    /**************************************************************************************************************** */
    // This useState is saving the current state of the contactList.
    const [listState, setListState] = useState([]);
    // This useState is saving the all the user's contactList.
    const [list, setList] = useState([]);
    //This useState is for initialize all the user's contactList.
    const [isInit, setInit] = useState(false);
    //This useState is for saving the messages from user to one of his contacts.
    const [messages, setMessages] = useState([]);

    //get all the user's contacts
    async function getAllContacts() {
        await fetch(context.server + 'Contacts/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.token,
            }
        })
            .then(response => response.json())
            .then(data => {
                setList(data);
            })

    }

    //get messages with contact (id)
    async function getAllMessages(id) {
        await fetch(context.server + 'Contacts/' + id + '/Messages', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.token,
            }
        })
            .then(response => response.json())
            .then(data => {
                context.messages = data;
                setMessages(data);

            });
    }
    //post a message to contact (id) with content
    async function postMessage(id, content) {
        await fetch(context.server + 'Contacts/' + id + '/Messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.token,
            },
            body: JSON.stringify({content})
        }).then((response) => {
            response.text().then((data) => {
                context.currentMessage = data;
                messages.push(data);
            });
        });
    }
    //post - send the contact's server request to post the message the user send
    async function postTransfer(from, to, content) {
            await fetch('https://' + currentContact.server + '/api/Transfer?From=' + from + '&To=' + to + '&Content=' + content, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                //body: JSON.stringify({from,to,content})
            })
    }

    async function postInvitations(responsePost, to, server) {
        responsePost.then(async (r) => {
            if (r.status === 201) {
                console.log(responsePost.status);
                await fetch('https://' + server + '/api/Invitations?From=' + props.username + '&To=' + to + '&Server=' + server, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        //'Authorization': 'Bearer '+context.token,
                    },
                    //body: JSON.stringify({props.username,to,server})
                }).then((r) => {
                    if (r.status === 201) {
                        setInit(false);
                    } else {
                        console.log("r: ", r.status);
                        setErrorMessage('failed to add');
                        setAlertActive(true);
                    }
                })
            } else {
                //(?)delete contact
                console.log("res: ", r);
                setErrorMessage('failed to add');
                setAlertActive(true);
            }
        });
    }
    //initialize contactsList and update if contact was added
    useEffect(() => {
        setListState(list);
        setInit(true);
    }, [list]);

    if (!isInit) {
        getAllContacts();
    }
    /**************************************************************************************************************** */

        // This function search in the contact's search box.
    const doSearch = function (q) {
            setListState(list.filter((contact) => contact.name.includes(q)));
        }

    // This function in handle conversation changing, pressing on contact from the contact list will invoke this function.
    const onConversationChange = function (id) {
        getAllMessages(id);
        setCurrentContact(listState.find((contact) => contact.id === id));

    }

    function createNewMessage(content) {
        postMessage(currentContact.id, content);
        postTransfer(props.username, currentContact.id, content);
    }


    /*
      The return value for this page.
         In ProfileHeader - The name of the user, and his Image.
         In NewContact - This component contains the code for adding a new contact to the contact list and start a new conversaion.
         In ContactSearch - This component contains the search box.
         In ContactList - This component contains the list of contact that whom the user has a chat with them. Showing details about the conversation.
         In ChatHeader - This component contains the name of the user nickname that the current chat is with.
         In ChatHistory - This component contains the chat history with that specific user.
         In ChatMessage - This component contains the send message box and the other application for sending messages.
     */


    return (
        <Container className='chat-screen'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
            <Row className=" chat-page">
                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className='left-menu'>
                    <Container className='left-menu-container'>
                        <Row className='profile-header-class'>
                            <Col className='profile-header'>
                                <ProfileHeader username={props.username}/>
                            </Col>
                        </Row>
                        <Row className='search-tn' style={isAlertActive ? {display: 'none'} : null}>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} className='contact-search'>
                                <ContactSearch doSearch={doSearch}/>
                            </Col>
                            <Col className='new-contact-btn'>
                                <NewContact addContact={postInvitations}/>
                            </Col>
                        </Row>

                        <Row style={isAlertActive ? null : {display: 'none'}} className='error-message'>
                            <Col className={classAlert} role="alert">{currentError}
                                <button type="button" className="btn-close" aria-label="Close"
                                        onClick={() => setAlertActive(false)}></button>
                            </Col>
                        </Row>

                        <Row className='contact-list'>
                            <Col className="people-list">
                                {<ContactList userName={props.username} listState={listState}
                                              onContactItemSelected={onConversationChange}/>}
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
                                <ChatHistory messages={messages}
                                />
                            </Col>
                        </Row>
                        <Row className='chat-message-box'>
                            <Col className='chat-message'>
                                <ChatMessage createMessage={createNewMessage}
                                             currentContact={currentContact}/>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default ChatScreen;