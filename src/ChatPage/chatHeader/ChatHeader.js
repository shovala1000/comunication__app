import React from "react";
import { useNa, useNavigate } from "react-router-dom";
import './ChatHeader.css';

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
                
                <div className="chat-header-about">{}</div>
                <button type="button" className="btn btn-outline-light sign-out-button" onClick={() => {
                    navigate("/", "_self")
                }}>Sign Out
                </button>
            </div>
        );
    }
}

export default ChatHeader;


{/* <Button className="sign-out-button" onClick={() => {window.open("/","_self")}}>Sign Out </Button>
<div data-toggle="modal" data-target="#view_info"></div>
*/
}