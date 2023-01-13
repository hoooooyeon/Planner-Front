import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import defaultImg from '../../lib/images/defaultImg.jpg';

const Background = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 40px;
`;

const ModalContainer = styled.div`
    z-index: 99;
    border-radius: 10px;
    background-color: white;
    width: calc(100% - 40px);
    margin: 0 auto;
    max-width: 1100px;
    /* height: 60%; */
    display: flex;
    padding: 20px;
`;

const Img = styled.img`
    width: 420px;
    height: 100%;
    border-radius: 10px;
    @media all and (max-width: 960px) {
        display: none;
    }
`;

const Info = styled.div`
    padding: 3rem;
    position: relative;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;
const Detail = styled.div`
    width: 100%;
    height: 20rem;
    overflow: auto;
    margin-top: 30px;
`;
const CloseButton = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 95%;
    top: 1%;
    &:hover {
        cursor: pointer;
    }
`;

const LikeBox = styled.div`
    background-color: lightgray;
    color: white;
    border-radius: 5px;
    padding: 10px;
    display: inline-block;
    height: 1rem;
    position: absolute;
    left: 85%;
    top: 10%;
    ${(props) =>
        props.like &&
        css`
            background-color: lightblue;
            color: yellow;
        `}

    &:hover {
        cursor: pointer;
    }
    div {
        float: right;
        margin-left: 5px;
    }
`;

const SpotDetailModal = ({ detail, onUnloadDetailSpot, onToggleLikeSpot }) => {
    const { title, firstimage, overview, contentid, likeCount, like } = detail.info;

    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };
    // 모달 외부 스크롤 고정
    useEffect(() => {
        document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY) * -1);
        };
    }, []);

    return (
        <>
            {detail && (
                <Background onClick={onUnloadDetailSpot}>
                    <ModalContainer onClick={(e) => e.stopPropagation()}>
                        <Img src={firstimage} alt={title} onError={onChangeErrorImg} />
                        <Info>
                            <CloseButton icon={faXmark} onClick={onUnloadDetailSpot} />
                            <Title>{title}</Title>
                            <LikeBox
                                like={like}
                                onClick={() => {
                                    onToggleLikeSpot(contentid);
                                }}
                            >
                                <FontAwesomeIcon icon={faStar} />
                                <div>{likeCount}</div>
                            </LikeBox>
                            <Detail>{overview}</Detail>
                        </Info>
                    </ModalContainer>
                </Background>
            )}
        </>
    );
};

export default SpotDetailModal;
