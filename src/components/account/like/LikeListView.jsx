import styled, { css } from 'styled-components';
import { PlannerList, SpotList } from './LikeList';
import { useState } from 'react';
import ListSearchBar from './ListSearchBar';
import { useEffect } from 'react';
import Pagination from '../../common/Pagination.jsx';
import { useCallback } from 'react';
import { faCalendarDays, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
    display: flex;
    padding: 10px 40px;
`;

const LikeListBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-grow: 1;
`;

const SideBlock = styled.nav`
    border-right: solid 2px silver;
    padding-right: 20px;
`;

const SideListItem = styled.div`
    width: 92px;
    height: 48px;
    line-height: 48px;
    border-radius: 6px;
    text-align: center;
    margin-top: 10px;

    ${(props) =>
        props.active &&
        css`
            color: ${(props) => props.theme.primaryColor};
            background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
        `}

    &:hover {
        color: ${(props) => props.theme.hoverColor};
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }

    svg {
        margin-right: 10px;
    }
`;

const ListBlock = styled.div`
    margin-left: 40px;
    /* width: 1160px; */
    min-height: 500px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const sortOption = [
    { id: 1, value: '인기순' },
    { id: 2, value: '최신순' },
];

const menu = [
    { id: 1, title: '플래너', value: 'likePlanner' },
    { id: 2, title: '여행지', value: 'likeSpot' },
];

const LikeListView = ({ loading, likeLists, onLikeListLoad }) => {
    const [selectIndex, setSelectIndex] = useState(0);
    const [sortValue, setSortValue] = useState(sortOption[0]);
    const [searchText, setSearchText] = useState('');
    const [pageNum, setPageNum] = useState(1);

    const likeList = likeLists[menu[selectIndex].value] || {};
    const list = likeList.list || null;
    const totalCount = likeList.totalCount || 0;

    const handleSideItemClick = (index) => {
        setSelectIndex(index);
    };

    const handleSortSelectChange = (option) => {
        setSortValue(option);
    };

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handlePageChange = (num) => {
        setPageNum(num);
    };

    const handlePreviousPage = () => {
        if (pageNum != 1) {
            setPageNum(pageNum - 1);
        }
    };

    const handleNextPage = () => {
        if (pageNum != totalCount) {
            setPageNum(pageNum + 1);
        }
    };

    useEffect(() => {
        const queryString = {
            sortCriteria: sortValue.id || 2,
            itemCount: 10,
            keyword: searchText,
            postType: menu[selectIndex].id,
            pageNum,
        };
        onLikeListLoad(queryString);
    }, [pageNum, selectIndex]);

    return (
        <Container>
            <LikeListBlock>
                <SideBlock>
                    <SideListItem active={selectIndex == 0} onClick={() => handleSideItemClick(0)}>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span>플래너</span>
                    </SideListItem>
                    <SideListItem active={selectIndex == 1} onClick={() => handleSideItemClick(1)}>
                        <FontAwesomeIcon icon={faFlag} />
                        <span>여행지</span>
                    </SideListItem>
                </SideBlock>
                <ListBlock>
                    <ListSearchBar
                        sortValue={sortValue}
                        sortOption={sortOption}
                        searchText={searchText}
                        onSortChange={handleSortSelectChange}
                        onSearchTextChange={handleSearchTextChange}
                    />
                    {selectIndex == 0 ? (
                        <PlannerList loading={loading.likePlannerListLoading} plannerList={list}></PlannerList>
                    ) : (
                        <SpotList loading={loading.likeSpotListLoading} spotList={list}></SpotList>
                    )}
                    <Pagination
                        page={pageNum}
                        totalCount={totalCount}
                        pageSize={10}
                        onPageChange={handlePageChange}
                        onPreviousPage={handlePreviousPage}
                        onNextPage={handleNextPage}
                    />
                </ListBlock>
            </LikeListBlock>
        </Container>
    );
};

export default LikeListView;
