import styled, { css } from 'styled-components';
import { LikeList, PlannerList, SpotList } from './LikeList';
import { useState } from 'react';
import ListSearchBar from './ListSearchBar';
import { useEffect } from 'react';
import Pagination from '../../common/Pagination.jsx';
import { useCallback } from 'react';
import { faCalendarDays, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleDot } from '../../../../node_modules/@fortawesome/free-regular-svg-icons/index';

const Container = styled.div`
    display: flex;
    padding: 0.625rem 0.625rem;
`;

const LikeListBlock = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-grow: 1;

    @media screen and (max-width: 480px) {
        flex-direction: column;
        /* justify-content: center; */
    }
`;

const SideBlock = styled.nav`
    border-right: solid 2px silver;
    padding-right: 0.625rem;

    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: row;
        justify-content: center;
        border-right: none;
        padding-right: 0rem;
    }
`;

const SideListItem = styled.div`
    width: 5.75rem;
    height: 3rem;
    line-height: 48px;
    border-radius: 6px;
    text-align: center;
    margin-top: 0.625rem;

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
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const ListOptions = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: left;
    margin: 0.5rem 2rem;

    span {
        margin: 0.3125rem;
    }

    @media screen and (max-width: 480px) {
        margin: 0.5rem 0rem;
    }
`;

const sortOption = [
    { id: 1, value: '인기순' },
    { id: 2, value: '최신순' },
];

const menu = [
    { id: 1, title: '플래너', value: 'likePlannerList', icon: faCalendarDays },
    { id: 2, title: '여행지', value: 'likeSpotList', icon: faFlag },
];

const LikeListView = ({ loading, likeLists, onLikeListLoad, onLikePlannerClick, onLikeSpotClick }) => {
    const [selectIndex, setSelectIndex] = useState(1);
    const [sortValue, setSortValue] = useState(2);
    const [searchText, setSearchText] = useState('');
    const [pageNum, setPageNum] = useState(1);

    const likeList = likeLists[menu[selectIndex - 1].value] || {};
    const list = likeList.list || null;
    const totalCount = likeList.totalCount || 0;

    const handleSideItemClick = (index) => {
        setSelectIndex(index);
    };

    const handleSortSelectChange = (id) => {
        setSortValue(id);
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
            sortCriteria: sortValue,
            itemCount: 10,
            keyword: searchText,
            postType: menu[selectIndex - 1].id,
            pageNum,
        };
        onLikeListLoad(queryString);
    }, [pageNum, selectIndex, sortValue]);

    return (
        <Container>
            <LikeListBlock>
                <SideBlock>
                    {menu.map((item) => (
                        <SideListItem
                            key={item.id}
                            active={selectIndex == item.id}
                            onClick={() => handleSideItemClick(item.id)}
                        >
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.title}</span>
                        </SideListItem>
                    ))}
                </SideBlock>
                <ListBlock>
                    <ListSearchBar searchText={searchText} onSearchTextChange={handleSearchTextChange} />
                    <ListOptions>
                        {sortOption.map((item) => (
                            <span key={item.id} onClick={() => handleSortSelectChange(item.id)}>
                                <FontAwesomeIcon icon={sortValue == item.id ? faCircleDot : faCircle} />
                                {item.value}
                            </span>
                        ))}
                    </ListOptions>
                    <LikeList
                        selectIndex={selectIndex}
                        loading={selectIndex == 1 ? loading.likePlannerListLoading : loading.likeSpotListLoading}
                        list={list}
                        onLikePlannerClick={onLikePlannerClick}
                        onLikeSpotClick={onLikeSpotClick}
                    ></LikeList>
                    <Pagination
                        page={pageNum}
                        totalCount={totalCount}
                        pageSize={10}
                        itemCount={10}
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
