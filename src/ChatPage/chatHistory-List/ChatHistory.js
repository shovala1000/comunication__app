import React from "react";

import Message from "./Message";
import './ChatHistory.css';
import { useRef,useEffect } from "react";

/* This component is responsible to display all the chat history between the user and the selected contact*/
const ChatHistory = (props) => {

    // use ref saved for reference to scrollbar.
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
    
    // when another messages added to the messages prop, Inset it to the chat screnn and scroll down.
    useEffect(() => {
        scrollToBottom()
      }, [props.messages]);
    
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
        <div>
            <ul className="chat-history">
                {messageItems}
            </ul>
            <div ref={messagesEndRef}></div>
        </div>
    );
}

export default ChatHistory;