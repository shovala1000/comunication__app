import React from "react";

import Message from "./Message";
import './ChatHistory.css';

const ChatHistory = (props) => {
    console.log(props);
    var messageItems =[];
    props.messages.forEach((message, index) => {
        messageItems.push(( <Message key={index}
        isMyMessage={message.isMyMessage}
        message={message} />));
    });

    return (
        <div className="chat-history">
            <div className="overflow-auto">
                <ul className="m-b-0">
                    {messageItems}              
                </ul>
            </div>
        </div>
    );
}

export default ChatHistory;


/*

 <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:12 AM, Today</span>
                        </div>
                        <div className="message my-message">Are we meeting today?</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:15 AM, Today</span>
                        </div>
                        <div className="message my-message">Project has been already finished and I have results to show you.</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">11:20 AM, Today</span>
                        </div>
                        <div className="message my-message">How are you?</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="other-message-data-time">11:22 AM, Today</span>
                        </div>
                        <div className="message other-message float-right">I'm good, how are you?</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">11:20 AM, Today</span>
                        </div>
                        <div className="message my-message">How are you?</div>
                    </li>

*/