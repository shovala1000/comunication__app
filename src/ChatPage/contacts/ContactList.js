
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
