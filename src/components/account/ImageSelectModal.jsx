import { forwardRef } from 'react';
import Modal from '../common/Modal';

const ImageSelectModal = forwardRef(({ modalVisible, onModalClose, onModalConfirm }, ref) => {
    return (
        <Modal title="이미지 변경" modalVisible={modalVisible} onModalClose={onModalClose} onModalConfirm={onModalConfirm}>
            <form>
                <label htmlFor="select">이미지를 선택하세요.</label>
                <input ref={ref} id="select" name="image" type="file" />
            </form>
        </Modal>
    );
});

export default ImageSelectModal;
