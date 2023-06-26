import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ShareListSearchFormBlock = styled.div`
    margin: 1rem 0;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.5rem 5rem;
    display: flex;
    @media all and (max-width: 1023px) {
        border-radius: 1rem;
        height: 6rem;
        padding: 0.5rem 2rem;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    @media all and (min-width: 1024px) {
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
    @media all and (max-width: 1023px) {
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
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    border-radius: 2rem;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.5rem;
    text-align: center;
    cursor: pointer;
    &[aria-current] {
        background-color: rgb(120, 220, 220);
    }
    @media all and (min-width: 480px) {
        white-space: nowrap;
    }
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        background-color: white;
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
    &:focus {
        outline: none;
    }
    @media all and (min-width: 1024px) {
        /* margin-left: 1rem; */
    }
`;
const Button = styled.button`
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
    min-width: 5rem;
    height: 2.5rem;
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    @media all and (max-width: 1023px) {
        max-width: 3rem;
        min-width: 3rem;
        width: 100%;
    }
`;
const Label = styled.label`
    margin-right: 0.5rem;
    font-size: 0.9rem;
    color: gray;
    @media all and (min-width: 480px) {
        white-space: nowrap;
    }
`;
const ResultBox = styled.div`
    height: 1.5rem;
    margin: 1rem 0;
    h3 {
        margin: 0;
    }
`;
const InvisibleInput = styled.input`
    display: none;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    /* background-color: white; */
`;
const IconBox = styled.div`
    background-color: white;
    height: 2.5rem;
    line-height: 2.5rem;
    /* width: 1rem; */
    padding: 0 0.5rem;
`;
const ShareListSearchForm = ({ curKeyword, sortCriteria, resultKeyword, onChangeKeyword, onChangeSort, onChangeResultKeyword }) => {
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
                    <InvisibleInput type="text" />
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
