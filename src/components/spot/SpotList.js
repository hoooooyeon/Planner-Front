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
    margin: 0 auto;
    @media all and (min-width: 620px) {
        max-width: 980px;
        min-width: 580px;
        /* padding: 0 20px; */
    }
    @media all and (min-width: 1025px) {
        max-width: 1112px;
        min-width: 960px;
        padding: 0;
    }
`;

const MenuTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 20px;
`;

const MenuBox = styled.div`
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    /* border: 1px solid blue; */
`;

const Menu = styled.ul`
    border: 1px solid red;
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
`;

const List = styled.ul`
    margin: 0 auto;
    width: 840px;
    height: 100%;
    z-index: 2;
    border: 1px solid green;
    @media all and (min-width: 620px) {
        width: 100%;
    }
`;

const SpotList = ({ areas, spots, spotError, detail, currentInfo, onFirstSpotsPage, onUnloadDetailSpot, onToggleLikeSpot, onOpenDetail }) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    const menuRef = useRef();
    const menuBoxRef = useRef();

    let currentPosition = 0; // 이전에 이동한 좌표
    let slideStatus = false; // mouseMove 실행 조건
    let slideStartX = 0; // mousedown: 마우스 다운된 좌표
    let slideMoving = 0; // mousemove: 이전 좌표 + 현재 마우스가 이동한 좌표
    let slideGap = 0; // mousemove - mousedown 좌표
    const TOTAL_SLIDES = 6;

    /**
     * 메뉴 캡쳐링 막기
     * 슬라이드 구현
     * 여행지만 리로드되게
     * 슬라이드박스 레이아웃
     * 여행지박스 가운데 정렬
     */

    // 슬라이드 마우스 다운
    const slideStart = (e) => {
        e.stopPropagation();
        slideStartX = e.clientX;
        slideStatus = true;
    };

    // 슬라이드 마우스 이동
    const slideMove = (e) => {
        e.stopPropagation();
        if (slideStatus) {
            slideGap = e.clientX - slideStartX;
            slideMoving = currentPosition + e.clientX - slideStartX;

            menuRef.current.style = 'transform: translateX(' + slideMoving + 'px)';
            menuRef.current.style.transitionDuration = ' 0s';
        }
    };

    // 슬라이드 마우스 업
    const slideEnd = (e) => {
        e.stopPropagation();
        // let itemMargin = plannersRef.current.offsetWidth * 0.005;
        let itemSize = menuRef.current.offsetWidth;
        let menuBoxSize = menuBoxRef.current.offsetWidth;
        // let slideEndX = slideGap + currentPosition; // 최종 이동할 좌표
        let slideEndX = slideMoving;

        if (slideEndX > 0) {
            slideEndX = 0;
        } else if (slideEndX < -menuBoxSize) {
            slideEndX = -menuBoxSize;
        }

        menuRef.current.style = 'transform: translateX(' + slideEndX + 'px)';
        menuRef.current.style.transitionDuration = ' 1s';
        currentPosition = slideEndX;
        slideStatus = false;
    };

    useEffect(() => {
        if (areas) {
            let refValue = menuRef.current;
            refValue.addEventListener('mousedown', slideStart);
            window.addEventListener('mousemove', slideMove);
            window.addEventListener('mouseup', slideEnd);

            return () => {
                refValue.removeEventListener('mousedown', slideStart);
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
                <MenuBox ref={menuBoxRef}>
                    {areas && (
                        <Menu ref={menuRef}>
                            {areas.map((area) => (
                                <li key={area.code} onClick={() => onFirstSpotsPage(area.code)} aria-current={areaNum === area.code ? 'page' : null}>
                                    {area.name}
                                </li>
                            ))}
                        </Menu>
                    )}
                </MenuBox>
                {spots && (
                    <HiddenBox>
                        {/* <Container> */}
                        <List>
                            {spots.list.map((spot) => (
                                <SpotItem spot={spot} key={spot.info.contentid} onChangeErrorImg={onChangeErrorImg} onOpenDetail={onOpenDetail} />
                            ))}
                        </List>
                        {/* </Container> */}
                    </HiddenBox>
                )}
                {detail && <SpotDetailModal detail={detail} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onToggleLikeSpot={onToggleLikeSpot} />}
            </Container>
        </SpotListBlock>
    );
};

export default SpotList;
