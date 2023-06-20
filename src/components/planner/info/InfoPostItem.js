import styled from 'styled-components';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faPen } from '@fortawesome/free-solid-svg-icons'; // 버스

const PostItem = styled.div`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    & + & {
        margin-top: 1.5rem;
    }
`;

const PostHeader = styled.div`
    position: relative;
    width: 40%;
    display: flex;
    flex-direction: column;
    padding-right: 0.5rem;
`;

const Number = styled.p`
    font-weight: bold;
    font-size: 0.9rem;
    color: gray;
    margin: 0;
`;

const Title = styled.p`
    font-weight: bold;
    margin: 0 0 0.5rem 1.5rem;
    width: 100%;
    height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Date = styled.p`
    color: lightgray;
    font-size: 0.5rem;
    margin: 0 0 0 1.5rem;
    width: 100%;
    height: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PostContent = styled.div`
    width: 55%;
    margin-left: 1rem;
`;

const Text = styled.div`
    font-size: 0.8rem;
    height: 4rem;
    overflow: hidden;
    word-wrap: break-word;
    display: -webkit-box;
    &::-webkit-scrollbar {
        display: none;
    }
    p {
        margin: 0;
    }
`;

const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: -16px;
    top: -14px;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    border-radius: 2rem;
    background-color: white;
    padding: 0.5rem;
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    & + & {
        margin-left: 0.5rem;
    }
`;

const InfoPostItem = ({ memo, onDeleteMemo, onLoadMemo, setIsEdit }) => {
    const textRef = useRef();

    const { memoId, title, content, updateDate } = memo;

    const onDeletePostMd = () => {
        onDeleteMemo(memoId);
    };

    return (
        <PostItem>
            <PostHeader>
                <Number>{memoId}</Number>
                <Title>{title}</Title>
                <Date>{updateDate}</Date>
            </PostHeader>
            <PostContent>
                <Text ref={textRef} dangerouslySetInnerHTML={{ __html: content }}></Text>
            </PostContent>
            <ButtonBox>
                <StyledFontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                        setIsEdit(true);
                        onLoadMemo(memo);
                    }}
                />
                <StyledFontAwesomeIcon icon={faXmark} onClick={onDeletePostMd} />
            </ButtonBox>
        </PostItem>
    );
};

export default InfoPostItem;
