import React from "react";
import { useNavigate } from "react-router-dom";
import './ChatHeader.css';

/* This component is responsible for displaying the details of the contact the user is talking to */
const ChatHeader = (props) => {
    let navigate = useNavigate();
    if (props.selectedChat !== null) {
        return (
            <div className="chat-header clearfix">
                <img src={props.selectedChat.imageURL} alt={props.selectedChat.imageAlt}></img>
                <div className="chat-header-about">{props.selectedChat.nickname}</div>
                <button type="button" className="btn btn-outline-light sign-out-button" onClick={() => {
                   navigate("/", {replace:true})}}>Sign Out
                </button>
            </div>
        );
    } else {
        return (
            <div className="chat-header clearfix">
                <div className="chat-header-about">Choose contact from your list to start chatting <br></br> or add new contacts on the + button</div>
                <button type="button" className="btn btn-outline-light sign-out-button" onClick={() => {
                    navigate("/", "_self")
                }}>Sign Out
                </button>
            </div>
        );
    }
}

export default ChatHeader;