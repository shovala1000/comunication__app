import React, {useRef} from 'react';

import './ContactSearch.css';



function ContactSearch({doSearch}) {


    const searchBox = useRef(null)
    

    const search = function (){
        doSearch(searchBox.current.value);
    }


    return (
            <div className="input-group input-search">
                <input ref={searchBox} onKeyUp={search} type="text" id="contact-search-box" className="form-control" placeholder="Search..." aria-label="123" aria-describedby="basic-addon2"></input>
            </div>
    );
}

export default ContactSearch;