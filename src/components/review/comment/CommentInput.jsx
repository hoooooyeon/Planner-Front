import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';

const CommentInputBox = styled.div`
    border: 1px solid silver;
    border-radius: 6px;
    padding: 12px;
    margin: 10px;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
`;

const Writer = styled.b`
    display: block;
    margin: 10px 0px;
`;

const InputBox = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border: none;
    /* border-radius: 6px; */
    padding: 0px;
    outline: none;
    resize: none;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const BtnBox = styled.div`
    text-align: right;
    margin-top: 10px;
`;

const ActionButton = styled.button`
    width: 48px;
    height: 32px;
    margin: 0px 5px;
    border: 0px;
    border-radius: 6px;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    //color: white;

    &:hover {
        background-color: silver;
    }
`;

const CommentInput = ({ name, editMode, reCommentMode, value = '', onCommentWrite, onCancel }) => {
    const [commentText, setCommentText] = useState(value);

    const onCommentTextChange = (text) => {
        setCommentText(text);
    };

    const onWriteClick = () => {
        onCommentWrite({
            editMode,
            reCommentMode,
            commentText,
        });
        setCommentText('');
    };

    const onCancelClick = () => {
        onCancel();
    };
    return (
        <CommentInputBox>
            {!editMode && !reCommentMode && <Writer>{name}</Writer>}
            <InputBox
                onChange={(e) => {
                    onCommentTextChange(e.target.value);
                }}
                value={commentText}
            >
                {commentText}
            </InputBox>
            <BtnBox>
                {(editMode || reCommentMode) && <ActionButton onClick={onCancelClick}>취소</ActionButton>}
                <ActionButton onClick={onWriteClick}>{!editMode ? '쓰기' : '수정'}</ActionButton>
            </BtnBox>
        </CommentInputBox>
    );
};

export default CommentInput;
