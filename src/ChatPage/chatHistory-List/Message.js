import React from "react";

import './Message.css';


export const MESSAGES_TYPE = {
    TEXT: 'text',
    IMAGE: 'image',
    MICROPHONE: 'microphone',
    VIDEO: 'video',
}

const Message = (props) => {
    var messageClass = 'message';
    var sendTime = 'time';

    if (props.isMyMessage !== true) {
        messageClass = ' other-message';
        sendTime = 'other-time';
    }
    function data() {
        switch (props.type) {
            case MESSAGES_TYPE.TEXT:
                return (<div className="message-Text">{props.message.data}</div>);
            case MESSAGES_TYPE.IMAGE:
                return (<div className="message-Img">
                <img className="message-Img" src={props.message.data} /></div>)
            case MESSAGES_TYPE.VIDEO:
                return (<div className="message-Video">
                    <video controls className="message-Video" src={props.message.data} />
                </div>)
            case MESSAGES_TYPE.MICROPHONE:
                // console.log(props.message.data);
                return (<div className="message-Microphone">
                <audio controls className="message-Microphone audio-recording" src={props.message.data}></audio></div>)

        }
    }

    return (
        <li className="clearfix">
            <div className={sendTime}> {props.message.time}</div>
            <div className={messageClass}>{data()}</div>
        </li>
    );
}

export default Message;