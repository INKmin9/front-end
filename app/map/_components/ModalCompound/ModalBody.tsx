import React from 'react';

type Props = {
  content: React.ReactNode;
};

export const ModalBody = ({ content }: Props) => {
  return <div className='modal-body'>{content}</div>;
};
