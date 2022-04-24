import React from "react";

import './ContactItem.css';
import {contactMap} from "../../userData/data";

const ContactItem = (props) => {
    // console.log(contactMap.get(props.userName).contactList[props.index]);
    let className = 'clearfix';
    if (contactMap.get(props.userName).contactList[props.index].contact.isActive) {
        className += ' avtice'
    }
    return (
        <li className={className} onClick={() => props.onContactItemSelected(contactMap.get(props.userName).contactList[props.index].contact)}>
            <img src={contactMap.get(props.userName).contactList[props.index].contact.imageURL}
                 alt={contactMap.get(props.userName).contactList[props.index].contact.imageAlt}></img>
            <div className='nickname'>
                {contactMap.get(props.userName).contactList[props.index].contact.nickname}
                <div className="name-latestMessage">
                    {contactMap.get(props.userName).contactList[props.index].latestMessage}
                </div>
            </div>
            <span className="latestMessage-time">{contactMap.get(props.userName).contactList[props.index].latestMessageTime}</span>
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