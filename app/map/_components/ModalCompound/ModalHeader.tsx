import React from 'react';

type Props = {
  title?: string;
  subTitle?: string;
  onClose?: () => void; // 새로운 onClose 프로퍼티 추가
};

export const ModalHeader = ({ title, subTitle, onClose }: Props) => {
  return (
    <>
      <div className='modal-header'>
        <div className='modal-header__titles'>
          {title && <h5 className='modal-header__title'>{title}</h5>}
          {subTitle && <span className='modal-header__subtitle'>{subTitle}</span>}
        </div>
        {onClose && ( // onClose 프로퍼티가 전달되었을 때에만 버튼 렌더링
          <button type='button' onClick={onClose}>
            Close
          </button>
        )}
      </div>
      <hr /> {/* Divider 대신 수평선으로 대체 */}
    </>
  );
};
