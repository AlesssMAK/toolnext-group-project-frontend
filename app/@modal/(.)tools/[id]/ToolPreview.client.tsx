'use client';

import Modal from '@/components/Modal/Modal';

import css from './NotePreview.module.css';

const ToolPreviewDetails = () => {
  return (
    <Modal onClose={close}>
      <div className={css.container}>ToolPreviewDetails</div>
    </Modal>
  );
};

export default ToolPreviewDetails;
