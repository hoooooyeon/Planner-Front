import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const FormDiv = styled.div`
    margin: 1rem 0;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    border-radius: 1rem;
    height: 10rem;
    padding: 0.5rem;
    @media all and (min-width: 320px) {
        padding: 0.5rem 3rem;
    }
    @media all and (min-width: 1024px) {
        height: 4rem;
        border-radius: 5rem;
    }
`;

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    @media all and (max-width: 1023px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
`;

const SearchBox = styled.div`
    display: flex;
    width: 100%;
    @media all and (max-width: 1023px) {
        margin: 1rem 0 0 0;
    }
`;

const SearchInput = styled.input`
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
        margin-left: 1rem;
    }
`;

const SearchButton = styled.button`
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
const InvisibleInput = styled.input`
    display: none;
`;

const SearchResult = styled.h3`
    margin: 1rem 0;
`;

const SelectDiv = styled.div`
    display: flex;
`;

const SelectBox = styled.div`
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding-right: 1rem;
    border-right: 0.1rem solid lightgray;
    & + & {
        padding-left: 1rem;
    }
    @media all and (max-width: 1023px) {
        & + & {
            border-right: none;
        }
    }
`;

const Select = styled.select`
    border-radius: 0.5rem;
    border: none;
    width: 100%;
    min-width: 6rem;
    height: 2.5rem;
    text-align-last: center;
    &:invalid {
        color: lightgray;
    }
    &:focus {
        outline: none;
    }
    option:disabled {
        display: none;
    }
    @media all and (max-width: 1023px) {
        min-width: 1rem;
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
const IconBox = styled.div`
    background-color: white;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.5rem;
`;
const SpotSearchForm = ({
    areas,
    resultKeyword,
    curKeyword,
    spotData,
    contentTypeList,
    onClickArea,
    onChangeContentTypeId,
    onChangeCurKeyword,
    onChangeResultKeyword,
}) => {
    return (
        <>
            <FormDiv>
                <Form>
                    <SelectDiv>
                        <SelectBox>
                            <Label>지역</Label>
                            <Select
                                required
                                value={spotData.areaCode}
                                onChange={(e) => {
                                    onClickArea(e.target.value);
                                }}
                            >
                                {areas &&
                                    areas.map((area) => (
                                        <option value={area.code} key={area.code}>
                                            {area.name}
                                        </option>
                                    ))}
                            </Select>
                        </SelectBox>
                        <SelectBox>
                            <Label>종류</Label>
                            <Select
                                required
                                value={spotData.contentTypeId}
                                onChange={(e) => {
                                    onChangeContentTypeId(e.target.value);
                                }}
                            >
                                {contentTypeList &&
                                    contentTypeList.map((contentType) => (
                                        <option value={contentType.id} key={contentType.id}>
                                            {contentType.label}
                                        </option>
                                    ))}
                            </Select>
                        </SelectBox>
                    </SelectDiv>
                    <SearchBox>
                        <SearchInput
                            placeholder="키워드 검색"
                            type="text"
                            value={curKeyword}
                            onChange={(e) => {
                                onChangeCurKeyword(e.target.value);
                            }}
                        />
                        <InvisibleInput type="text" />
                        <IconBox>
                            {curKeyword.length > 0 ? (
                                <FontAwesomeIcon
                                    onClick={() => {
                                        onChangeCurKeyword('');
                                    }}
                                    icon={faXmark}
                                />
                            ) : null}
                        </IconBox>
                        <SearchButton type="button" onClick={onChangeResultKeyword}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </SearchButton>
                    </SearchBox>
                </Form>
            </FormDiv>
            {resultKeyword.length > 0 ? <SearchResult>' {resultKeyword} ' 에 대한 검색 결과...</SearchResult> : null}
        </>
    );
};

export default SpotSearchForm;
