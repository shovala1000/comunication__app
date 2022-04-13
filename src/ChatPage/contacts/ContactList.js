
import React from 'react';


import './ContactList.css';

function ContactList() {
    return (
        <div id="plist" className="people-list">
            <div className="overflow-auto">
                <ul className="list-group chat-list mt-2 mb-0">
                    <li className="clearfix">
                        <img src="avatar2.png" alt="avatar"></img>
                        <div className="about">
                            <div className="name">Harry Kane</div>
                            <small>last message...</small>

                        </div>
                    </li>
                    <li className="clearfix">
                        <img src="avatar3.png" alt="avatar"></img>
                        <div className="about">
                            <div className="name">Lionel Messi</div>
                            <small>last message...</small>
                        </div>
                    </li>
                    <li className="clearfix">
                        <img src="avatar4.png" alt="avatar"></img>
                        <div className="about">
                            <div className="name">Christian Eriksen</div>
                            <small>last message...</small>
                        </div>
                    </li>
                    <li className="clearfix">
                        <img src="avatar5.png" alt="avatar"></img>
                        <div className="about">
                            <div className="name">Cristiano Ronaldo</div>
                            <small>last message...</small>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default ContactList;