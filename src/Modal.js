import React from 'react';
import './Modal.css';

function Modal(props) {
    return (
        <div className="modal" style={{display: props.isOpen ? "block" : "none"}}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={props.onClose}>&times;</span>
                    <h2>{props.header}</h2>
                </div>
                <div className="modal-body">
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Modal;
