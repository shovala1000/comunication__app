import React from 'react'

import './NewContact.css'

function NewContact({ addContact }) {

  window.addEventListener("keypress", checkKeyPress, false);

  function checkKeyPress(key) {
    if(key.keyCode === 13) {
      addContact(document.getElementById("modal-textbox").value);
    }
  }

  return (
    <div>
      <div className="new-contact">
        <button type="button" className="btn btn-light" id="new-contact-button" data-bs-toggle="modal" data-bs-target="#add-new-contact-button">+</button>
      </div>
      <div className="modal fade" id="add-new-contact-button" tabindex="-1" aria-labelledby="add-new-contact" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="add-new-contact">Add new contact</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <input type="text" className="form-control" id="modal-textbox" placeholder="Enter contact nickname..." required></input>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" id="add-button"
                onClick={() => addContact(document.getElementById("modal-textbox").value)}
                data-bs-dismiss="modal">Add
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewContact;

