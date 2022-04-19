import React, {useRef} from 'react';

import './ContactSearch.css';



function ContactSearch({doSearch}) {


    const searchBox = useRef(null)
    

    const search = function (){
        doSearch(searchBox.current.value);
    }


    return (
        <div className="contact-search">
            <div className="input-group mb-3">
                <input ref={searchBox} onKeyUp={search} type="text" id="contact-search-box" className="form-control" placeholder="Search..." aria-label="123" aria-describedby="basic-addon2"></input>
                <span className="input-group-text" id="basic-addon2"><i className="fa fa-search"></i></span>
            </div>
        </div>
    );
}

export default ContactSearch;