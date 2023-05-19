import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Pagination from '../../common/Pagination';
import Slider from '../../common/Slider';

const ShareListBlock = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 50px;
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;

    @media all and (min-width: 768px) {
        width: calc(100% - 40px);
        padding: 0 20px;
    }
    @media all and (min-width: 960px) {
        width: 930px;
        padding: 0;
    }
    @media all and (min-width: 1280px) {
        width: 1024px;
        padding: 0;
    }
`;

const HiddenBox = styled.div`
    margin: 0 auto;
    overflow: hidden;
    z-index: 1;
    /* width: calc(100% - 40px);
  padding: 0 20px; */
`;

const Shares = styled.ul`
    width: 750px;
    height: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: inline-block;
    /* padding: 0 20px 0 0; */

    @media all and (min-width: 768px) {
        width: 100%;
        padding: 0;
    }
`;

const TitleBox = styled.div`
    font-size: 1.3rem;
    margin-left: 20px;
    font-weight: bolder;

    @media all and (min-width: 768px) {
        margin-left: 0;
    }
`;

const ShareItem = styled.li`
    flex-shrink: 0;
    width: 180px;
    float: left;
    box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%);
    border-radius: 0.5rem;
    margin: 0.5%;
    @media all and (min-width: 768px) {
        width: 24%;
    }
    &:hover {
        cursor: pointer;
        box-shadow: 3px 4px 14px 2px rgb(0, 0, 0, 30%);
        transform: translateY(-3px);
    }
    a {
        /* user-select: none; */
        color: black;
        -webkit-user-drag: none;
        pointer-events: auto;
        /* pointer-events: none; */

        ${(props) =>
            props.drag &&
            css`
                pointer-events: none;
                color: red;
            `}
    }
`;
const InfoBox = styled.div`
    user-select: none;
    height: 60px;
    margin: 0;
    padding: 3px;
    border-top: 1px solid lightgray;
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
    width: 100%;
    height: 120px;
    border: none;
    margin: auto;
    @media all and (min-width: 960px) {
        height: 160px;
    }
    @media all and (min-width: 1280px) {
        height: 190px;
    }
`;

const ScrollBox = styled.div`
    width: calc(100% - 40px);
    height: 4px;
    margin-top: 5px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightgray;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    @media all and (min-width: 768px) {
        display: none;
    }
`;

const Scroll = styled.div`
    width: 50%;
    height: 100%;
    background-color: gray;
