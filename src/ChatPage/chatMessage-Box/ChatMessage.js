import React from "react";
import {MESSAGES_TYPE} from "../chatHistory-List/Message";
import useRecorder from "./useRecorder";
import './ChatMessage.css';


function ChatMessage({createMessage}) {

    const createMessageImg = (event) => {
        createMessage(URL.createObjectURL(event.target.files[0]), MESSAGES_TYPE.IMAGE);
    }
    const createMessageVideo = (event) => {
        createMessage(URL.createObjectURL(event.target.files[0]), MESSAGES_TYPE.VIDEO);
    }

    function handleClick(id, type) {
        switch (type) {
            case MESSAGES_TYPE.TEXT:
                createMessage(document.getElementById(id).value, type);
                break;
            case MESSAGES_TYPE.MICROPHONE:
                createMessage(id, type);
                break;
            default:
                console.log('handleClick');
        }
    }

    const OpenImg = () => {
        document.getElementById('input_file').click();
    }
    const OpenVideo = () => {
        document.getElementById('input_video').click();
    }

    const sendMessageByEnter = (key) => {
        if (key.key === 'Enter') {
            let data = document.getElementById('send-message-box').value;
            if (data.length !== 0) {
                handleClick("send-message-box", MESSAGES_TYPE.TEXT);
                document.getElementById('send-message-box').value = ''
            }
        }
    }

    let [audioURL, isRecording, startRecording, stopRecording, currentAudioClassName, changeAudioClassName] = useRecorder();

    let disableSending = true;
    if (audioURL !== "" && isRecording === false) {
        disableSending = false;
    }


    return (
        <div className="chat-message input-group">
            <button type="button" className="btn btn-outline-info" id="send-button"
                    onClick={() => {
                        handleClick("send-message-box", MESSAGES_TYPE.TEXT);
                        document.getElementById('send-message-box').value = ''
                    }}>
                <i className="fa fa-send" aria-hidden="true"/>
            </button>
            <input type="text" className="form-control" id="send-message-box" placeholder="Enter text here..."
                   onKeyDown={sendMessageByEnter}/>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="get_file" type="button" className="btn btn-outline-success"
                        onClick={() => OpenImg()}>
                    <i className="fa fa-camera" aria-hidden="true"></i>
                </button>
                <input type="file" onChange={createMessageImg} id="input_file"
                       accept=".jpg,.jpeg,.png" style={{display: 'none'}}/>
                <button id='get-audio' type="button" className="btn btn-outline-danger" onClick={changeAudioClassName}>
                    <i className="fa fa-microphone" aria-hidden="true"/></button>
                <div className={currentAudioClassName}>
                    <audio src={audioURL} controls/>
                    <button className="btn btn-dark" onClick={startRecording} disabled={isRecording}><i
                        className="fa fa-play" aria-hidden="true"></i></button>
                    <button className="btn btn-dark" onClick={stopRecording} disabled={!isRecording}><i
                        className="fa fa-stop" aria-hidden="true"></i></button>
                    <button className="btn btn-dark" disabled={disableSending}
                            onClick={() => handleClick(audioURL, MESSAGES_TYPE.MICROPHONE)}><i
                        className="fa fa-paper-plane" aria-hidden="true"></i></button>
                    <button className="btn btn-dark" onClick={changeAudioClassName}><i className="fa fa-window-close"
                                                                                       aria-hidden="true"></i></button>
                </div>
                <button id="get_video" type="button" className="btn btn-outline-primary"
                        onClick={() => OpenVideo()}>
                    <i
                        className="fa fa-video-camera" aria-hidden="true"/></button>
                <input type="file" onChange={createMessageVideo} id="input_video"
                       accept=".video,.mp4,.video,.x-m4v,.video" style={{display: 'none'}}/>
            </div>
        </div>
    );
}

export default ChatMessage;