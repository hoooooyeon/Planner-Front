import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
    width: 60rem;
    height: 35rem;
    display: flex;
`;

const Img = styled.img`
    width: 30rem;
    height: 35rem;
    border-radius: 10px 0 0 10px;
`;

const Title = styled.div`
    width: 30rem;
    height: 5rem;
    text-align: center;
    font-size: 1.5rem;
    line-height: 5rem;
    font-weight: bold;
`;
const Detail = styled.div`
    /* width: 28rem; */
    height: 28rem;
    padding: 0 1.5rem 1rem 1.5rem;
    overflow: auto;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    width: 2rem;
    height: 2rem;
    position: absolute;
    left: 925px;
    top: 5px;
    &:hover {
        cursor: pointer;
    }
`;
const SpotModal = ({ detail, onErrorImg, onloadDetailSpot }) => {
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
        <Background onClick={onloadDetailSpot}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <Img src={firstimage} alt={title} onError={onErrorImg} />
                <div>
                    <StyledFontAwesomeIcon icon={faXmark} onClick={onloadDetailSpot} />
                    <Title>{title}</Title>
                    <Detail>{overview}</Detail>
                </div>
            </ModalContainer>
        </Background>
    );
};

export default SpotModal;
