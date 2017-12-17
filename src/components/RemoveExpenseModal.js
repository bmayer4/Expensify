import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app'); 

const RemoveExpenseModal = (props) => (  
    <Modal
    isOpen={!!props.modalOpen} 
    onRequestClose={props.onRemove}  
    contentLabel="Remove"
    closeTimeoutMS={200}
    className="modal"
    >
    <h3 className="modal__title">Remove Expense?</h3>
    <button className="button button--modal" onClick={props.onCancel}>Cancel</button>
    <button className="button button--modal" onClick={props.onRemove}>Remove</button>
    </Modal>
);

export default RemoveExpenseModal;


// <h3 className="modal__title">Remove Expense</h3>
//props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}