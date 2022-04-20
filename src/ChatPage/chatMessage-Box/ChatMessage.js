import React, {useState} from "react";
import {MESSAGES_TYPE} from "../chatHistory-List/Message";

import './ChatMessage.css';

function ChatMessage({createMessage}) {
    const [fileName,setFileName] = useState('')

    const fileSelectedHandler = (event) => {
        if(event.target.files[0].name){
            setFileName(event.target.files[0].name);
        }
    }
    const createMessageImg = (event) => {
        if(event.target.files[0].name){
            createMessage('/'+fileName,MESSAGES_TYPE.IMAGE);
            console.log(fileName);
        }
    }
    const createMessageVideo = (event) => {
        if(event.target.files[0].name){
            createMessage('/'+fileName,MESSAGES_TYPE.VIDEO);
            console.log(fileName);
        }
    }
    function handleClick(id,type) {
        switch (type){
            case MESSAGES_TYPE.TEXT:
            createMessage(document.getElementById(id).value,type);
            break;
            case MESSAGES_TYPE.IMAGE:
                // createMessage('/'+fileName,type);

                break;
        }
    }
    const OpenImg = () => {
        document.getElementById('get_file').onclick = function() {
            document.getElementById('input_file').click();}}
    const OpenVideo = () => {
        document.getElementById('get_video').onclick = function() {
            document.getElementById('input_video').click();}}


    return (
        <div className="chat-message clearfix">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button type="button" className="btn btn-outline-info" onClick={() => {
                        handleClick("send-message-box",MESSAGES_TYPE.TEXT);
                        document.getElementById('send-message-box').value = ''
                    }}>
                        <i className="fa fa-send" aria-hidden="true"/></button>
                </div>
                <input type="text" className="form-control" id="send-message-box" placeholder="Enter text here..."/>
                <div className="btn-group" role="group" aria-label="Basic mixed styles example">


                    <button id="get_file" variant="outlined" type="button" className="btn btn-outline-success" onClick={()=>{OpenImg();handleClick("input_file",MESSAGES_TYPE.IMAGE)}}>
                        <i className="fa fa-camera" aria-hidden="true"> </i>
                    </button>
                    <input type="file" onChange={createMessageImg} onInput={fileSelectedHandler} id="input_file" accept=".jpg,.jpeg,.png" style={{ display: 'none' }} />


                    {/*<button type="button" className="btn btn-outline-danger" onClick={()=>handleClick(MESSAGES_TYPE.MICROPHONE)}><i*/}
                    {/*    className="fa fa-microphone" aria-hidden="true"/></button>*/}


                    <button id="get_video" variant="outlined" type="button" className="btn btn-outline-primary" onClick={()=>{OpenVideo();handleClick("input_video",MESSAGES_TYPE.VIDEO)}}>
                        <i
                        className="fa fa-video-camera" aria-hidden="true"/></button>
                    <input type="file" onChange={createMessageVideo} onInput={fileSelectedHandler} id="input_video" accept=".video,.mp4,.video,.x-m4v,.video" style={{ display: 'none' }} />
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;