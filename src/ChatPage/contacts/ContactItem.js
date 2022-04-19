import React from "react";

import './ContactItem.css';

const ContactItem = (props) => {
    let className = 'clearfix';

    if (props.isActive) {
        className += ' avtice'
    }

    return (
        <li className= {className} onClick={() => props.onContactItemSelected(props.item)}>
            <img src={props.item.imageURL} alt={props.item.imageAlt}></img>
            <div className="about">
                <div className="name">{props.item.nickname}
                    <span className="latestMessageTime">{props.item.latestMessageTime}</span>
                </div>
                <small className="latestMessage">{props.item.latestMessage}</small>
                
            </div>
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