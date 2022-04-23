import React from "react";

import Message from "./Message";
import './ChatHistory.css';

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
