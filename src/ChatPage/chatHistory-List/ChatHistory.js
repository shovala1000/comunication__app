import React from "react";

import Message from "./Message";
import './ChatHistory.css';

/* This component is responsible to display all the chat history between the user and the selected contact*/
const ChatHistory = (props) => {

    const messageItems = [];
    if (props.messages.length>0) {
        props.messages.forEach((message, index) => {
            messageItems.push((<Message key={index}
                                        isMyMessage={message.sent}
                                        message={message}
                                        type='text'/>));
        });
    }
    return (
        <ul className="chat-history">
            {messageItems}
        </ul>
    );
}

export default ChatHistory;