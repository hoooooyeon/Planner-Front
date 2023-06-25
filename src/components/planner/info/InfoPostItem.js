import styled from 'styled-components';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'; // 버스
import { faPen } from '@fortawesome/free-solid-svg-icons'; // 버스

const PostItem = styled.li`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
`;

const PostHeader = styled.div`
    /* position: relative; */
    /* width: 40%; */
    display: flex;
    align-items: center;
`;

const Number = styled.div`
    font-size: 0.7rem;
    color: gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.div`
    font-weight: bold;
    /* margin: 0 0 0.5rem 1.5rem; */
    /* width: 100%; */
    /* height: 1rem; */
    width: 15rem;
    font-size: 0.9rem;
    margin-left: 1.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Date = styled.div`
    color: lightgray;
    font-size: 0.5rem;
    /* width: 100%;
    height: 1rem; */
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
    /* position: absolute;
    right: -16px;
    top: -14px; */
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    border-radius: 2rem;
    background-color: white;
    padding: 0.3rem;
    width: 0.7rem;
    height: 0.7rem;
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
                {/* <Date>updated {updateDate}</Date> */}
            </PostHeader>
            {/* <PostContent>
                <Text ref={textRef} dangerouslySetInnerHTML={{ __html: content }}></Text>
            </PostContent> */}
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
