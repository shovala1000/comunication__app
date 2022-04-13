import React from "react";

import './ChatHistory.css';

function ChatHistory() {
    return (
        <div className="chat-history">
            <div className="overflow-auto">
                <ul className="m-b-0">
                    <li className="clearfix">
                        <div className="message-data text-right">
                            <span className="other-message-data-time">10:10 AM, Today</span>
                        </div>
                        <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                    </li>
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
                </ul>
            </div>
        </div>
    );
}

export default ChatHistory;