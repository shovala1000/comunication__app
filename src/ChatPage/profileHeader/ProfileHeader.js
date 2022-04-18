import React from "react";

import './ProfileHeader.css';

function ProfileHeader() {
    return (
        <div className="profile-header">
            <div className="col-lg-6">
                <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                    <img src="avatar1.png" alt="avatar"></img>
                </a>
                <div className="profile-header-about">Welcome</div>
                <div className="profile-header-about">Zlatan Ibrhimovich</div>
            </div>
        </div>
    );
}

export default ProfileHeader;
