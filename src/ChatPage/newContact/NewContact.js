import React, {useRef, useState} from 'react';
import {Modal} from 'bootstrap';
import './NewContact.css';
import {context} from "../../userData/data";

/* This component creates the window that opens when the user adds a new contact to his contact list. */
function NewContact(props) {
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

    /******************************************************************************************************************** */
    //add contact to contactList
    async function postContact(id, name, server) {
        await fetch(context.server + 'Contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + context.token,
            },
            body: JSON.stringify({id: id, name: name, server: server})
        }).then((r) => {
            if (r.status !== 201) {
                props.setErrorMessage('failed to add');
                props.setAlertActive(true);
            } else {
                addContact(props.username, 'localhost:7049', id, name, server);
                postInvitations(props.username, id, server);
            }
        });

    }
    async function postInvitations(from, to, server) {
        try {
            await fetch('https://' + server + '/api/Invitations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({from, to, server})
            }).then((r) => {
                if (r.status !== 201) {
                    props.setErrorMessage('failed to add');
                    props.setAlertActive(true);
                    deleteContact(to);
                }
            });
        } catch (e) {
            /**delete contact?*/
            deleteContact(to);

        }
    }

    async function deleteContact(contactId) {
        try {
            await fetch(context.server + 'contacts/' + contactId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + context.token,
                },
            })
                .then((r) => {
                    context.listConatcts.pop();
                    props.setListState(context.listConatcts);
                    props.setList(context.listConatcts);
                    props.setErrorMessage('failed to add');
                    props.setAlertActive(true);



                })
        } catch (e) {
            context.listConatcts.pop();
            props.setListState(context.listConatcts);
            props.setList(context.listConatcts);
            props.setErrorMessage('failed to add');
            props.setAlertActive(true);
        }

    }
    //signalR
    const addContact = async (userId, userServer, id, name, server) => {
        try {
            await context.connection.invoke("AddContact", userId, userServer, id, name, server);
        } catch (e) {
            console.log(e);
        }
    }
    /******************************************************************************************************************** */

        // The function checks the input from the input box.
    const checkInput = (id, name, server) => {
            hideModal();
            postContact(id, name, server);
            //props.postInvitations(props.username,id, server);

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
                        {/*delete from input: onKeyDown={handlePressedKey}*/}
                        <div className="modal-body">
                            <input type="text" className="form-control" id="modal-textbox-id"
                                   placeholder="Enter contact username..."></input>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" id="modal-textbox-name"
                                   placeholder="Enter contact nickname..."></input>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" id="modal-textbox-server"
                                   placeholder="Enter contact server..."></input>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={hideModal}>Close</button>
                            <button type="button" className="btn btn-primary"
                                    onClick={() =>
                                        checkInput(document.getElementById('modal-textbox-id').value,
                                            document.getElementById('modal-textbox-name').value,
                                            document.getElementById('modal-textbox-server').value
                                        )}>Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewContact;