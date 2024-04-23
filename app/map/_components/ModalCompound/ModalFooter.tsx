import React, { useCallback } from 'react';

export type ModalFooterProps = {
  cancelText?: string;
  hasCancel?: boolean;
  isSubmitDisabled?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void | Promise<void>;
  option?: React.ReactNode;
  submitText?: string;
};

export const ModalFooter = ({
  cancelText = 'Cancel',
  hasCancel,
  isSubmitDisabled = false,
  onCancel,
  onSubmit,
  option,
  submitText = 'Submit',
}: ModalFooterProps) => {
  const handleCancel = useCallback(() => {
    if (onCancel) return onCancel();
    // handleCloseModal(); // 이전에 있던 handleCloseModal 삭제
  }, [onCancel]);

  const handleSubmit = useCallback(async () => {
    try {
      if (isSubmitDisabled) return;

      // handleChangeBackdropLoading(true); // 이전에 있던 handleChangeBackdropLoading 삭제

      onSubmit && (await onSubmit());
    } catch (e) {
      console.log(e);
    } finally {
      // handleChangeBackdropLoading(false); // 이전에 있던 handleChangeBackdropLoading 삭제
    }
  }, [isSubmitDisabled, onSubmit]);

  return (
    <>
      <hr /> {/* Divider 대신 수평선으로 대체 */}
      <div className='modal-footer'>
        {option}
        <div className={`modal-footer__actions ${option ? 'modal-footer__actions--withOption' : ''}`}>
          {hasCancel && (
            <button type='button' onClick={handleCancel}>
              {cancelText}
            </button>
          )}
          {onSubmit && (
            <button type='button' onClick={handleSubmit} disabled={isSubmitDisabled}>
              {submitText}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
