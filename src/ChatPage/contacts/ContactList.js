import React from 'react';

import ContactItem from './ContactItem';

import './ContactItem.css';

const ContactList = (props) => {
    const conversationsItems = [];
    let i = 0;
    props.map.forEach((item, index) => {
        conversationsItems[i++] =
            <ContactItem
                key={index}
                isActive={index === props.selectedConversation}
                onContactItemSelected={props.onContactItemSelected}
                cuttrrentContact={props.selectedConversation}
                item={item}/>
    });
    return (
        <ul className="list-group chat-list">
            {conversationsItems}
        </ul>
    );
}

export default ContactList;


/*
import React from 'react';

import ContactItem from './ContactItem';

import './ContactItem.css';

const ContactList = (props) => {
    const selectedConversationIndex=0;
    const conversationsItems = props.myContacts.map((myContacts, index) => {
        return <ContactItem key={index} isActive={index === selectedConversationIndex} myContacts={myContacts} />
    });
    return (

        <div id="plist" className="people-list">
            <div className="overflow-auto">
                <ul className="list-group chat-list mt-2 mb-0">
                    {conversationsItems}
                </ul>
            </div>
        </div>
    );
}

export default ContactList;
*/

/*
const ContactList = (props) => {
    const selectedConversationIndex=0;
    const conversationsItems = [];
    let i=0;
     props.map.forEach((item, index) => {
        conversationsItems[i++] = <ContactItem key={index} isActive={index === selectedConversationIndex} item={item} />
    });
    return (

        <div id="plist" className="people-list">
            <div className="overflow-auto">
                <ul className="list-group chat-list mt-2 mb-0">
                    {conversationsItems}
                </ul>
            </div>
        </div>
    );
}

export default ContactList;
*/