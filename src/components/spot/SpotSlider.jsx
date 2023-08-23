import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const SpotSliderBlock = styled.div`
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    margin: 0 auto;
    overflow: hidden;
    width: 100%;
    padding: 0;
`;

const SliderList = styled.ul`
    display: flex;
    width: calc(5 * 100%);
    transform: translateX(-20%);
    margin: 0;
    padding: 0;
`;

const SliderItem = styled.li`
    width: 100%;
    float: left;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    h2 {
        color: ${(props) => props.theme.primaryColor};
        position: absolute;
        top: 80%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    h3 {
        color: ${(props) => props.theme.primaryColor};
        position: absolute;
        top: 87%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    @media all and (max-width: 320px) {
        h2,
        h3 {
            display: none;
        }
    }
`;

const Img = styled.img`
    width: 100%;
    height: 500px;
    object-fit: cover;
`;

const SpotSlider = ({ sliderSpots }) => {
    const [currentIndex, setCurrentIndex] = useState(2);
    const listRef = useRef();

    // 무한 슬라이더
    useEffect(() => {
        if (sliderSpots) {
            const TOTAL_SLIDES = sliderSpots.length;
            if (currentIndex === 1) {
                setTimeout(() => {
                    listRef.current.style = 'transform: translateX(-' + 20 * (TOTAL_SLIDES - 2) + '%)';
                    listRef.current.style.transition = '0s';
                    setCurrentIndex(TOTAL_SLIDES - 1);
                }, 800);
            }
            if (currentIndex === TOTAL_SLIDES) {
                setTimeout(() => {
                    listRef.current.style = 'transform: translateX(-' + 20 + '%)';
                    listRef.current.style.transition = '0s';
                    setCurrentIndex(2);
                }, 800);
            }
            // 자동 슬라이더
            const timeoutId = setInterval(() => {
                if (currentIndex < TOTAL_SLIDES) {
                    setCurrentIndex((currentIndex) => currentIndex + 1);
                } else {
                    setCurrentIndex(1);
                }
            }, 2500);
            return () => clearInterval(timeoutId);
        }
    }, [currentIndex, sliderSpots]);

    // 슬라이더 스타일 변경
    useEffect(() => {
        listRef.current.style = 'transform: translateX(-' + 20 * (currentIndex - 1) + '%)';
        listRef.current.style.transition = 'all 0.5s ease-in-out';
    }, [currentIndex]);

    return (
        <SpotSliderBlock>
            <Container>
                <SliderList ref={listRef}>
                    {sliderSpots &&
                        sliderSpots.map((s, i) => (
                            <SliderItem key={i}>
                                <Img alt={s.title} src={s.image} />
                                <h2>{s.title}</h2>
                                <h3>{s.overview}</h3>
                            </SliderItem>
                        ))}
                </SliderList>
            </Container>
        </SpotSliderBlock>
    );
};

export default SpotSlider;
