import React from "react";

import './ContactItem.css';
import {contactMap} from "../../userData/data";

/* This component is responsible to present each contact as item in the user contact list */ 
const ContactItem = (props) => {
    let className = 'clearfix';
    if (contactMap.get(props.userName).contactList[props.index].isActive) {
        className += ' avtice'
    }
    return (
        <li className={className} key={props.item.userName} onClick={() => props.onContactItemSelected(props.item.contact)}>
            <img src={props.item.contact.imageURL} alt={props.item.contact.imageAlt}></img>
            <div className='nickname'>
                {props.item.contact.nickname}
                <div className="name-latestMessage">
                    {props.item.latestMessage}
                </div>
            </div>
            <span className="latestMessage-time">{props.item.latestMessageTime}</span>
        </li>
    );
}

export default ContactItem;