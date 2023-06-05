import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import Editor from '../common/Editor';
import ReviewInfo from './ReviewInfo';
import { useState } from 'react';
import Modal from '../common/Modal';

const Container = styled.div`
    width: 800px;
    //background-color: silver;
    border-radius: 6px;
    margin: 100px auto 30px auto;
`;

const PostMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BoxAlign = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 20px;
`;
const B = styled.b`
    //color: white;
    margin: 10px 0px;
`;

const Input = styled.input`
    //height: 28px;
    outline: none;
    border: none;
    border-bottom: 1px solid silver;
    //border-radius: 6px;
    //padding: 8px;
    font-weight: 600;
    font-size: xx-large;
`;

const PostTitleBox = styled(BoxAlign)``;

const PostContentBox = styled.div`
    background-color: white;
    margin: 10px 0px;
    .ql-editor {
        min-height: 320px;
    }
`;

const PostFooterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Button = styled.button`
    width: 64px;
    height: 32px;
    font-weight: bold;
    color: ${(props) => props.textColor || 'black'};
    background-color: ${(props) => props.color || 'white'};
    border: none;
    border-radius: 6px;
    margin: 10px 4px;

    &:hover {
        background-color: #ebebeb;
    }
`;

const ReviewPost = ({
    reviewData,
    onChangeText,
    newFileList,
    onCancel,
    onWritePost,
    onFileUpload,
    fileListUpdate,
    isEdit,
    plannerList,
    onPlannerListLoad,
    onPlannerSelect,
}) => {
    const [plannerConfirmModal, setPlannerConfirmModal] = useState(false);
    const { plannerId } = reviewData;

    const onWriteClick = () => {
        if (!plannerId) {
            setPlannerConfirmModal(true);
        } else {
            onWritePost();
            setPlannerConfirmModal(false);
        }
    };

    const onModalClose = () => {
        setPlannerConfirmModal(false);
    };

    const onModalConfirm = () => {
        onWritePost();
        setPlannerConfirmModal(false);
    };

    return (
        <Container>
            <PostMain>
                <BoxAlign>
                    <Input
                        type="text"
                        name="title"
                        value={reviewData.title}
                        onChange={(e) => onChangeText({ key: 'title', value: e.target.value })}
                        placeholder="제목을 입력하세요."
                    />
                    <B>플래너</B>
                    <ReviewInfo plannerList={plannerList} onPlannerListLoad={onPlannerListLoad} onPlannerSelect={onPlannerSelect} />
                    <PostContentBox>
                        <Editor
                            reviewData={reviewData}
                            onChangeText={onChangeText}
                            isEdit={isEdit}
                            newFileList={newFileList}
                            onFileUpload={onFileUpload}
                            fileListUpdate={fileListUpdate}
                        />
                    </PostContentBox>
                </BoxAlign>
            </PostMain>
            <PostFooterBox>
                <Button onClick={onCancel}>취소</Button>
                <Button onClick={onWriteClick}>{isEdit ? '수정' : '쓰기'}</Button>
            </PostFooterBox>
            <Modal modalVisible={plannerConfirmModal} title="플래너 확인" onModalClose={onModalClose} onModalConfirm={onModalConfirm} modalConfirmText="확인">
                <b>플래너를 선택하지 않으셨습니다.. 그래도 진행합니까?</b>
            </Modal>
        </Container>
    );
};

export default ReviewPost;
