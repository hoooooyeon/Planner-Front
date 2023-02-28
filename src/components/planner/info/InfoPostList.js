import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import InfoPostItem from './InfoPostItem';
// import airplaneDay from '../../../lib/img/airplane-day.jpg';
// import airplaneNight from '../../../lib/img/airplane-night.jpg';

const InfoPostListBlock = styled.div`
    width: 100%;
    height: 550px;
    background-color: #f5f5f5;
    padding-top: 30px;
`;

const Container = styled.div`
    height: 100%;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    @media all and (min-width: 768px) {
        width: 738px;
    }
    @media all and (min-width: 960px) {
        width: 930px;
    }
    @media all and (min-width: 1280px) {
        width: 1024px;
    }
`;

const PostListBlock = styled.div`
    width: 65%;
    min-width: 400px;
    height: 100%;
    /* height: calc(100% - 1rem); */
    border: 0.2rem solid #cdd9ac;
    border-radius: 10px;
    background-color: white;
`;

const PostListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    ${(props) =>
        props.isShadow &&
        css`
            box-shadow: 0px 3px 7px 1px rgb(0, 0, 0, 30%);
        `}
`;

const PostList = styled.div`
    height: calc(100% - 5rem);
    overflow-y: auto;
    padding: 0 1rem;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Button = styled.button`
    border-radius: 0.5rem;
    border: none;
    background-color: #9aad67;
    color: white;
    width: 5rem;
    height: 2rem;
    margin-left: 1rem;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: #f4d284;
    }
`;

const Ad = styled.div`
    width: 350px;
    height: 100%;
    margin-left: 5px;
    display: none;
    transition: all 0.3s;
    position: relative;
    border-radius: 10px;
    /* background-image: url(./airplane-day.jpg);
  background-size: 100%; */
    /* &:hover {
    background-image: url(./airplane-night.jpg);
  } */
    div {
        width: 100%;
        color: white;
        font-weight: bold;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 0.9rem;
        @media all and (min-width: 960px) {
            font-size: 1rem;
        }
    }
    @media all and (min-width: 768px) {
        /* display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
        display: block;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`;

/**
 * (메모는 나의 플래너 정보 페이지에서만 보임)
 * 1. 메모 생성 버튼 => editItem이 생성됨.
 * 2. editItem 입력 후 확인 버튼 => editItem 자리에 postItem이 생성됨.
 * 3. postItem의 edit버튼 => postItem 자리에 editItem이 생성되고 나머진 2와 동일.
 * 4. postItem의 max버튼 => postItem의 text만큼 높이가 변경됨.
 */
const InfoPostList = ({ memos, memo, onCreateMemo, onUpdateMemo, onDeleteMemo, onChangeMemoTitle, onChangeMemoContent }) => {
    // const Total = [1, 2, 3, 4];
    const [isChange, setIsChange] = useState(false);
    const adRef = useRef();

    const onChangeTrue = () => {
        setIsChange(true);
    };
    const onChangeFalse = () => {
        setIsChange(false);
    };

    const [isShadow, setIsShadow] = useState(false);
    const listRef = useRef();

    const handleShadow = () => {
        if (listRef.current.scrollTop === 0) {
            setIsShadow(false);
        } else {
            setIsShadow(true);
        }
    };

    useEffect(() => {
        let refAd = adRef.current;
        let refList = listRef.current;

        refAd.addEventListener('mouseover', onChangeTrue);
        refAd.addEventListener('mouseout', onChangeFalse);
        refList.addEventListener('scroll', handleShadow);

        return () => {
            refAd.removeEventListener('mouseover', onChangeTrue);
            refAd.removeEventListener('mouseout', onChangeFalse);
            refList.removeEventListener('scroll', handleShadow);
        };
    });

    return (
        <InfoPostListBlock>
            <Container>
                <PostListBlock>
                    <PostListHeader isShadow={isShadow}>
                        <h3>Memo</h3>
                        <Button>ADD</Button>
                    </PostListHeader>
                    <PostList ref={listRef}>
                        <InfoPostItem memo={memo} onCreateMemo={onCreateMemo} onUpdateMemo={onUpdateMemo} onDeleteMemo={onDeleteMemo} onChangeMemoTitle={onChangeMemoTitle} onChangeMemoContent={onChangeMemoContent} />
                        {/* {Total.map((i) => {
                            return <InfoPostItem index={i} key={i} />;
                        })} */}
                    </PostList>
                </PostListBlock>
                {!isChange ? (
                    <Ad ref={adRef}>
                        {/* <Img src={airplaneDay} alt="airplane-day" /> */}
                        <div>
                            바쁜 일정 중에 잊는 것들이 있을 수가 있어요. <br />
                            여행에 필요한 정보들을 기록해 보세요.
                        </div>
                    </Ad>
                ) : (
                    <Ad ref={adRef}>
                        {/* <Img src={airplaneNight} alt="airplane-night" /> */}
                        <div>한국다봄을 앱에서도 사용해 보세요.</div>
                    </Ad>
                )}
            </Container>
        </InfoPostListBlock>
    );
};

export default InfoPostList;
