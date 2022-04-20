import React from "react";

import './ChatHeader.css';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const ChatHeader = (props) => {
    let navigate = useNavigate();
    if (props.selectedChat !== null) {
        return (
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <div data-toggle="modal" data-target="#view_info">
                            <img src={props.selectedChat.imageURL} alt={props.selectedChat.imageAlt}></img>
                        </div>
                        <div className="chat-header-about">{props.selectedChat.nickname}</div>
                        <button type="button" className="btn btn-outline-primary sign-out-button" onClick={() => {navigate('/', { replace: true })}}>Sign Out</button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="chat-header clearfix">
                <div className="row">
                    <div className="col-lg-6">
                        <div data-toggle="modal" data-target="#view_info"></div>
                        <div className="chat-header-about">{}</div>
                        <button type="button" className="btn btn-outline-primary sign-out-button" onClick={() => {navigate('/', { replace: true })}}>Sign Out</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatHeader;


{/* <Button className="sign-out-button" onClick={() => {window.open("/","_self")}}>Sign Out </Button>*/ }