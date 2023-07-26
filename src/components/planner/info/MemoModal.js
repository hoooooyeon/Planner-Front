import { useEffect } from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled, { css } from 'styled-components';
import Modal from '../../common/Modal';

const MemoModalBlock = styled.div`
    border-radius: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 35rem;
    max-height: 20rem;
    padding: 0.5rem;
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
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 2rem;
    padding: 0 0.5rem;
    ${(props) =>
        props.hosted === false &&
        css`
            pointer-events: none;
        `}
    &::placeholder {
        color: #beb9b9;
    }
    &:focus {
        color: lightblue;
    }
`;

const StyledReactQuill = styled(ReactQuill)`
    ${(props) =>
        props.hosted === false &&
        css`
            pointer-events: none;
        `}
`;

const MemoModal = ({ nickname, creator, curMemo, onChangeMemoTitle, onChangeMemoContent, isState, onModalClose, onModalConfirm }) => {
    const modules = {
        toolbar: [[{ header: [1, 2, 3, false] }], ['bold', 'italic', 'underline', 'strike'], [{ list: 'ordered' }, { list: 'bullet' }], ['link'], [{ color: [] }, { background: [] }], ['clean']],
    };

    const { title, content } = { ...curMemo };
    const [hosted, setHosted] = useState(false);

    useEffect(() => {
        if (nickname === creator) {
            setHosted(true);
        } else {
            setHosted(false);
        }
    }, [nickname, creator]);

    return (
        <Modal modalVisible={isState} title="메모 수정" onModalClose={onModalClose} onModalConfirm={onModalConfirm}>
            <MemoModalBlock>
                <MemoModalHeader>
                    <StyledInput
                        hosted={hosted}
                        name="title"
                        placeholder="Title"
                        type="text"
                        value={title || ''}
                        onChange={(e) => {
                            onChangeMemoTitle(e.target.value);
                        }}
                    />
                </MemoModalHeader>
                <MemoModalBody>
                    <StyledReactQuill
                        hosted={hosted}
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
