import styled from 'styled-components';
import Select, { SelectMain } from '../../common/Select';
import { useState } from 'react';
import Input from '../../common/Input';
import { faMagnifyingGlass } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';

const SearchBlock = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    height: 5rem;
    margin: 0.5rem 10rem;

    @media screen and (max-width: 1024px) {
        margin: 0.5rem 5rem;
    }

    @media screen and (max-width: 768px) {
        margin: 0.5rem 3rem;
    }

    @media screen and (max-width: 480px) {
        margin: 0.5rem 0rem;
    }
`;

const SearchBox = styled.div`
    display: flex;
    flex-grow: 1;
`;

const SearchInputText = styled.input`
    width: 100%;
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
    line-height: 36px;
    text-align: center;
    border-radius: 0px 6px 6px 0px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    &:hover {
        box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    }
`;

const ListSearchBar = ({ searchText, onSearchTextChange }) => {
    return (
        <SearchBlock>
            <SearchBox>
                <SearchInputText
                    type="text"
                    onChange={onSearchTextChange}
                    value={searchText}
                    placeholder="검색할 내용을 적어주세요."
                ></SearchInputText>
                <SearchIcon onClick={null}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
                </SearchIcon>
            </SearchBox>
        </SearchBlock>
    );
};

export default ListSearchBar;
