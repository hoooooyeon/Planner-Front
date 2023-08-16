import styled from 'styled-components';
import Select, { SelectMain } from '../../common/Select';
import { useState } from 'react';
import Input from '../../common/Input';

const SearchBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const SortSelect = styled(Select)`
    ${SelectMain} {
        width: 100px;
        color: var(--md-sys-color-on-surface-variant);
        background-color: var(--md-sys-color-surface-variant);
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
    color: var(--md-sys-color-primary);
    background-color: var(--md-sys-color-surface);

    &:hover {
        box-shadow: 0px 3px 6px var(--md-sys-color-shadow);
    }
`;

const ListSearchBar = ({ sortValue, sortOption, searchText, onSortChange, onSearchTextChange }) => {
    return (
        <SearchBlock>
            <SortSelect value={sortValue} options={sortOption} onChange={onSortChange}></SortSelect>
            <SearchBar type="text" name="searchBar" onChange={onSearchTextChange} value={searchText} />
            <SearchButton>검색</SearchButton>
        </SearchBlock>
    );
};

export default ListSearchBar;
