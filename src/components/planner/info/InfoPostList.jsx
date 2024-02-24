import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import MemoModal from './MemoModal';
import InfoPostItem from './InfoPostItem';
import ad1 from '../../../lib/images/ad1.jpg';
import ad2 from '../../../lib/images/serviceImg1.jpg';
import Empty from '../../common/Empty';
import Loading from '../../common/Loading';

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
    @media all and (min-width: 769px) {
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
    @media all and (min-width: 769px) {
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
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
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
    position: relative;
    border-radius: 0.5rem;
    @media all and (min-width: 769px) {
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

const InfoPostList = ({
    planner,
    curMemo,
    account,
    modal,
    loading,
    plannerError,
    onCreateMemo,
    onUpdateMemo,
    onDeleteMemo,
    onChangeMemoTitle,
    onChangeMemoContent,
    onLoadMemo,
    onCloseModal,
}) => {
    const { planMemos, planMembers } = { ...planner };
    const { accountId, nickname } = { ...account };

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

    return (
        <InfoPostListBlock>
            <Container>
                <PostListBlock>
                    <PostListHeader>
                        <h3>Memo</h3>
                        {accountId === planner.accountId && <Button onClick={onCreateMemo}>ADD</Button>}
                    </PostListHeader>

                    {planMemos &&
                    (planMemos.length <= 0 || planMembers.find((member) => member === nickname) === undefined) ? (
                        <Empty text="메모" />
                    ) : (
                        <PostList>
                            {loading.plannerLoading ||
                            loading.deleteMemoLoading ||
                            loading.updateMemoLoading ||
                            loading.createMemoLoading ? (
                                <Loading size="small" pos="center" />
                            ) : (
                                <>
                                    {planMemos &&
                                        planMemos.map((memo, i) => {
                                            return (
                                                <InfoPostItem
                                                    key={memo.memoId}
                                                    number={i}
                                                    memo={memo}
                                                    onDeleteMemo={onDeleteMemo}
                                                    onLoadMemo={onLoadMemo}
                                                    account={account}
                                                    planner={planner}
                                                />
                                            );
                                        })}
                                </>
                            )}
                        </PostList>
                    )}
                    {Object.keys(modal).length > 0 && modal.memo && (
                        <MemoModal
                            plannerError={plannerError}
                            curMemo={curMemo}
                            onChangeMemoTitle={onChangeMemoTitle}
                            onChangeMemoContent={onChangeMemoContent}
                            modalVisible={modal.memo}
                            onModalClose={onCloseModal}
                            onModalConfirm={onUpdateMemo}
                        />
                    )}
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
