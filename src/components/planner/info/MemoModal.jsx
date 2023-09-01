import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';
import Modal from '../../common/Modal';

const MemoModalBlock = styled.div`
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.outlineColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 35rem;
    max-height: 20rem;
    padding: 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;
const MemoModalHeader = styled.div`
    display: flex;
    margin-bottom: 1rem;
`;

const MemoModalBody = styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
`;

const StyledInput = styled.input`
    border: none;
    outline: none;
    border-radius: 0.3rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    width: 100%;
    height: 2rem;
    padding: 0 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    ${(props) =>
        props.hosted === false &&
        css`
            pointer-events: none;
        `}
    &::placeholder {
        color: ${(props) => props.theme.tertiaryColor};
    }
    &:focus {
        color: ${(props) => props.theme.tertiaryColor};
        outline: none;
    }
`;

const ErrorText = styled.div`
    color: ${(props) => props.theme.errorColor};
    font-weight: bold;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0.5rem 0;
`;

const MemoModal = ({
    curMemo,
    plannerError,
    onChangeMemoTitle,
    onChangeMemoContent,
    modalVisible,
    onModalClose,
    onModalConfirm,
}) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    };

    const { title, content } = { ...curMemo };

    return (
        <Modal
            modalVisible={modalVisible}
            title="메모 수정"
            onModalClose={onModalClose}
            onModalConfirm={onModalConfirm}
        >
            <MemoModalBlock>
                <MemoModalHeader>
                    <StyledInput
                        name="title"
                        placeholder="Title"
                        type="text"
                        value={title || ''}
                        onChange={(e) => {
                            onChangeMemoTitle(e.target.value);
                        }}
                    />
                </MemoModalHeader>
                {plannerError && plannerError.title && <ErrorText>{plannerError.title}</ErrorText>}
                <MemoModalBody>
                    <ReactQuill
                        placeholder="내용을 입력해주세요."
                        theme="snow"
                        modules={modules}
                        value={content || ''}
                        onChange={(e) => {
                            onChangeMemoContent(e);
                        }}
                    />
                </MemoModalBody>
            </MemoModalBlock>
        </Modal>
    );
};

export default MemoModal;
