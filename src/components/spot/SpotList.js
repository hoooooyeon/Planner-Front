import styled from 'styled-components';
import SpotItem from './SpotItem';
import defaultImg from '../../lib/images/defaultImg.jpg';
import SpotDetailModal from './SpotDetailModal';
import { useEffect, useRef } from 'react';

const SpotListBlock = styled.div`
    width: 100%;
    height: 100%;
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
        width: 1250px;
        padding: 0;
    }
`;

const MenuTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 15px;
    @media all and (max-width: 768px) {
        margin-left: 15px;
    }
    @media all and (min-width: 768px) {
        margin-left: 20px;
    }
    @media all and (min-width: 1025px) {
        margin-left: 0;
    }
`;

const Menu = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 0;
    z-index: 1;

    li {
        white-space: nowrap;
        width: auto;
        margin: 0 15px 5px 0;
        padding: 10px 15px;
        border-radius: 2rem;
        background: #e6e6e6;
        user-select: none;
        &:hover {
            background: lightblue;
            cursor: pointer;
        }
        &[aria-current] {
            background: lightblue;
            font-weight: bold;
            cursor: rever;
        }
    }
`;
const HiddenBox = styled.div`
    margin: 0 auto;
    overflow: hidden;
    z-index: 1;
    @media all and (max-width: 768px) {
        margin-left: 15px;
    }
    @media all and (min-width: 768px) {
        width: calc(100% - 40px);
    }
    @media all and (min-width: 1025px) {
        width: 100%;
    }
`;

const List = styled.ul`
    width: 840px;
    height: 100%;
    margin: 0 auto;
    padding: 0;
    display: inline-block;
    @media all and (min-width: 768px) {
        width: 100%;
    }
`;

// const ListSlider = styled

const SpotList = ({ areas, spots, spotError, detail, currentInfo, onFirstSpotsPage, onUnloadDetailSpot, onToggleLikeSpot, onOpenDetail }) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    const menuRef = useRef();
    const menuBoxRef = useRef();
    const listRef = useRef();
    const listBoxRef = useRef();

    let currentPosition = 0; // 이전에 이동한 좌표
    // let slideStatus = false; // mouseMove 실행 조건
    let menuSlideStatus = false; // mouseMove 실행 조건
    let listSlideStatus = false; // mouseMove 실행 조건
    let slideStartX = 0; // mousedown: 마우스 다운된 좌표
    let slideMoving = 0; // mousemove: 이전 좌표 + 현재 마우스가 이동한 좌표
    let slideGap = 0; // mousemove - mousedown 좌표
    const TOTAL_SLIDES = 6;

    // 슬라이드 마우스 다운
    const slideStart = (e, slideStatus) => {
        slideStartX = e.clientX;
        slideStatus = true;
        console.log(menuSlideStatus);
        console.log(listSlideStatus);
    };

    // 슬라이드 마우스 이동
    const slideMove = (e, valueRef) => {
        if (menuSlideStatus || listSlideStatus) {
            slideMoving = currentPosition + e.clientX - slideStartX;

            valueRef.current.style = 'transform: translateX(' + slideMoving + 'px)';
            valueRef.current.style.transitionDuration = '0s';
        }
    };

    // 슬라이드 마우스 업
    const slideEnd = (valueRef, valueBoxRef) => {
        let itemBoxSize = valueBoxRef.current.getBoundingClientRect();
        let slideEndX = slideMoving;

        if (slideEndX > 0) {
            slideEndX = 0;
        } else if (slideEndX < itemBoxSize.width - valueRef.current.scrollWidth) {
            slideEndX = itemBoxSize.width - valueRef.current.scrollWidth;
        }

        valueRef.current.style = 'transform: translateX(' + slideEndX + 'px)';
        valueRef.current.style.transitionDuration = ' 1s';
        currentPosition = slideEndX;
        menuSlideStatus = false;
        listSlideStatus = false;
    };

    useEffect(() => {
        if (areas) {
            let curMenuBoxRef = menuBoxRef.current;

            curMenuBoxRef.addEventListener('mousedown', (e) => slideStart(e, menuSlideStatus));
            window.addEventListener('mousemove', (e) => slideMove(e, menuRef));
            window.addEventListener('mouseup', () => slideEnd(menuRef, menuBoxRef));

            return () => {
                curMenuBoxRef.removeEventListener('mousedown', slideStart);
                window.removeEventListener('mousemove', slideMove);
                window.removeEventListener('mouseup', slideEnd);
            };
        }
    });
    useEffect(() => {
        if (spots) {
            let curListBoxRef = listBoxRef.current;
            curListBoxRef.addEventListener('mousedown', (e) => slideStart(e, listSlideStatus));
            window.addEventListener('mousemove', (e) => slideMove(e, listRef));
            window.addEventListener('mouseup', () => slideEnd(listRef, listBoxRef));

            return () => {
                curListBoxRef.removeEventListener('mousedown', slideStart);
                window.removeEventListener('mousemove', slideMove);
                window.removeEventListener('mouseup', slideEnd);
            };
        }
    });

    if (spotError) {
        return <SpotListBlock>에러가 발생했습니다.</SpotListBlock>;
    }
    const { areaNum } = currentInfo;
    return (
        <SpotListBlock>
            <Container>
                <MenuTitle>추천 여행지</MenuTitle>
                <HiddenBox ref={menuBoxRef}>
                    {areas && (
                        <Menu ref={menuRef}>
                            {areas.map((area) => (
                                <li key={area.code} onClick={(e) => onFirstSpotsPage(e, area.code)} aria-current={areaNum === area.code ? 'page' : null}>
                                    {area.name}
                                </li>
                            ))}
                        </Menu>
                    )}
                </HiddenBox>
                {spots && (
                    <HiddenBox ref={listBoxRef}>
                        <List ref={listRef}>
                            {spots.list.map((spot) => (
                                <SpotItem spot={spot} key={spot.info.contentid} onChangeErrorImg={onChangeErrorImg} onOpenDetail={onOpenDetail} />
                            ))}
                        </List>
                    </HiddenBox>
                )}
                {detail && <SpotDetailModal detail={detail} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onToggleLikeSpot={onToggleLikeSpot} />}
            </Container>
        </SpotListBlock>
    );
};

export default SpotList;
