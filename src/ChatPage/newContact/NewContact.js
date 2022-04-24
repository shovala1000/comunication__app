import React, {useRef} from 'react';
import {Modal} from 'bootstrap';

import './NewContact.css'

function NewContact({addContact, currentError, setErrorMessage, isAlertActive, setAlertActive}) {
    const modalRef = useRef()

    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
        console.log('showModal');
    }

    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal = Modal.getInstance(modalEle)
        bsModal.hide()
    }

    const checkInput = (data) => {
        if (data.length !== 0) {
            // let error = currentError;
            hideModal();
            addContact(data);
        }
    }

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

            {/*<div className={classAlert} role="alert">{currentError}*/}
            {/*    <button type="button" className="btn-close" aria-label="Close"*/}
            {/*            onClick={() => setAlertActive(false)}></button>*/}
            {/*</div>*/}
        </div>
    );
}

export default NewContact;


//  return (
//   <div className='new-contact-btn'>
//     <div className="new-contact">
//       <button type="button" className="btn btn-light" id="new-contact-button" data-bs-toggle="modal" data-bs-target="#add-new-contact-button">+</button>
//     </div>
//     <div className="modal fade" id="add-new-contact-button" tabIndex="-1" aria-labelledby="add-new-contact" aria-hidden="true">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="add-new-contact">Add new contact</h5>
//             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
//           </div>
//           <div className="modal-body">
//             <input type="text" className="form-control" id="modal-textbox" placeholder="Enter contact username..." required/>
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//             <button type="button" className="btn btn-primary" id="add-button"
//               onClick={() => addContact(document.getElementById("modal-textbox").value)}
//               data-bs-dismiss="modal">Add
//               </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );