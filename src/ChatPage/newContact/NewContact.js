import React, {useRef} from 'react';
import {Modal} from 'bootstrap';

import './NewContact.css';

/* This component creates the window that opens when the user adds a new contact to his contact list. */
function NewContact({addContact}) {
    const modalRef = useRef()

    // The function turn the modal window to be visible.
    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }

    // The function turn the modal window to be invisible.
    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal = Modal.getInstance(modalEle)
        bsModal.hide()
    }

    // The function checks the input from the input box.
    const checkInput = (data) => {
        if (data.length !== 0) {
            hideModal();
            addContact(data);
        }
    }

    // The function handles keypress. Allow insert new contact by pressing Enter.
    const handlePressedKey = (key) => {
        if (key.key === 'Enter') {
            let data = document.getElementById('modal-textbox').value;
            if (data.length !== 0) {
                checkInput(data);
            }
        }
    }

    return (
        <div className="new-contact-btn">
            <button type="button" className="btn btn-light" id="new-contact-button" onClick={showModal}>+</button>


            <div className="modal fade" id="add-new-contact-button" ref={modalRef} tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Add new Contact</h5>
                            <button type="button" className="btn-close" onClick={hideModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" id="modal-textbox"
                                   placeholder="Enter contact username..." onKeyDown={handlePressedKey}></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() => checkInput(document.getElementById('modal-textbox').value)}>Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewContact;