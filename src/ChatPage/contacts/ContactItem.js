import React from "react";

import './ContactItem.css';
import {contactMap} from "../../userData/data";

const ContactItem = (props) => {
    let className = 'clearfix';
    if (contactMap.get(props.userName).contactList[props.index].isActive) {
        className += ' avtice'
    }
    return (
        <li className={className} onClick={() => props.onContactItemSelected(props.item.contact)}>
            <img src={props.item.contact.imageURL} alt={props.item.contact.imageAlt}></img>
            <div className='nickname'>
                {props.item.contact.nickname}
                <div className="name-latestMessage">
                    {props.item.latestMessage}
                </div>
            </div>
            <span className="latestMessage-time">{contactMap.get(props.userName).latestMessageTime}</span>
        </li>
    );
}

export default ContactItem;


// import React from "react";

// import './ContactItem.css';

// const ContactItem = (props) => {
//     let className = 'clearfix';

//     if (props.isActive) {
//         className+= ' avtice'
//     }
//     return (
//         <li className= {className}>
//             <img src={props.myContacts.imageURL} alt={props.myContacts.imageAlt}></img>
//             <div className="about">
//                 <div className="name">{props.myContacts.contactName}</div>
//                 <small>{props.myContacts.latestMessage}</small>
//             </div>
//         </li>
//     );
// }

// export default ContactItem;

/*
import React from "react";

import './ContactItem.css';

const ContactItem = (props) => {
    let className = 'clearfix';

    if (props.isActive) {
        className+= ' avtice'
    }
    return (
        <li className= {className}>
            <img src={props.item.imageURL} alt={props.item.imageAlt}></img>
            <div className="about">
                <div className="name">{props.item.userName}</div>
                <small>{props.item.latestMessage}</small>
            </div>
        </li>
    );
}

export default ContactItem;
*/