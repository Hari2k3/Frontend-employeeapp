import type React from 'react';
import './Modal.css'

export const Modal = ({isOpen, onClose, children} : {isOpen: boolean, onClose?: () => void, children?:React.ReactNode}) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className='modal-content'>
                <div className="modal-close-button" onClick={onClose}>X</div>
                {children}
            </div>
            
        </div>
    )
}