import React from "react";

import './ChatMassage.css';

function ChatForm() {
    return (
        <div className="chat-message clearfix">
            <div className="input-group mb-0">
                <div className="input-group-prepend">
                    <a href="javascript:void(0);" className="btn btn-outline-info"><i className="fa fa-send" aria-hidden="true"></i></a>
                </div>
                <input type="text" className="form-control" placeholder="Enter text here..."></input>
                <a href="javascript:void(0);" className="btn btn-outline-success"><i className="fa fa-camera" aria-hidden="true"></i></a>
                <a href="javascript:void(0);" className="btn btn-outline-danger"><i className="fa fa-microphone" aria-hidden="true"></i></a>
                <a href="javascript:void(0);" className="btn btn-outline-primary"><i className="fa fa-video-camera" aria-hidden="true"></i></a>
            </div>
        </div>
    );
}

export default ChatForm;