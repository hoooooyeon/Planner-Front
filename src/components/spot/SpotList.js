import styled from 'styled-components';
import SpotItem from './SpotItem';
import defaultImg from '../../lib/images/defaultImg.jpg';
import SpotDetailModal from './SpotDetailModal';

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

const SpotList = ({ areas, spots, spotError, detail, currentInfo, onLoadDetailSpot, onFirstSpotsPage, onUnloadDetailSpot, onAddLikeSpot, onLikeToggle, onUpdateDetailLike }) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    if (spotError) {
        return <SpotListBlock>에러가 발생했습니다.</SpotListBlock>;
    }
    const { areaNum } = currentInfo;
    return (
        <SpotListBlock>
            <MenuTitle>추천 여행지</MenuTitle>
            {areas && (
                <Menu>
                    {areas.map((area) => (
                        <li key={area.code} onClick={() => onFirstSpotsPage(area.code)} aria-current={areaNum === area.code ? 'page' : null}>
                            {area.name}
                        </li>
                    ))}
                </Menu>
            )}
            {spots && (
                <List>
                    {spots.list.map((spot) => (
                        <SpotItem spot={spot} key={spot.info.contentid} onChangeErrorImg={onChangeErrorImg} onLoadDetailSpot={onLoadDetailSpot} onUpdateDetailLike={onUpdateDetailLike} />
                    ))}
                </List>
            )}
            {detail && <SpotDetailModal detail={detail} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onAddLikeSpot={onAddLikeSpot} onLikeToggle={onLikeToggle} />}
        </SpotListBlock>
    );
};

export default SpotList;
