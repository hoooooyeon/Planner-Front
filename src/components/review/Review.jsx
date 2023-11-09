import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Menu from '../common/Menu';
import Button from '../common/Button';
import PlannerInfo from './PlannerInfo';
import Comment from './comment/Comment';
import { useState } from 'react';
import CommentInput from './comment/CommentInput';
import UpDown from './UpDown/UpDown';
import Loading from '../common/Loading';
import Modal from '../common/Modal';
import { useEffect } from 'react';

const Container = styled.div`
    padding: 20px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const PostSideBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`;

const ReviewPostBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 0.5;
`;

const PostTitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: medium;
    padding: 10px;
    border-bottom: 1px solid silver;
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`;

const Title = styled.div`
    font-size: x-large;
    margin: 10px 0px;
`;

const Info = styled.div`
    font-size: small;
    margin-top: 4px;
    span:nth-child(2n) {
        margin: 0px 4px;
    }
`;

const TitleMenus = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    & > * {
        margin: 0px 10px;
    }
`;

const PlannerInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 5px 10px;
    border: 1px solid silver;
    border-radius: 6px;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};

    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const PostContentBox = styled.div`
    min-height: 320px;
    margin-top: 10px;
    padding: 10px;
    border-bottom: 1px solid silver;
`;

const PostFooterBox = styled.div`
    display: flex;
    margin-top: 10px;
`;

const PostTag = styled.a`
    min-width: 60px;
    height: 26px;
    padding: 2px;
    line-height: 28px;
    text-align: center;
    border-radius: 6px;
    background-color: #e3e3e3;

    &:nth-child(2n) {
        margin: 0px 4px;
    }
`;

const CommentsBox = styled.div`
    margin: 20px 0px;
`;

const menuList = [
    { id: 0, value: '수정' },
    { id: 1, value: '삭제' },
];

const Review = ({
    loading,
    auth,
    reviewData,
    onPostEdit,
    onPostDelete,
    onCommentWrite,
    onCommentDelete,
    planner,
    onUpDownClick,
}) => {
    const [modal, setModal] = useState(false);
    const comments = (reviewData && reviewData.comments) || [];

    const handleModalClose = () => {
        setModal(!modal);
    };

    const handleModalConfirm = () => {
        onPostDelete();
    };

    const onItemClick = (value, index) => {
        if (index == 0) {
            onPostEdit();
        } else {
            setModal(true);
        }
    };

    useEffect(() => {
        if (modal && loading.deleteLoading) {
            setModal(!modal);
        }
    }, [loading.deleteLoading]);

    if ((loading.loadLoading && !reviewData) || !reviewData) {
        return (
            <Container>
                <Loading />
            </Container>
        );
    }

    return (
        <Container>
            <PostSideBox>
                <UpDown onUpDownClick={onUpDownClick} />
            </PostSideBox>
            <ReviewPostBox>
                <PostTitleBox>
                    <FlexBox direction="column">
                        <Title>{reviewData.title}</Title>
                        <Info>
                            <span>{`작성자:${reviewData.writer}`}</span>
                            <span>{`수정:${reviewData.updateDate}`}</span>
                        </Info>
                    </FlexBox>
                    <TitleMenus>
                        {auth && auth.accountId == reviewData.writerId && (
                            <Menu list={menuList} onItemClick={onItemClick} />
                        )}
                    </TitleMenus>
                </PostTitleBox>
                <PlannerInfoBox>
                    <b>플래너 정보</b>
                    <PlannerInfo
                        loading={{ plannerLoading: loading.plannerLoading }}
                        selectPlanner={planner}
                        viewMode={true}
                    ></PlannerInfo>
                    {/* {planner ? <PlannerInfo></PlannerInfo> : <div>추가한 플래너가 없습니다.</div>} */}
                </PlannerInfoBox>
                <PostContentBox dangerouslySetInnerHTML={{ __html: reviewData.content }}></PostContentBox>
                <PostFooterBox>{reviewData.tag && reviewData.tag.map((tag) => <PostTag>{tag}</PostTag>)}</PostFooterBox>
                {auth && <CommentInput name={auth.nickname} onCommentWrite={onCommentWrite} />}
                <CommentsBox>
                    {comments &&
                        comments.map((comment, index) => (
                            <Comment
                                key={index}
                                commentInfo={comment}
                                accountId={auth && auth.accountId}
                                onCommentWrite={onCommentWrite}
                                onCommentDelete={onCommentDelete}
                            />
                        ))}
                </CommentsBox>
            </ReviewPostBox>

            {modal && (
                <Modal
                    modalVisible={modal}
                    title="알림"
                    onModalClose={handleModalClose}
                    onModalCancle={handleModalClose}
                    onModalConfirm={handleModalConfirm}
                    loading={loading.deleteLoading}
                >
                    <p>
                        <b>정말 삭제합니까?</b>
                    </p>
                </Modal>
            )}
        </Container>
    );
};

export default Review;
