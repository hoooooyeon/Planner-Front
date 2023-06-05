import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import CommentInput from './CommentInput';

const CommentBox = styled.div`
    padding: 20px 0px;
    margin-left: ${(props) => (props.isReComment ? '20px' : '0px')};
    border-bottom: 1px solid silver;
`;

const CommentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CommentUserName = styled.b`
    display: block;
    margin: 10px 0px;
`;

const ReCommentUserName = styled.span`
    margin-right: 5px;
    padding: 3px;
    border-radius: 6px;
    background-color: skyblue;
`;

const CommentActions = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Action = styled.div`
    border-radius: 6px;
    margin: 0px 10px;
    padding: 4px 8px;

    &:hover {
        color: silver;
        cursor: pointer;
    }
`;

const ReCommentText = styled.span`
    display: inline-block;
    font-size: small;
    margin-top: 10px;
    cursor: pointer;
`;

const Comment = ({ commentInfo, accountId, parentCommentInfo, onCommentWrite, onCommentDelete }) => {
    const { writerId, writer, commentId, content, parentId } = commentInfo;
    const parentWriter = parentCommentInfo && parentCommentInfo.writer;
    const [modify, setModify] = useState(false);
    const [reComment, setReComment] = useState(false);
    const action = accountId == writerId;

    const onModifyCancel = () => {
        setModify(false);
    };

    const onDeleteClick = () => {
        onCommentDelete(commentId);
    };

    const onCommentUpdate = (comment) => {
        onCommentWrite({
            ...comment,
            commentId: commentId,
        });

        setModify(!modify);
    };

    const onReComment = (comment) => {
        onCommentWrite({
            ...comment,
            commentId: commentId,
        });

        setReComment(!reComment);
    };

    const onReCommentClick = () => {
        if (reComment) {
            setReComment(false);
        } else {
            setReComment(true);
        }
    };

    return (
        <>
            <CommentBox isReComment={parentId > 0}>
                <CommentHeader>
                    <CommentUserName>{writer}</CommentUserName>
                    {action && (
                        <CommentActions>
                            <Action onClick={setModify}>
                                <FontAwesomeIcon icon={faPen} size="xs" />
                            </Action>
                            <Action onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} size="xs" />
                            </Action>
                        </CommentActions>
                    )}
                </CommentHeader>
                {modify ? (
                    <CommentInput
                        name={writer}
                        editMode={modify}
                        value={content}
                        onCommentWrite={onCommentUpdate}
                        onCancel={onModifyCancel}
                    />
                ) : content ? (
                    <div>
                        {parentId && <ReCommentUserName>{parentWriter}</ReCommentUserName>}
                        {content}
                    </div>
                ) : (
                    <div>삭제된 댓글입니다.</div>
                )}
                {reComment ? (
                    <CommentInput
                        name={writer}
                        reCommentMode={reComment}
                        onCommentWrite={onReComment}
                        onCancel={onReCommentClick}
                    />
                ) : (
                    content && <ReCommentText onClick={onReCommentClick}>댓글 쓰기</ReCommentText>
                )}
            </CommentBox>
            {commentInfo.reComments &&
                commentInfo.reComments.map((comment, index) => (
                    <Comment
                        key={index}
                        commentInfo={comment}
                        parentCommentInfo={commentInfo}
                        accountId={accountId}
                        onCommentWrite={onCommentWrite}
                        onCommentDelete={onCommentDelete}
                    />
                ))}
        </>
    );
};

export default Comment;
