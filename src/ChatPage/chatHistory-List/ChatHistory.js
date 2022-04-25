import React from "react";

import Message from "./Message";
import './ChatHistory.css';

/* This component is responsible to display all the chat history between the user and the selected contact*/
const ChatHistory = (props) => {
    var messageItems = [];
    if (props.messages) {
        props.messages.forEach((message, index) => {
            messageItems.push((<Message key={index}
                                        isMyMessage={message.isMyMessage}
                                        message={message}
                                        type={message.type}/>));
        });
    }
    return (
        <ul className="chat-history">
            {messageItems}
        </ul>
    );
}

export default ChatHistory;
