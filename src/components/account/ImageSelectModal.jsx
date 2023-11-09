import { forwardRef } from 'react';
import Modal from '../common/Modal';

const ImageSelectModal = forwardRef((props, ref) => {
    return (
        <Modal {...props} title="이미지 변경">
            <form>
                <label htmlFor="select">이미지를 선택하세요.</label>
                <input ref={ref} id="select" name="image" type="file" />
            </form>
        </Modal>
    );
});

export default ImageSelectModal;
