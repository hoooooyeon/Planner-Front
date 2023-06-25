import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import Modal from '../../common/Modal';
import MemoModal from './MemoModal';
import InfoPostItem from './InfoPostItem';
import ad1 from '../../../lib/images/ad1.jpg';
import ad2 from '../../../lib/images/ad2.jpg';

const InfoPostListBlock = styled.div`
    background-color: #f5f5f5;
    padding-top: 1rem;
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 0 1rem 1rem;
    display: flex;
    justify-content: space-between;
    @media all and (min-width: 768px) {
        padding: 0 9rem 1rem;
    }
`;

const PostListBlock = styled.div`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background-color: white;
    padding: 1rem;
    width: calc(100% - 2rem);
    height: 20rem;
    @media all and (min-width: 768px) {
        width: calc(60% - 2rem);
        height: calc(40vw - 2rem);
    }
`;

const PostListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
        margin: 0;
    }
`;

const PostList = styled.ul`
    /* margin-top: 2rem; */
    border-top: 1px solid navy;
    border-bottom: 1px solid navy;
    padding: 0;
    height: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Button = styled.button`
    border-radius: 0.5rem;
    border: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    width: 5rem;
    height: 2rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`;

const Ad = styled.div`
    width: calc(35% + 2rem);
    height: 40vw;
    margin-left: 1rem;
    display: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    position: relative;
    border-radius: 0.5rem;
    @media all and (min-width: 768px) {
        display: block;
    }
    div {
        width: calc(100% - 2rem);
        padding: 1rem;
        color: white;
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 0.9rem;
        pointer-events: none;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
`;
const InfoPostList = ({ planner, curMemo, onCreateMemo, onUpdateMemo, onDeleteMemo, onChangeMemoTitle, onChangeMemoContent, onLoadMemo, onResetMemo }) => {
    const { planMemos } = { ...planner };

    const [isChanged, setIsChanged] = useState(false);
    const adRef = useRef();

    const onChangeHovered = () => {
        setIsChanged(!isChanged);
    };

    useEffect(() => {
        let refAd = adRef.current;
        if (refAd) {
            refAd.addEventListener('mouseover', onChangeHovered);
            refAd.addEventListener('mouseout', onChangeHovered);

            return () => {
                refAd.removeEventListener('mouseover', onChangeHovered);
                refAd.removeEventListener('mouseout', onChangeHovered);
            };
        }
    });

    const [isCreate, setIsCreate] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const onCreatePostMd = () => {
        setIsCreate(false);
        onCreateMemo();
        onResetMemo();
    };

    const onEditPostMd = () => {
        setIsEdit(false);
        onUpdateMemo(curMemo.memoId);
        onResetMemo();
    };

    const onCancelPostMd = () => {
        setIsEdit(false);
        setIsCreate(false);
        onResetMemo();
    };

    if (!planner) {
        return <div>Loading...</div>;
    }
    return (
        <InfoPostListBlock>
            <Container>
                <PostListBlock>
                    <PostListHeader>
                        <h3>Memo</h3>
                        <Button
                            onClick={() => {
                                onResetMemo();
                                setIsCreate(true);
                            }}
                        >
                            ADD
                        </Button>
                    </PostListHeader>
                    <PostList>
                        {planMemos &&
                            planMemos.map((memo) => {
                                return <InfoPostItem key={memo.memoId} memo={memo} onDeleteMemo={onDeleteMemo} onLoadMemo={onLoadMemo} setIsEdit={setIsEdit} />;
                            })}
                    </PostList>
                    {/* 메모 생성 모달 */}
                    <MemoModal curMemo={curMemo} onChangeMemoTitle={onChangeMemoTitle} onChangeMemoContent={onChangeMemoContent} isState={isCreate} onModalClose={onCancelPostMd} onModalConfirm={onCreatePostMd} />
                    {/* 메모 수정 모달 */}
                    <MemoModal curMemo={curMemo} onChangeMemoTitle={onChangeMemoTitle} onChangeMemoContent={onChangeMemoContent} isState={isEdit} onModalClose={onCancelPostMd} onModalConfirm={onEditPostMd} />
                </PostListBlock>
                <Ad ref={adRef}>
                    {!isChanged ? (
                        <>
                            <Img src={ad1} alt="ad1" />
                            <div>
                                바쁜 일정 중에 잊는 것들이 있을 수 있어요. <br />
                                여행에 필요한 정보들을 기록해 보세요.
                            </div>
                        </>
                    ) : (
                        <>
                            <Img src={ad1} alt="ad2" />
                            <div>한국다봄을 앱에서도 곧 만나 보실 수 있어요.</div>
                        </>
                    )}
                </Ad>
            </Container>
        </InfoPostListBlock>
    );
};

export default InfoPostList;
