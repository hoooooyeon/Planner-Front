import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loading from '../common/Loading';
import Menu from '../common/Menu';
import Modal from '../common/Modal';
import PlannerInfo from './PlannerInfo';
import Comment from './comment/Comment';
import CommentInput from './comment/CommentInput';

const Container = styled.div`
    padding: 1.25rem 0.625rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const PostSideBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 0.625rem;
`;

const ReviewPostBox = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 64rem;
`;

const PostTitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: medium;
    padding: 0.625rem;
    border-bottom: 1px solid silver;
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`;

const Title = styled.div`
    font-size: x-large;
    margin: 0.625rem 0rem;
`;

const Info = styled.div`
    font-size: small;
    margin-top: 0.25rem;

    span:nth-child(2n) {
        margin: 0rem 0.25rem;
    }

    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;

        span:nth-child(2n) {
            margin: 0rem 0rem;
        }
    }
`;

const TitleMenus = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    & > * {
        margin: 0px 0.625rem;
    }
`;

const PlannerInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0.625rem;
    margin: 0.625rem 0.625rem;
    border: 1px solid silver;
    border-radius: 6px;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};

    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const PostContentBox = styled.div`
    min-height: 320px;
    margin-top: 0.625rem;
    padding: 0.625rem;
    border-bottom: 1px solid silver;

    img {
        max-width: 100%;
    }
`;

const PostFooterBox = styled.div`
    display: flex;
    margin-top: 0.625rem;
`;

const PostTag = styled.a`
    min-width: 60px;
    height: 1.625rem;
    padding: 0.125rem;
    line-height: 1.75rem;
    text-align: center;
    border-radius: 6px;
    background-color: #e3e3e3;

    &:nth-child(2n) {
        margin: 0rem 0.25rem;
    }
`;

const CommentsBox = styled.div`
    margin: 1.25rem 0rem;
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
            {/* <PostSideBox>
                <UpDown onUpDownClick={onUpDownClick} />
            </PostSideBox> */}
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
