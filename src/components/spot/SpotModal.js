import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const Background = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    border-radius: 10px;
    background-color: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 70rem;
    height: 30rem;
    display: flex;
`;

const Img = styled.img`
    width: 30rem;
    height: 30rem;
    border-radius: 10px 0 0 10px;
`;

const Info = styled.div`
    padding: 3rem;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;
const Detail = styled.div`
    height: 20rem;
    overflow: auto;
    margin-top: 30px;
`;
const CloseButton = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 1080px;
    top: 10px;
    &:hover {
        cursor: pointer;
    }
`;

const FavoritesBox = styled.div`
    background-color: lightgray;
    border-radius: 5px;
    color: white;
    padding: 10px;
    display: inline-block;
    height: 1rem;
    position: absolute;
    left: 1000px;
    top: 50px;
    &:hover {
        cursor: pointer;
    }
    div {
        float: right;
        margin-left: 5px;
    }
`;
// ${props => props && css`
//     background-color: lightblue;
//     color: yellow;
// `}

const SpotModal = ({ detail, onChangeErrorImg, onUnloadDetailSpot, onToggle }) => {
    const { title, firstimage, overview } = detail;
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
        <Background onClick={onUnloadDetailSpot}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Img src={firstimage} alt={title} onError={onChangeErrorImg} />
                <Info>
                    <CloseButton icon={faXmark} onClick={onUnloadDetailSpot} />
                    <Title>{title}</Title>
                    <FavoritesBox onClick={onToggle}>
                        <FontAwesomeIcon icon={faStar} />
                        <div>111</div>
                    </FavoritesBox>
                    <Detail>{overview}</Detail>
                </Info>
            </ModalContainer>
        </Background>
    );
};

export default SpotModal;
