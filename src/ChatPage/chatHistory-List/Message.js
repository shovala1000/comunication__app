import React from "react";
import './Message.css';
import { getCurrentTime } from "../utils";

// exporting all message types available in the app to avoid mistakes.
export const MESSAGES_TYPE = {
    TEXT: 'text',
    IMAGE: 'image',
    MICROPHONE: 'microphone',
    VIDEO: 'video',
}
/* This component is responsible for the structure of the message and how it will be displayed in the chat history window */
const Message = (props) => {
    let messageClass = 'message';
    let sendTime = 'time';

    // checking if the message is a message that the user sent or received
    if (props.isMyMessage !== true) {
        messageClass = ' other-message';
        sendTime = 'other-time';
    }

    // returning HTML for display the message on the chat history window according to the message type.
    function data() {
        switch (props.type) {
            case MESSAGES_TYPE.TEXT:
                return (<div className="message-Text">{props.message.content}</div>);
            case MESSAGES_TYPE.IMAGE:
                return (<div className="message-Img">
                    <img className="message-Img" alt="" src={props.message.content} /></div>)
            case MESSAGES_TYPE.VIDEO:
                return (<div className="message-Video">
                    <video controls className="message-Video" src={props.message.content} />
                </div>)
            case MESSAGES_TYPE.MICROPHONE:
                return (<div className="message-Microphone">
                    <audio controls className="message-Microphone audio-recording" src={props.message.content}></audio></div>)
            default:
                return;

        }
    }

    return (
        <li className="clearfix">
            <div className={sendTime}> {getCurrentTime(props.message.created)}</div>
            <div className={messageClass}>{data()}</div>
        </li>
    );
}

export default Message;