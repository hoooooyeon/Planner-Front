import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MemoModal from './MemoModal';
import InfoPostItem from './InfoPostItem';
import ad1 from '../../../lib/images/ad1.jpg';
import ad2 from '../../../lib/images/serviceImg1.jpg';

const InfoPostListBlock = styled.div`
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
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
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
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
    border-top: 1px solid ${(props) => props.theme.outlineColor};
    border-bottom: 1px solid ${(props) => props.theme.outlineColor};
    padding: 0;
    height: calc(100% - 4rem);
    display: flex;
    flex-direction: column;
    overflow: auto;
    position: relative;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Button = styled.button`
    border-radius: 0.5rem;
    border: none;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    width: 5rem;
    height: 2rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        color: ${(props) => props.theme.hoverColor};
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
`;

const Ad = styled.div`
    width: calc(35% + 2rem);
    height: 40vw;
    margin-left: 1rem;
    display: none;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    transition: all 0.3s;
    position: relative;
    border-radius: 0.5rem;
    @media all and (min-width: 768px) {
        display: block;
    }
    div {
        width: calc(100% - 2rem);
        padding: 1rem;
        color: ${(props) => props.theme.primaryColor};
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

const ErrorList = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    font-weight: bold;
    font-size: 1rem;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;

const InfoPostList = ({
    planner,
    curMemo,
    account,
    onCreateMemo,
    onUpdateMemo,
    onDeleteMemo,
    onChangeMemoTitle,
    onChangeMemoContent,
    onLoadMemo,
    onResetMemo,
}) => {
    const { planMemos, creator } = { ...planner };
    const { nickname } = { ...account };

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
        onResetMemo();
        if (curMemo.title.length > 0) {
            onCreateMemo();
        }
    };

    const onEditPostMd = () => {
        setIsEdit(false);
        onResetMemo();
        onUpdateMemo(curMemo.memoId);
    };

    const onCancelPostMd = () => {
        setIsEdit(false);
        setIsCreate(false);
        onResetMemo();
    };

    return (
        <InfoPostListBlock>
            <Container>
                <PostListBlock>
                    <PostListHeader>
                        <h3>Memo</h3>
                        {account && Object.keys(planner).length > 0 && account.accountId === planner.accountId && (
                            <Button
                                onClick={() => {
                                    onResetMemo();
                                    setIsCreate(true);
                                }}
                            >
                                ADD
                            </Button>
                        )}
                    </PostListHeader>
                    <PostList>
                        {planMemos && planMemos.length > 0 ? (
                            planMemos.map((memo) => {
                                return (
                                    <InfoPostItem
                                        key={memo.memoId}
                                        memo={memo}
                                        onDeleteMemo={onDeleteMemo}
                                        onLoadMemo={onLoadMemo}
                                        setIsEdit={setIsEdit}
                                        account={account}
                                        planner={planner}
                                    />
                                );
                            })
                        ) : (
                            <ErrorList>리스트가 없습니다.</ErrorList>
                        )}
                    </PostList>
                    {/* 메모 생성 모달 */}
                    <MemoModal
                        account={account}
                        planner={planner}
                        curMemo={curMemo}
                        onChangeMemoTitle={onChangeMemoTitle}
                        onChangeMemoContent={onChangeMemoContent}
                        isState={isCreate}
                        onModalClose={onCancelPostMd}
                        onModalConfirm={onCreatePostMd}
                    />
                    {/* 메모 수정 모달 */}
                    <MemoModal
                        account={account}
                        planner={planner}
                        curMemo={curMemo}
                        onChangeMemoTitle={onChangeMemoTitle}
                        onChangeMemoContent={onChangeMemoContent}
                        isState={isEdit}
                        onModalClose={onCancelPostMd}
                        onModalConfirm={onEditPostMd}
                    />
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
                            <Img src={ad2} alt="ad2" />
                            <div>한국다봄을 앱에서도 곧 만나 보실 수 있어요.</div>
                        </>
                    )}
                </Ad>
            </Container>
        </InfoPostListBlock>
    );
};

export default InfoPostList;
