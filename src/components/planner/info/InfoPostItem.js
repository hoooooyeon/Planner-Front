import styled, { css } from 'styled-components';
import { useRef } from 'react';
import { useState } from 'react';

const PostItem = styled.div`
    border: 1px solid #cdd9ac;
    border-radius: 5px;
    margin-bottom: 1rem;
    /* display: flex; */
    flex-direction: column;
    padding: 10px;
    /* display: none; */
`;

const PostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderInfo = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Number = styled.p`
    font-weight: bold;
    font-size: 1.2rem;
    margin-right: 1rem;
`;

const Title = styled.p`
    font-weight: bold;
`;

const Date = styled.p`
    color: lightgray;
    font-size: 0.8rem;
`;

const Text = styled.div`
    overflow-y: hidden;
    visibility: hidden;
    max-height: 0px;
    transition: max-height 300ms ease-in-out;
    margin-top: -25px;
    /* border: 1px solid lightgray;
  border-radius: 1rem; */
    padding: 1rem;
    ${(props) =>
        props.isMax &&
        css`
            visibility: visible;
            max-height: 200px;
        `}
`;

const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;

    padding-top: 10px;
`;

const Button = styled.button`
    border-radius: 0.5rem;
    border: none;
    background-color: #9aad67;
    color: white;
    width: 4rem;
    height: 2rem;
    margin-left: 1rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: #f4d284;
    }
`;

const InfoPostItem = ({ memo, onDeleteMemo, onLoadMemo, setIsEdit, onLoadPlanner }) => {
    const textRef = useRef();
    const [isMax, setIsMax] = useState(false);
    const onMax = () => {
        if (isMax === false) {
            setIsMax(true);
        } else {
            setIsMax(false);
        }
    };
    const { memoId, title, content, updateDate } = memo;

    const onDeletePostMd = async () => {
        const deleteMemo = () => {
            onDeleteMemo(memoId);
        };

        const load = () => {
            onLoadPlanner();
        };
        await deleteMemo();
        // await load();
    };

    return (
        <>
            <PostItem>
                <PostHeader>
                    <HeaderInfo>
                        <Number>{memoId}</Number>
                        <div>
                            <Title>{title}</Title>
                            <Date>{updateDate}</Date>
                        </div>
                    </HeaderInfo>
                    <ButtonBox>
                        {isMax ? <Button onClick={onMax}>Min</Button> : <Button onClick={onMax}>Max</Button>}
                        <Button
                            onClick={() => {
                                setIsEdit(true);
                                onLoadMemo(memo);
                            }}
                        >
                            Edit
                        </Button>
                        <Button onClick={onDeletePostMd}>Delete</Button>
                    </ButtonBox>
                </PostHeader>
                <Text ref={textRef} dangerouslySetInnerHTML={{ __html: content }} isMax={isMax}></Text>
            </PostItem>
        </>
    );
};

export default InfoPostItem;
