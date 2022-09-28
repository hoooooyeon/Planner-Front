import styled from 'styled-components';
import SpotItem from './SpotItem';
import SpotModal from './SpotModal';
import SpotPagination from './SpotPagination';
import { useEffect, useState } from 'react';

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
    // const [page, setPage] = useState(1); // 현재 페이지
    // const [blockNum, setBlockNum] = useState(0); // 페이지네이션 구역 숫자로 지정. (0, 1, ...)
    // const [areaNum, setAreaNum] = useState();

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
                                onLoadSpots(area.code, 1);
                                onUpdatePageNum(1);
                                onUpdateBlockNum(0);
                                onUpdateAreaNum(area.code);
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
                        {spots.item.map((spot, i) => (
                            <SpotItem spot={spot} key={spot.contentid} onChangeErrorImg={onChangeErrorImg} onLoadDetailSpot={onLoadDetailSpot} onToggle={onToggle} />
                        ))}
                        <SpotPagination totalCount={spots.totalCount} areaCode={spots.item[0].areacode} pageNum={pageNum} blockNum={blockNum} onLoadSpots={onLoadSpots} />
                    </List>
                </>
            )}
            {detail && detail.map((data) => <SpotModal detail={data} key={data.contentid} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} />)}
        </SpotListBlock>
    );
};

export default SpotList;
