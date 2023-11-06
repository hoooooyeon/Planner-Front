import styled from 'styled-components';
import Select, { SelectMain } from '../../common/Select';
import { useState } from 'react';
import Input from '../../common/Input';

const SearchBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    height: 10rem;
    margin: 0px 10rem;

    @media screen and (max-width: 1200px) {
        margin: 0px 5rem;
    }

    @media screen and (max-width: 1024px) {
        margin: 0px 2rem;
    }
`;

const SearchBar = styled(Input)`
    margin: 0px 20px;
    width: 50%;
    border: solid 1px silver;
`;

const SearchButton = styled.button`
    width: 82px;
    height: 36px;
    border-radius: 6px;
    border: solid 1px silver;
    color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.clickedButtonBackgroundColor};

    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const ListSearchBar = ({ sortValue, sortOption, searchText, onSortChange, onSearchTextChange }) => {
    return (
        <SearchBlock>
            <Select value={sortValue} options={sortOption} onChange={onSortChange}></Select>
            <SearchBar type="text" name="searchBar" onChange={onSearchTextChange} value={searchText} />
            <SearchButton>검색</SearchButton>
        </SearchBlock>
    );
};

export default ListSearchBar;
