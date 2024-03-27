import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useEffect, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import Editor from '../common/Editor';
import { useState } from 'react';
import Modal from '../common/Modal';
import PlannerInfo from './PlannerInfo';
import Loading from '../common/Loading';
import Button from '../common/Button';

const Container = styled.div`
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    padding: 1.25rem 0.625rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PostMain = styled.div`
    display: flex;
    flex-direction: column;
`;

const B = styled.b`
    margin: 0.625rem 0rem;
`;

const Title = styled.input`
    margin-top: 1.25rem;
    margin-bottom: 0.625rem;
    outline: none;
    border: none;
    border-bottom: 1px solid silver;
    font-weight: 600;
    font-size: larger;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const PostContentBox = styled.div`
    margin: 0.625rem 0rem;
    .ql-editor {
        min-height: 20rem;
    }
`;

const PostFooterBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

const FooterButton = styled(Button)`
    width: 4rem;
    height: 2rem;
    font-weight: bold;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    border: none;
    border-radius: 6px;
    margin: 0.625rem 0.25rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};

    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const ReviewPost = ({
    loading,
    reviewData,
    selectPlanner,
    newFileList,
    onChangeText,
    onCancel,
    onWritePost,
    onFileUpload,
    fileListUpdate,
    isEdit,
    plannerList,
    onPlannerListLoad,
    onPlannerChange,
}) => {
    const [plannerConfirmModal, setPlannerConfirmModal] = useState(false);

    const { title, content } = reviewData || {};
    const editorRef = useRef();

    const getFileList = () => {
        const elements = editorRef.current.root.querySelectorAll('img');
        if (elements.length != 0) {
            const list = Array.from(elements).map((item) => decodeURI(item.src.split('/').pop()));
            return list;
        }
    };

    const handleWriteClick = () => {
        if (!selectPlanner) {
            setPlannerConfirmModal(true);
        } else {
            onWritePost(getFileList());
            setPlannerConfirmModal(false);
        }
    };

    const handleModalClose = () => {
        setPlannerConfirmModal(false);
    };

    const handleModalConfirm = () => {
        onWritePost(getFileList());
    };

    useEffect(() => {
        if (plannerConfirmModal && !loading.writeLoading) {
            setPlannerConfirmModal(false);
        }
    }, [loading.writeLoading]);

    return (
        <Container>
            <PostMain>
                <Title
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => onChangeText({ key: 'title', value: e.target.value })}
                    placeholder="제목을 입력하세요."
                />
                <B>플래너</B>
                <PlannerInfo
                    loading={loading}
                    viewMode={false}
                    selectPlanner={selectPlanner}
                    plannerList={plannerList}
                    onPlannerListLoad={onPlannerListLoad}
                    onPlannerChange={onPlannerChange}
                />
                <PostContentBox>
                    <Editor
                        ref={editorRef}
                        content={content}
                        onChangeText={onChangeText}
                        isEdit={isEdit}
                        newFileList={newFileList}
                        onFileUpload={onFileUpload}
                        // fileListUpdate={fileListUpdate}
                    />
                </PostContentBox>
            </PostMain>
            <PostFooterBox>
                <FooterButton onClick={onCancel}>취소</FooterButton>
                <FooterButton onClick={handleWriteClick}>{isEdit ? '수정' : '쓰기'}</FooterButton>
            </PostFooterBox>
            <Modal
                modalVisible={plannerConfirmModal}
                title="플래너 확인"
                onModalClose={handleModalClose}
                onModalCancle={handleModalClose}
                onModalConfirm={handleModalConfirm}
                modalConfirmText="확인"
                loading={isEdit ? loading.updateLoading : loading.writeLoading}
            >
                <b>플래너를 선택하지 않으셨습니다.. 그래도 진행합니까?</b>
            </Modal>
        </Container>
    );
};

export default ReviewPost;
