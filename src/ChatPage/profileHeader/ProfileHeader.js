import React from "react";
import './ProfileHeader.css';

function ProfileHeader({contact}) {
    return (
        <div className='profile-header'>
            <img src={contact.imageURL} alt={contact.imageAlt}/>
            <span className="profile-header-about">Welcome {contact.nickname}</span>
        </div>

);
}

export default ProfileHeader;