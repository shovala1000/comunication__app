import React from 'react';


import './ContactSearch.css';

function ContactSearch() {
    return (
        <div className="contact-search">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search..." aria-label="123" aria-describedby="basic-addon2"></input>
                <span className="input-group-text" id="basic-addon2"><i className="fa fa-search"></i></span>
                <button type="button" id="new-contact-button" className="btn btn-light">+</button>
            </div>
        </div>
    );
}

export default ContactSearch;