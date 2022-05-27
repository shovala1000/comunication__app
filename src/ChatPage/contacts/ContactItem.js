import React from "react";

import './ContactItem.css';
import {contactMap} from "../../userData/data";

/* This component is responsible to present each contact as item in the user contact list */ 
const ContactItem = (props) => {
    let className = 'clearfix';
    return (
        <li className={className} key={props.item.id} onClick={() => props.onContactItemSelected(props.item.id)}>
            <img src='/defalut-profile-picture.png' alt='default'></img>
            <div className='nickname'>
                {props.item.name}
                <div className="name-latestMessage">
                    {props.item.last}
                </div>
            </div>
            <span className="latestMessage-time">{props.item.lastdate}</span>
        </li>
    );
}

export default ContactItem;