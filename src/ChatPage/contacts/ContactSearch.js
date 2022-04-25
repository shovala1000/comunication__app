import React, {useRef} from 'react';

import './ContactSearch.css';


/* This component allows the user to search contact in his contact list */
function ContactSearch({doSearch}) {

    // creating a referance to the search box.
    const searchBox = useRef(null)
    
    // the function make the search using do search function.
    const search = function (){
        doSearch(searchBox.current.value);
    }

    return (
            <div className="input-group input-search">
                <input ref={searchBox} onKeyUp={search} type="text" id="contact-search-box"
                 className="form-control" placeholder="Search..." aria-label="123" aria-describedby="basic-addon2"></input>
            </div>
    );
}

export default ContactSearch;