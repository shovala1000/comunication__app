import React from "react";
import './ProfileHeader.css';

function ProfileHeader({contact}) {
    return (
        <div className="profile-header">
            <span className="col-lg-6">
                <div data-toggle="modal" data-target="#view_info">
                    <img src={contact.imageURL} alt={contact.imageAlt}/>
                </div>
                <span className="profile-header-about">Welcome, {contact.nickname}</span>
            </span>
        </div>
    );
}

export default ProfileHeader;