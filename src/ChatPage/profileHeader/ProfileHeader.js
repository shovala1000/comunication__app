import React from "react";
import './ProfileHeader.css';


/*
    This component contains the information about the connected user.
*/
function ProfileHeader({username}) {
    return (
        <div className='profile-header'>
            <img src='/defalut-profile-picture.png' alt='default'/>
            <span className="profile-header-about">Welcome, {username}</span>
        </div>

);
}

export default ProfileHeader;