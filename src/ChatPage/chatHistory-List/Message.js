import React from "react";

import './Message.css';


export const MESSAGES_TYPE = {
    TEXT : 'text',
    IMAGE: 'image',
    MICROPHONE: 'microphone',
    VIDEO: 'video',
}

export const NewMessage = function(currentTime,type,data, myMessage) {
    this.type = type;
    this.data = data;
    this.isMyMessage = myMessage;
    this.time = currentTime;
}

const Message = (props) => {
    let messageClass = 'message';
    let sendTime = 'message-time';

    if (props.isMyMessage) {
        messageClass += ' my-message';
    } else {
        messageClass += ' other-message float-right';
        sendTime = 'other-' + sendTime;
    }

    function data(){
        if(props.type===MESSAGES_TYPE.TEXT){
            return (<div className="message-Text">{props.message.data}</div>);
        }
        if(props.type===MESSAGES_TYPE.IMAGE){
            return (<div className="message-Img"><img className="message-Img" src={props.message.data}/></div>)
        }
        if(props.type===MESSAGES_TYPE.VIDEO){
            console.log('this is a video');
            return (<div className="message-Video"><video className="message-Video" src={props.message.data}/></div>)
        }
    }

    return (
        <li className="clearfix">

            <div className="message-data">
                <div className= {sendTime}> {props.message.time}</div>
            </div>
            <div className={messageClass}>
                {data()}
            </div>
        </li>
    );
}

export default Message;

// props.time - 10:10 AM, Today;
// props.dat - Hi Aiden, how are you? How is the project coming along?
// props.isMyMessage -

// <li className="clearfix">
// <div className="message-data">
//     <span className="message-data-time">10:15 AM, Today</span>
// </div>
// <div className="message my-message">Project has been already finished and I have results to show you.</div>
// </li>