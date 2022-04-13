import React from "react";

import './ChatHeader.css';


function ChatHeader() {
    return (
        <div className="chat-header clearfix">
            <div className="row">
                <div className="col-lg-6">
                    <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                        <img src="avatar4.png" alt="avatar"></img>
                    </a>

                    <div className="chat-header-about">Christian Eriksen</div>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;