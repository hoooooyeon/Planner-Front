import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from '../../common/Slider';

const MyPlannerListBlock = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px 0;
    background-color: #f5f5f5;
    /* background-color: #f1eee0; */
`;

const Container = styled.div`
    padding: 0 15px;
    margin: 0 auto;
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

const HiddenBox = styled.div`
    overflow: hidden;
    z-index: 1;
`;

const Planners = styled.ul`
    display: flex;
    padding: 10px 0;
    width: 100%;
    height: 100%;
`;

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
`;

const Button = styled.button`
    width: 7rem;
    height: 3rem;
    background-color: #9aad67;
    border: none;
    border-radius: 0.5rem;
    font-weight: bolder;
    font-size: 0.9rem;
    text-align: center;
    line-height: 3rem;
    a {
        color: white;
        text-decoration: none;
        display: block;
    }
`;
const PlannerItem = styled.li`
    width: 100%;
    height: 100%;
    flex-basis: 22.5%;
    flex-shrink: 0;
    margin-left: 0.5%;
    background-color: white;
    border: 1px solid ivory;
    border-radius: 0.5rem;
    box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%);
    &:hover {
        cursor: pointer;
        box-shadow: 3px 4px 14px 2px rgb(0, 0, 0, 30%);
        transform: translateY(-5px);
    }
`;
const InfoBox = styled.div`
    height: 60px;
    margin: 0;
    padding: 3px;
    border-top: 1px solid lightgray;
    overflow: hidden;
`;
const Name = styled.p`
    margin: 0 0 8px 0;
    font-size: 0.7rem;
    @media all and (min-width: 768px) {
        font-size: 0.8rem;
    }
    @media all and (min-width: 960px) {
        font-size: 0.9rem;
    }
`;
const Date = styled.p`
    margin: 0;
    font-size: 0.4rem;
    color: gray;
    @media all and (min-width: 768px) {
        font-size: 0.6rem;
    }
    @media all and (min-width: 960px) {
        font-size: 0.7rem;
    }
`;

const SimpleMap = styled.div`
    height: 14vw;
    @media all and (min-width: 768px) {
        height: 120px;
    }
    @media all and (min-width: 960px) {
        height: 160px;
    }
    @media all and (min-width: 1280px) {
        height: 190px;
    }
`;

const MyPlannerList = ({ myPlanners, onResetPlannerInfoForm, onCreatePlanner, onChangeCurPlannerId }) => {
    // const hiddenBoxRef = useRef();
    // const plannersRef = useRef();

    // let isSlide = false; // 슬라이더 이벤트 실행 조건
    // let startX = 0; // 마우스 클릭한 x 좌표
    // let currentX = 0; // 마우스 이동한 x 좌표
    // const moveX = useRef(0); // 현재 x 좌표 + 마우스 이동할 x 좌표
    // const sliderX = useRef(0); // 슬라이더 x 좌표

    // const TOTAL_SLIDE = 8;

    // const pDrag = useRef(false);

    // // 슬라이드 마우스 다운
    // const sliderStart = (e) => {
    //     startX = e.clientX;
    //     isSlide = true;
    //     pDrag.current = false;
    // };

    // // 슬라이드 마우스 이동
    // const sliderMove = (e) => {
    //     if (isSlide) {
    //         currentX = e.clientX;
    //         moveX.current = sliderX.current + currentX - startX;

    //         plannersRef.current.style.transform = ' translateX(' + moveX.current + 'px)';
    //         plannersRef.current.style.transitionDuration = ' 0s';

    //         if (!pDrag.current) {
    //             pDrag.current = true;
    //         }
    //         //   if (sDrag.current) {
    //         //     sDrag.current = false;
    //         //     return;
    //         // }
    //     }
    // };

    // // 슬라이드 마우스 업
    // const sliderEnd = (e) => {
    //     let itemSize = plannersRef.current.scrollWidth / TOTAL_SLIDE;
    //     sliderX.current = Math.round(moveX.current / itemSize) * itemSize;

    //     if (sliderX.current > 0) {
    //         sliderX.current = 0;
    //     } else if (sliderX.current < hiddenBoxRef.current.clientWidth - plannersRef.current.scrollWidth) {
    //         sliderX.current = hiddenBoxRef.current.clientWidth - plannersRef.current.scrollWidth;
    //     }

    //     plannersRef.current.style.transform = 'translateX(' + sliderX.current + 'px)';
    //     plannersRef.current.style.transitionDuration = ' 1s';
    //     isSlide = false;
    // };

    // // 너비 변경시 슬라이더 조절
    // const sliderResize = () => {
    //     if (sliderX.current > 0) {
    //         sliderX.current = 0;
    //     } else if (sliderX.current < plannersRef.current.clientWidth - plannersRef.current.scrollWidth) {
    //         sliderX.current = hiddenBoxRef.current.clientWidth - plannersRef.current.scrollWidth;
    //     }

    //     plannersRef.current.style.transform = 'translateX(' + sliderX.current + 'px)';
    //     plannersRef.current.style.transitionDuration = '0s';
    // };

    // useEffect(() => {
    //     let refValue = plannersRef.current;
    //     refValue.addEventListener('mousedown', sliderStart);
    //     window.addEventListener('mousemove', sliderMove);
    //     window.addEventListener('mouseup', sliderEnd);
    //     window.addEventListener('resize', sliderResize);

    //     return () => {
    //         refValue.removeEventListener('mousedown', sliderStart);
    //         window.removeEventListener('mousemove', sliderMove);
    //         window.removeEventListener('mouseup', sliderEnd);
    //         window.removeEventListener('resize', sliderResize);
    //     };
    // });

    return (
        <MyPlannerListBlock>
            <Container>
                <TitleBox>
                    <Title>나의 플래너</Title>
                    <Button>
                        <Link to="/PlannerEdit" onClick={onCreatePlanner}>
                            플래너 생성
                        </Link>
                    </Button>
                </TitleBox>
                <Slider list={myPlanners} scroll={false}>
                    {/* <HiddenBox ref={hiddenBoxRef}>
                    <Planners ref={plannersRef}> */}
                    {myPlanners &&
                        myPlanners.map((p) => (
                            <PlannerItem
                                key={p.plannerId}
                                onClick={() => {
                                    // onLoadPlanner(p.plannerId);
                                    onChangeCurPlannerId(p.plannerId);
                                }}
                            >
                                <Link to="/PlannerInfo">
                                    <SimpleMap />
                                    <InfoBox>
                                        <Name>{p.title}</Name>
                                        <Date>
                                            {p.planDateStart} ~ {p.planDateEnd}
                                        </Date>
                                    </InfoBox>
                                </Link>
                            </PlannerItem>
                        ))}
                    {/* </Planners>
                </HiddenBox> */}
                </Slider>
            </Container>
        </MyPlannerListBlock>
    );
};

export default MyPlannerList;
