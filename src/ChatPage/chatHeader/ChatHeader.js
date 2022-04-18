import React from "react";

import './ChatHeader.css';


const ChatHeader = (props) => {
    return (
        <div className="chat-header clearfix">
            <div className="row">
                <div className="col-lg-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                        <img src={props.selectedChat.imageURL} alt={props.selectedChat.imageAlt}></img>
                    </a>
                    <div className="chat-header-about">{props.selectedChat.nickname}</div>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;