import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ShareListSearchFormBlock = styled.div`
    margin: 1rem 0;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    padding: 0.5rem 5rem;
    display: flex;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    @media all and (max-width: 1024px) {
        border-radius: 1rem;
        height: 6rem;
        padding: 0.5rem 2rem;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    @media all and (min-width: 1025px) {
        height: 4rem;
        border-radius: 5rem;
        align-items: center;
    }
`;

const SearchForm = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 2rem;
    height: 4rem;
    @media all and (max-width: 1024px) {
        justify-content: center;
        margin-left: 0;
    }
`;

const SortBox = styled.div`
    display: flex;
    align-items: center;
    height: 4rem;
`;

const SortButton = styled.div`
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    border-radius: 2rem;
    background-color: ${(props) => props.theme.primaryButtonBackgroundColor};
    font-size: 0.7rem;
    font-weight: bold;
    padding: 0.4rem;
    text-align: center;
    cursor: pointer;
    &[aria-current] {
        background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
        color: ${(props) => props.theme.primaryColor};
    }
    @media all and (min-width: 481px) {
        white-space: nowrap;
    }
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        background-color: ${(props) => props.theme.hoverBackgroundColor};
    }
`;

const Text = styled.input`
    width: 100%;
    height: 2.5rem;
    border: none;
    padding: 0 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 0.5rem 0 0 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    &::placeholder {
        color: ${(props) => props.theme.tertiaryColor};
    }
    &:focus {
        color: ${(props) => props.theme.tertiaryColor};
        outline: none;
    }
`;

const Button = styled.button`
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
    min-width: 5rem;
    height: 2.5rem;
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    color: ${(props) => props.theme.primaryColor};
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    @media all and (max-width: 1024px) {
        max-width: 3rem;
        min-width: 3rem;
        width: 100%;
    }
`;
const Label = styled.label`
    margin-right: 0.5rem;
    font-size: 0.9rem;
    white-space: nowrap;
    @media all and (max-width: 360px) {
        white-space: normal;
    }
`;
const ResultBox = styled.div`
    margin: 1rem 0;
    color: ${(props) => props.theme.tertiaryColor};
    h3 {
        margin: 0;
    }
`;
const InvisibleInput = styled.input`
    display: none;
`;

const IconBox = styled.div`
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border: 1px solid ${(props) => props.theme.outlineColor};
    border-left: none;
    border-right: none;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        color: ${(props) => props.theme.hoverColor};
    }
`;

const ShareListSearchForm = ({ keyword, sortCriteria, onChangeKeyword, onChangeSort, onChangeResultKeyword }) => {
    const { curKeyword, resultKeyword } = { ...keyword };
    return (
        <>
            <ShareListSearchFormBlock>
                <SortBox>
                    <Label>정렬</Label>
                    <SortButton aria-current={sortCriteria === 2 ? 'cur' : null} onClick={() => onChangeSort(2)}>
                        최신순
                    </SortButton>
                    <SortButton aria-current={sortCriteria === 1 ? 'cur' : null} onClick={() => onChangeSort(1)}>
                        인기순
                    </SortButton>
                </SortBox>
                <SearchForm>
                    <Label>플래너 검색</Label>
                    <Text
                        placeholder="키워드 검색"
                        type="text"
                        value={curKeyword}
                        onChange={(e) => {
                            onChangeKeyword(e.target.value);
                        }}
                    />
                    <InvisibleInput type="text" />
                    <IconBox>
                        {curKeyword.length > 0 ? (
                            <StyledFontAwesomeIcon
                                onClick={() => {
                                    onChangeKeyword('');
                                }}
                                icon={faXmark}
                            />
                        ) : null}
                    </IconBox>
                    <Button type="button" onClick={onChangeResultKeyword}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </SearchForm>
            </ShareListSearchFormBlock>
            <ResultBox>{resultKeyword.length > 0 ? <h3>' {resultKeyword} ' 에 대한 검색 결과...</h3> : null}</ResultBox>
        </>
    );
};

export default ShareListSearchForm;
