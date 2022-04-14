import React from "react";

import './ContactItem.css';

const ContactItem = (props) => {
    let className = 'clearfix';

    if (props.isActive) {
        className+= ' avtice'
    }
    return (
        <li className= {className}>
            <img src={props.myContacts.imageURL} alt={props.myContacts.imageAlt}></img>
            <div className="about">
                <div className="name">{props.myContacts.contactName}</div>
                <small>{props.myContacts.latestmessage}</small>
            </div>
        </li>
    );
}

export default ContactItem;
