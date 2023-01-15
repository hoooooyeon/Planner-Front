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
    display: flex;
    align-items: center;
`;

const ModalContainer = styled.div`
    z-index: 99;
    border-radius: 10px;
    background-color: white;
    width: calc(100% - 40px);
    margin: 0 auto;
    max-width: 1100px;
    height: 26rem;
    display: flex;
    padding: 20px;
    position: relative;
`;

const Img = styled.img`
    width: 27rem;
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

const InfoHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;
const Detail = styled.div`
    width: 100%;
    height: 17rem;
    overflow: auto;
    margin-top: 30px;
`;
const CloseButton = styled.div`
    font-size: 1.5rem;
    position: absolute;
    right: 0;
    top: 0;
    &:hover {
        cursor: pointer;
    }
`;

const LikeBox = styled.div`
    background-color: lightgray;
    color: white;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    align-items: center;
    height: 1rem;
    cursor: pointer;
    ${(props) =>
        props.like &&
        css`
            background-color: #f1eee0;
            color: #ef9a9a;
        `}

    &:hover {
        background-color: #f1eee0;
        color: #9aad67;
    }
    div {
        margin-left: 5px;
    }
`;

const SpotDetailModal = ({ detail, onUnloadDetailSpot, onToggleSpotLike }) => {
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
                            <CloseButton>
                                <FontAwesomeIcon icon={faXmark} onClick={onUnloadDetailSpot} />
                            </CloseButton>
                            <InfoHeader>
                                <Title>{title}</Title>
                                <LikeBox
                                    like={like}
                                    onClick={() => {
                                        onToggleSpotLike(contentid);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                    <div>{likeCount}</div>
                                </LikeBox>
                            </InfoHeader>
                            <Detail>{overview}</Detail>
                        </Info>
                    </ModalContainer>
                </Background>
            )}
        </>
    );
};

export default SpotDetailModal;
