import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Menu from '../common/Menu';
import Button from '../common/Button';
import PlannerInfo from './PlannerInfo';
import Comment from './comment/Comment';
import { useState } from 'react';
import CommentInput from './comment/CommentInput';

const Container = styled.div`
    margin-top: 100px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ReviewPostBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
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

const ThumbsUp = styled.div`
    cursor: pointer;
    &:hover {
        color: skyblue;
    }
`;

const PlannerInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 5px 0px;
    border: 1px solid silver;
    border-radius: 6px;
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
    margin-top: 20px;
`;

const ReviewViewer = ({ auth, reviewData, onPostEdit, onPostDelete, onCommentWrite, onCommentDelete, planner }) => {
    const comments = reviewData.comments;

    const menuList = [
        { id: 1, value: '수정' },
        { id: 2, value: '삭제' },
    ];

    const onItemClick = (value, index) => {
        if (index == 0) {
            onPostEdit();
        } else {
            onPostDelete();
        }
    };

    return (
        <Container>
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
                        <ThumbsUp>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </ThumbsUp>
                        {auth.accountId == reviewData.writerId && <Menu list={menuList} onItemClick={onItemClick} />}
                    </TitleMenus>
                </PostTitleBox>
                <PlannerInfoBox>
                    <b>플래너 정보</b>
                    <PlannerInfo planner={planner} viewMode={true}></PlannerInfo>
                    {/* {planner ? <PlannerInfo></PlannerInfo> : <div>추가한 플래너가 없습니다.</div>} */}
                </PlannerInfoBox>
                <PostContentBox dangerouslySetInnerHTML={{ __html: reviewData.content }}></PostContentBox>
                <PostFooterBox>{reviewData.tag && reviewData.tag.map((tag) => <PostTag>{tag}</PostTag>)}</PostFooterBox>
                <CommentInput name={auth.nickname} onCommentWrite={onCommentWrite} />
                <CommentsBox>
                    {comments &&
                        comments.map((comment, index) => (
                            <Comment
                                key={index}
                                commentInfo={comment}
                                accountId={auth.accountId}
                                onCommentWrite={onCommentWrite}
                                onCommentDelete={onCommentDelete}
                            />
                        ))}
                </CommentsBox>
            </ReviewPostBox>
        </Container>
    );
};

export default ReviewViewer;
