import React from 'react';

export type ModalProps = {
  isOpen: boolean;
  header: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
};

const Modal = ({ body, header, footer, isOpen }: ModalProps) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='modal-overlay' />
      <div className='modal-content'>
        <div className='modal-header'>{header}</div>
        <div className='modal-body'>{body}</div>
        {footer && <div className='modal-footer'>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
