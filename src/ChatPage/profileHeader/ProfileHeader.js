import React from "react";
import './ProfileHeader.css';

function ProfileHeader({contact}) {
    return (
<<<<<<< HEAD
        <div className="profile-header">
            <span className="col-lg-6">
                <div data-toggle="modal" data-target="#view_info">
                    <img src={contact.imageURL} alt={contact.imageAlt}/>
                </div>
                <span className="profile-header-about">Welcome, {contact.nickname}</span>
            </span>
=======
        <div className='profile-header'>
            <img src={contact.imageURL} alt={contact.imageAlt}/>
            <span className="profile-header-about">Welcome {contact.nickname}</span>
>>>>>>> 63fa0da392f0d0e4f2d2a88453d06eff1cebd7b1
        </div>

);
}

export default ProfileHeader;