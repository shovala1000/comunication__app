import React, {useEffect, useState} from 'react';
import './ChatScreen.css';

import Container from 'react-bootstrap/Container';
import ContactList from '../contacts/ContactList';
import ContactSearch from '../contacts/ContactSearch';
import ChatHeader from '../chatHeader/ChatHeader';
import ChatHistory from '../chatHistory-List/ChatHistory';
import ProfileHeader from '../profileHeader/ProfileHeader';
import NewContact from '../newContact/NewContact';
import {MESSAGES_TYPE} from '../chatHistory-List/Message';
import ChatMessage from '../chatMessage-Box/ChatMessage';
import {getCurrentTime} from '../utils';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {getCLS} from "web-vitals";
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
        // This useState is saving the current state of the contactMap in contactList.
    const [listState, setListState] = useState([]);
    const [list, setList] = useState([]);
    const [isInit, setInit] = useState(false);
    const [messages, setMessages] = useState([]);

    //get all the user's contacts
    async function getAllC() {
            await fetch(context.server+'Contacts/',{
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+context.token,
                }})
            .then(response => response.json())
            .then(data => {
                setList(data);
            })

    }

    //get messages with contact (id)
    async function getAllM(id) {
        await fetch(context.server+'Contacts/'+id+'/Messages',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+context.token,
            }})
            .then(response => response.json())
            .then(data => {
                context.messages = data;
                setMessages(data);

            });
    }

    async function postM(id,server,content) {
        await fetch(server+'Contacts/'+id+'/Messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+context.token,
            },
            body: JSON.stringify({content})
        }).then((response)=>{
                response.text().then((data)=> {
                    context.currentMessage=data;
                    messages.push(data);
                });
            });
    }
    async function postTransfer(from,to,content) {
        https://localhost:7049/api/Transfer?From=s&To=s&Content=s
        await fetch('https://'+currentContact.server+'/api/Transfer?From='+from+'&To='+to+'&Content='+content, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer '+context.token,
            },
            //body: JSON.stringify({from,to,content})
        })
    }

    async function postInvitations(from,to,server) {
        await fetch('https://'+server+'/api/Invitations?From='+from+'&To='+to+'&Server='+server, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'Authorization': 'Bearer '+context.token,
            },
            //body: JSON.stringify({from,to,server})
        })
    }

    /**************************************************************************************************************** */

    // This function search in the contact's search box.
    const doSearch = function (q) {
        setListState(list.filter((contact) => contact.name.includes(q)));
    }

    // This function in handle conversation changing, pressing on contact from the contact list will invoke this function.
    const onConversationChange = function (id) {
        getAllM(id);
        setCurrentContact(listState.find((contact)=>contact.id===id));

    }


    // This function gets the nickname from the user and starts a conversation with him.
    const addContact = function (to,server) {
        postInvitations(props.username,to,server);
        setInit(false);
    }


    function createNewMessage(content) {
        postM(currentContact.id,context.server,content);
        postTransfer(props.username,currentContact.id,content);
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
    useEffect(()=> {
        setListState(list);
        setInit(true);
        },[list]);

    if(!isInit){
        getAllC();
    }

    return (
        <Container className='chat-screen'>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
            <Row className=" chat-page">
                <Col xs={3} sm={3} md={3} lg={3} xl={3} xxl={3} className='left-menu'>
                    <Container className='left-menu-container'>
                        <Row className='profile-header-class'>
                            <Col className='profile-header'>
                              <ProfileHeader  username={props.username}/>
                            </Col>
                        </Row>
                        <Row className='search-tn' style={isAlertActive ? {display: 'none'} : null}>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} className='contact-search'>
                                <ContactSearch doSearch={doSearch}/>
                            </Col>
                            <Col className='new-contact-btn'>
                                <NewContact addContact={addContact}/>
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