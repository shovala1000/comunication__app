import React from "react";
import './ProfileHeader.css';


/*
    This component contain the information about the connected user.
*/
function ProfileHeader({contact}) {
    return (
        <div className='profile-header'>
            <img src={contact.imageURL} alt={contact.imageAlt}/>
            <span className="profile-header-about">Welcome, {contact.nickname}</span>
        </div>

);
}

export default ProfileHeader;