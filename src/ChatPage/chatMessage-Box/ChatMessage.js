import React from "react";
import { MESSAGES_TYPE } from "../chatHistory-List/Message";

import './ChatMessage.css';

function ChatMessage({createMessage}) {

    function handleClikc(){
        createMessage(document.getElementById('send-message-box').value, MESSAGES_TYPE.TEXT);
    }

    return (
        <div className="chat-message clearfix">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button type="button" className="btn btn-outline-info" onClick={handleClikc}>
                    <i className="fa fa-send" aria-hidden="true"></i></button>
                </div>
                <input type="text" className="form-control" id="send-message-box" placeholder="Enter text here..."></input>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" className="btn btn-outline-success" onClick={handleClikc}><i className="fa fa-camera" aria-hidden="true"></i></button>
                <button type="button" className="btn btn-outline-danger" onClick={handleClikc}><i className="fa fa-microphone" aria-hidden="true"></i></button>
                <button type="button" className="btn btn-outline-primary" onClick={handleClikc}><i className="fa fa-video-camera" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;





