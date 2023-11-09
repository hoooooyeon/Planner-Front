import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faMagnifyingGlass, faTemperature0 } from '@fortawesome/free-solid-svg-icons';
import Select from '../common/Select';
import { useState } from 'react';
import tempImage from '../../images/temp.jpg';
import Button from '../common/Button';
import { Link, NavLink } from 'react-router-dom';
import Pagination from '../common/Pagination.jsx';
import Loading from '../common/Loading';
import ReviewList from './ReviewList';

const MainContainer = styled.div`
    /* min-width: 768px; */
    display: flex;
    flex-direction: column;
    /* border-radius: 6px; */
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    /* box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor}; */
    padding: 20px 40px;
`;

const MainHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    border-radius: 6px;
`;

const HeaderItem = styled.div`
    display: flex;
`;

const RightItem = styled(HeaderItem)``;

const CenterItem = styled(HeaderItem)`
    margin-right: auto;
    margin-left: auto;
    align-items: center;
`;

const LeftItem = styled.div`
    /* margin-left: auto;
    margin-right: 20px; */
    margin: 0px 20px 0px 0px;
`;

const SearchBox = styled.div`
    display: flex;
`;

const SearchInputText = styled.input`
    width: 260px;
    padding: 8px;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    outline: none;
    border: none;
    border-radius: 6px 0px 0px 6px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
`;

const SearchIcon = styled.div`
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    color: ${(props) => props.theme.primaryColor};
    padding: 0px 10px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    border-radius: 0px 6px 6px 0px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const areaCodes = [
    { id: '0', value: '전체' },
    { id: '1', value: '서울' },
    { id: '2', value: '인천' },
    { id: '3', value: '대전' },
    { id: '4', value: '대구' },
    { id: '5', value: '광주' },
    { id: '6', value: '부산' },
    { id: '7', value: '울산' },
    { id: '8', value: '세종특별자치시' },
    { id: '31', value: '경기도' },
    { id: '32', value: '강원도' },
    { id: '33', value: '충청북도' },
    { id: '34', value: '충청남도' },
    { id: '35', value: '경상북도' },
    { id: '36', value: '경상남도' },
    { id: '37', value: '전라북도' },
    { id: '38', value: '전라남도' },
    { id: '39', value: '제주도' },
];

const ReviewListView = ({
    loading,
    reviewList,
    uiState,
    onSelectAreaCode,
    onSelectSortCriteria,
    onChangeKeyword,
    onSearchClick,
    onReviewWriteClick,
    onItemClick,
    page,
    totalCount,
    pageSize,
    onPageChange,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
}) => {
    const { areaCode, sortCriteria, keyword, pageNum } = uiState;
    const list = (reviewList && reviewList.list) || null;

    return (
        <MainContainer>
            <MainHeader>
                <CenterItem>
                    <div>여행지</div>
                    <Select value={areaCode} options={areaCodes} onChange={onSelectAreaCode} />
                    <SearchBox>
                        <SearchInputText type="text" onChange={onChangeKeyword} value={keyword}></SearchInputText>
                        <SearchIcon onClick={onSearchClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                        </SearchIcon>
                    </SearchBox>
                </CenterItem>
                <LeftItem>
                    <Button middle onClick={onReviewWriteClick}>
                        글 작성하기
                    </Button>
                </LeftItem>
            </MainHeader>
            <ReviewList loading={loading} list={list} onItemClick={onItemClick} />
            <Pagination
                page={page}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={onPageChange}
                onNextPage={onNextPage}
                onPreviousPage={onPreviousPage}
                onFirstPage={onFirstPage}
                onLastPage={onLastPage}
            />
        </MainContainer>
    );
};

export default ReviewListView;
