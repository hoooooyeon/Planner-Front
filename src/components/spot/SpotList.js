import styled from 'styled-components';
import SpotItem from './SpotItem';
import SpotModal from './SpotModal';
import SpotPagination from './SpotPagination';
import { useEffect } from 'react';
import { useState } from 'react';

const SpotListBlock = styled.div`
    margin: 50px auto;
    height: auto;
`;

const MenuTitle = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
`;

const Menu = styled.ul`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    list-style: none;
    li {
        margin: 0 15px 5px 0;
        padding: 10px;
        border-radius: 2rem;
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
const List = styled.div`
    display: felx;
    flex-wrap: wrap;
`;

const SpotList = ({ areas, spots, detail, spotError, areaNum, pageNum, blockNum, onLoadSpots, onUpdateAreaNum, onUpdatePageNum, onUpdateBlockNum, onLoadDetailSpot, onUnloadDetailSpot, onToggle, onChangeErrorImg }) => {
    useEffect(() => {
        onUpdateAreaNum();
    }, [onUpdateAreaNum]);

    // const [fArr, setFArr] = useState();
    // useEffect(() => {
    //     if (spots) {
    //         setFArr(Array(spots.length).fill(false));
    //     }
    // }, [spots]);

    if (spotError) {
        return <SpotListBlock>에러가 발생했습니다.</SpotListBlock>;
    }
    return (
        <SpotListBlock>
            <MenuTitle>추천 여행지</MenuTitle>
            {areas && (
                <Menu>
                    {areas.map((area) => (
                        <li
                            key={area.code}
                            onClick={() => {
                                onUpdatePageNum(1);
                                onUpdateBlockNum(0);
                                onUpdateAreaNum(area.code);
                                onLoadSpots(area.code, 1);
                            }}
                            aria-current={areaNum === area.code ? 'page' : null}
                        >
                            {area.name}
                        </li>
                    ))}
                </Menu>
            )}
            {spots && (
                <>
                    <List>
                        {spots.map((spot, i) => (
                            <SpotItem spot={spot} key={spot.contentid} onChangeErrorImg={onChangeErrorImg} onLoadDetailSpot={onLoadDetailSpot} onToggle={onToggle} />
                        ))}
                        <SpotPagination totalCount={spots.totalCount} areaNum={areaNum} pageNum={pageNum} blockNum={blockNum} onLoadSpots={onLoadSpots} onUpdatePageNum={onUpdatePageNum} onUpdateBlockNum={onUpdateBlockNum} />
                    </List>
                </>
            )}
            {detail && detail.map((data) => <SpotModal detail={data} key={data.contentid} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onToggle={onToggle} />)}
        </SpotListBlock>
    );
};

export default SpotList;
