import React from "react";
import './ProfileHeader.css';

function ProfileHeader({contact}) {
    return (
        <div className="profile-header">
            <span className="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    <img src={contact.imageURL} alt={contact.imageAlt}/>
                </a>
                <span className="profile-header-about">Welcome</span>
                <span className="profile-header-about"><br/>{contact.nickname}</span>
            </span>
        </div>
    );
}

export default ProfileHeader;