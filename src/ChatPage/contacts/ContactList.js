import React from 'react';
import ContactItem from './ContactItem';
import './ContactItem.css';

/* This component is responsible to present and manage the contact list of the user on the left menu in his chat page */
const ContactList = (props) => {
    const conversationsItems = [];
    props.listState.forEach((item, index) => {
        conversationsItems.push(
            (<ContactItem index={index}
                          key={index}
                          userName={props.userName}
                          item={item}
                          onContactItemSelected={props.onContactItemSelected}/>));
    });
    return (
        <ul className="list-group chat-list">
            {conversationsItems}
        </ul>
    );
}

export default ContactList;