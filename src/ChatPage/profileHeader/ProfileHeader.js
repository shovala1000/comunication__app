import React from "react";
import './ProfileHeader.css';

function ProfileHeader({contact}) {
    return (
        <div className="profile-header">
            <div className="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    <img src={contact.imageURL} alt={contact.imageAlt}/>
                </a>
                <div className="profile-header-about">Welcome</div>
                <div className="profile-header-about">{contact.nickname}</div>
            </div>
        </div>
    );
}

export default ProfileHeader;