import React from "react";
import {useNavigate} from "react-router-dom";
import {context} from "../../userData/data";
import './ChatHeader.css';


/* This component is responsible for displaying the details of the contact the user is talking to */
const ChatHeader = (props) => {
    let navigate = useNavigate();

    function initContext() {
        context.contactId = '';
        context.connection = '';
        context.isAleardyConnected= '';
        context.token = '';
        context.messages = [];
        context.currentMessage = {};
        context.listConatcts = [];

    }

    if (props.selectedChat !== null) {
        return (
            <div className="chat-header clearfix">
                <img src='/defalut-profile-picture.png' alt='default'/>
                <div className="chat-header-about">{props.selectedChat.name}</div>
                <button type="button" className="btn btn-outline-light sign-out-button" onClick={() => {
                    navigate("/", {replace: true});
                }}>Sign Out
                </button>
            </div>
        );
    } else {
        return (
            <div className="chat-header clearfix">
                <div className="chat-header-about">Choose contact from your list to start chatting <br></br> or add new
                    contacts on the + button
                </div>
                <button type="button" className="btn btn-outline-light sign-out-button" onClick={() => {
                    initContext();
                    navigate("/", "_self")
                }}>Sign Out
                </button>
                <button type="button" className="btn btn-outline-light sign-out-button"
                        onClick={() => window.location.href = context.Ratings}>Go to ratings
                </button>
            </div>
        );
    }
}

export default ChatHeader;