`;

const ShareList = ({ sharePlanners, plannerError, onLoadPlanner, onChangeCurPlannerId }) => {
    // const hiddenBoxRef = useRef();
    // const listRef = useRef();
    // const itemRef = useRef();

    // let isSlide = false; // 슬라이더 이벤트 실행 조건
    // let startX = 0; // 마우스 클릭한 x 좌표
    // let currentX = 0; // 마우스 이동한 x 좌표
    // const moveX = useRef(0);
    // const sliderX = useRef(0);

    // const TOTAL_SLIDE = 4;

    // const scrollBoxRef = useRef();
    // const scrollRef = useRef();
    // let scrollMoveX = 0;

    // const drag = useRef(false);
    // // 슬라이드 마우스 다운
    // const sliderStart = (e) => {
    //     startX = e.clientX;
    //     currentX = 0;
    //     isSlide = true;
    //     drag.current = false;
    //     console.log('1' + drag.current);
    // };

    // // 슬라이드 마우스 이동
    // const sliderMove = (e) => {
    //     if (isSlide) {
    //         currentX = e.clientX;
    //         moveX.current = sliderX.current + currentX - startX;

    //         listRef.current.style.transform = 'translateX(' + moveX.current + 'px)';
    //         listRef.current.style.transitionDuration = '0ms';

    //         scrollMoveX = -((moveX.current / -(hiddenBoxRef.current.clientWidth - listRef.current.clientWidth)) * 100);

    //         if (scrollMoveX < 0) {
    //             scrollMoveX = 0;
    //         } else if (scrollMoveX > 100) {
    //             scrollMoveX = 100;
    //         }
    //         scrollBoxRef.current.style.opacity = 1;
    //         scrollBoxRef.current.style.transitionDuration = '400ms';

    //         scrollRef.current.style.transform = 'translateX(' + scrollMoveX + '%)';
    //         scrollRef.current.style.transitionDuration = '0ms';

    //         // if (currentX === 0) {
    //         //     // itemRef.current.style.pointerEvents = 'auto';
    //         //     // itemRef.current.style.color = 'black';
    //         //     drag.current = false;
    //         // } else {
    //         //     // itemRef.current.style.pointerEvents = 'none';
    //         //     // itemRef.current.style.color = 'red';
    //         //     drag.current = true;
    //         // }

    //         if (!drag.current) {
    //             drag.current = true;

    //             console.log('2' + drag.current);
    //         }
    //     }
    // };

    // // 슬라이드 마우스 업
    // const sliderEnd = (e) => {
    //     let itemSize = listRef.current.scrollWidth / TOTAL_SLIDE;
    //     sliderX.current = Math.round(moveX.current / itemSize) * itemSize;

    //     if (sliderX.current > 0) {
    //         sliderX.current = 0;
    //     } else if (sliderX.current < hiddenBoxRef.current.clientWidth - listRef.current.clientWidth) {
    //         sliderX.current = hiddenBoxRef.current.clientWidth - listRef.current.clientWidth;
    //     }
    //     listRef.current.style.transform = 'translateX(' + sliderX.current + 'px)';
    //     listRef.current.style.transitionDuration = ' 1000ms';
    //     scrollBoxRef.current.style.opacity = 0;
    //     scrollBoxRef.current.style.transitionDuration = '2000ms';

    //     isSlide = false;
    //     console.log('3' + drag.current);
    // };

    // // 너비 변경시 슬라이더 조절
    // const sliderResize = () => {
    //     if (sliderX.current > 0) {
    //         sliderX.current = 0;
    //     } else if (sliderX.current < listRef.current.clientWidth - listRef.current.scrollWidth) {
    //         sliderX.current = hiddenBoxRef.current.clientWidth - listRef.current.scrollWidth;
    //     }
    //     listRef.current.style.transform = 'translateX(' + sliderX.current + 'px)';
    //     listRef.current.style.transitionDuration = '0ms';
    // };

    // useEffect(() => {
    //     if (sharePlanners) {
    //         let refValue = listRef.current;
    //         refValue.addEventListener('mousedown', sliderStart);
    //         window.addEventListener('mousemove', sliderMove);
    //         window.addEventListener('mouseup', sliderEnd);
    //         window.addEventListener('resize', sliderResize);

    //         return () => {
    //             refValue.removeEventListener('mousedown', sliderStart);
    //             window.removeEventListener('mousemove', sliderMove);
    //             window.removeEventListener('mouseup', sliderEnd);
    //             window.removeEventListener('resize', sliderResize);
    //         };
    //     }
    // });

    // 드래그시 페이지 전환 막기
    const history = useHistory();
    const transition = useRef(false);
    const allowTransition = () => {
        if (transition.current) {
            history.push('/PlannerInfo');
        }
    };

    if (!sharePlanners) {
        return <div>Loading...</div>;
    }
    return (
        <ShareListBlock>
            <Container>
                <TitleBox>
                    <p>다른 이용자들의 플래너</p>
                </TitleBox>
                <Slider list={sharePlanners} scroll={true} transition={transition}>
                    {/* <HiddenBox ref={hiddenBoxRef}>
                    <Shares ref={listRef}> */}
                    {sharePlanners.list &&
                        sharePlanners.list.map((p) => (
                            // sharePlanners.slice(block, block + limit).map((p) => (
                            <ShareItem
                                key={p.plannerId}
                                // drag={drag.current}
                                onClick={() => {
                                    // onLoadPlanner(p.plannerId);
                                    onChangeCurPlannerId(p.plannerId);
                                    allowTransition();
                                }}
                            >
                                {/* <Link to="/PlannerInfo"> */}
                                <SimpleMap />
                                <InfoBox>
                                    <Name>{p.title}</Name>
                                    <Date>
                                        {p.planDateStart} ~ {p.planDateEnd}
                                        {/* {new Date(planner.planDateStart).format('YYYY-MM-DD')} ~ {planner.planDateEnd} */}
                                    </Date>
                                </InfoBox>
                                {/* </Link> */}
                            </ShareItem>
                        ))}
                    {/* </Shares>
                </HiddenBox> */}
                    {/* <ScrollBox ref={scrollBoxRef}>
                    <Scroll ref={scrollRef} />
                </ScrollBox> */}
                </Slider>
            </Container>
        </ShareListBlock>
    );
};

export default ShareList;
