import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const FormDiv = styled.div`
    margin: 1rem 0;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    display: flex;
    align-items: center;
    border-radius: 1rem;
    height: 10rem;
    padding: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
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
    align-items: center;
    width: 100%;
    padding-left: 0.9rem;
    @media all and (max-width: 1023px) {
        margin: 1rem 0 0 0;
        padding-left: 0;
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border: none;
    &::placeholder {
        color: ${(props) => props.theme.tertiaryColor};
    }
    &:focus {
        color: ${(props) => props.theme.tertiaryColor};
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
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    color: ${(props) => props.theme.primaryColor};
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
    color: ${(props) => props.theme.tertiaryColor};
`;

const SelectDiv = styled.div`
    display: flex;
`;

const SelectBox = styled.div`
    display: flex;
    align-items: center;
    height: 2.5rem;
    border-right: 0.1rem solid ${(props) => props.theme.outlineColor};
    padding-right: 0.9rem;
    & + & {
        padding-left: 0.9rem;
    }
    @media all and (max-width: 1023px) {
        & + & {
            padding-right: 0;
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
    @media all and (min-width: 480px) {
        white-space: nowrap;
    }
`;
const IconBox = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.5rem;
    border: none;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        color: ${(props) => props.theme.hoverColor};
    }
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
                                {areas.length > 0 &&
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
                        <Label>여행지 검색</Label>
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
                                <StyledFontAwesomeIcon
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
