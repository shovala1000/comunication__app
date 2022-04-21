import React from "react";
import './ChatHeader.css';

const ChatHeader = (props) => {
    if (props.selectedChat !== null) {
        return (
            <div className="chat-header clearfix">
                <img src={props.selectedChat.imageURL} alt={props.selectedChat.imageAlt}></img>
                <div className="chat-header-about">{props.selectedChat.nickname}</div>
                <button type="button" className="btn btn-outline-primary sign-out-button" onClick={() => {
                    window.open("/", "_self")
                }}>Sign Out
                </button>
            </div>
        );
    } else {
        return (
            <div className="chat-header clearfix">
                <div data-toggle="modal" data-target="#view_info"></div>
                <div className="chat-header-about">{}</div>
                <button type="button" className="btn btn-outline-primary sign-out-button" onClick={() => {
                    window.open("/", "_self")
                }}>Sign Out
                </button>
            </div>
        );
    }
}

export default ChatHeader;


{/* <Button className="sign-out-button" onClick={() => {window.open("/","_self")}}>Sign Out </Button>*/
}