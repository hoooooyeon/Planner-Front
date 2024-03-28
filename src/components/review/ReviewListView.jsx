import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import { faCircle, faCircleDot } from '../../../node_modules/@fortawesome/free-regular-svg-icons/index';
import Button from '../common/Button';
import Pagination from '../common/Pagination.jsx';
import Select from '../common/Select';
import ReviewList from './ReviewList';

const MainContainer = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const Container = styled.div`
    margin: 0px auto;
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.secondaryColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    padding: 1.25rem 5.625rem;

    @media screen and (max-width: 768px) {
        padding: 1.25rem 0.625rem;
    }
`;

const ActionBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SearchBox = styled.div`
    display: flex;
    flex: 0.7;

    @media screen and (max-width: 1024px) {
        flex: 0.7;
    }

    @media screen and (max-width: 768px) {
        flex: 0.8;
    }

    @media screen and (max-width: 480px) {
        flex: 1;
    }
`;

const SearchInputText = styled.input`
    width: 100%;
    /* min-width: 260px; */
    padding: 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    outline: none;
    border: none;
    border-radius: 6px 0px 0px 6px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
`;

const SearchIcon = styled.div`
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    color: ${(props) => props.theme.primaryColor};
    padding: 0rem 0.625rem;
    height: 2.25rem;
    line-height: 2.25rem;
    text-align: center;
    border-radius: 0px 6px 6px 0px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const SubActionBox = styled.div`
    margin-top: 0.625rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

const ReviewListView = ({
    loading,
    areas,
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
    itemCount,
    onPageChange,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
}) => {
    const [sortValue, setSortValue] = useState(2);
    const { areaCode, sortCriteria, keyword, pageNum } = uiState;
    const list = (reviewList && reviewList.list) || null;

    const handleSortSelectChange = (id) => {
        setSortValue(id);
    };

    return (
        <MainContainer>
            <Container>
                <ActionBox>
                    <Select
                        value={areas.find((item) => item.code == areaCode)}
                        options={areas}
                        onChange={onSelectAreaCode}
                    />
                    <SearchBox>
                        <SearchInputText type="text" onChange={onChangeKeyword} value={keyword}></SearchInputText>
                        <SearchIcon onClick={onSearchClick}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                        </SearchIcon>
                    </SearchBox>
                </ActionBox>
                <SubActionBox>
                    <ListOptions>
                        {sortOption.map((item) => (
                            <span key={item.id} onClick={() => handleSortSelectChange(item.id)}>
                                <FontAwesomeIcon icon={sortValue == item.id ? faCircleDot : faCircle} />
                                {item.value}
                            </span>
                        ))}
                    </ListOptions>
                    <Button middle onClick={onReviewWriteClick}>
                        글 작성하기
                    </Button>
                </SubActionBox>
                <ReviewList loading={loading} list={list} onItemClick={onItemClick} />
                <Pagination
                    page={page}
                    totalCount={totalCount}
                    pageSize={pageSize}
                    itemCount={itemCount}
                    onPageChange={onPageChange}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                    onFirstPage={onFirstPage}
                    onLastPage={onLastPage}
                />
            </Container>
        </MainContainer>
    );
};

export default ReviewListView;
