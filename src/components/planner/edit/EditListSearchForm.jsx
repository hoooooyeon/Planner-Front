import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faLandmarkFlag } from '@fortawesome/free-solid-svg-icons';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { faRankingStar } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useState } from 'react';
import Loading from '../../common/Loading';

const MenuList = styled.div`
    padding: 1rem 0 0.8rem;
    display: flex;
    justify-content: center;
`;

const MenuItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    & + & {
        margin-left: 0.3rem;
    }
    &:hover {
        transition: transform 0.3s ease;
        transform: translate(0, -5px);
    }
`;

const MenuIcon = styled(FontAwesomeIcon)`
    border-radius: 2rem;
    width: 1rem;
    height: 1rem;
    padding: 0.6rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    margin-bottom: 0.2rem;
    &[aria-current] {
        background-color: ${(props) => props.theme.clickedButtonBackgroundColor};
        color: ${(props) => props.theme.primaryColor};
    }
`;

const IconName = styled.div`
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
    font-weight: bold;
    color: ${(props) => props.theme.secondaryColor};
    white-space: nowrap;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 1rem;
    position: absolute;
    top: 33px;
`;

const FormDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.9rem 1rem 0;
    margin-bottom: 1rem;
    min-height: 12rem;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    @media all and (max-width: 480px) {
        min-height: 11rem;
    }
`;

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.2rem 1rem;
`;

const SearchBox = styled.div`
    display: flex;
    width: 100%;
`;

const SearchInput = styled.input`
    width: 100%;
    height: 2.5rem;
    border: none;
    padding: 0 0.5rem;
    font-size: 0.8rem;
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
    @media all and (max-width: 480px) {
        height: 2rem;
    }
`;

const SearchButton = styled.button`
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
    min-width: 3rem;
    height: 2.5rem;
    background-color: ${(props) => props.theme.secondaryButtonBackgroundColor};
    color: ${(props) => props.theme.primaryColor};
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
    @media all and (max-width: 480px) {
        min-width: 2.5rem;
        height: 2rem;
    }
`;
const InvisibleInput = styled.input`
    display: none;
`;
const ResultBox = styled.div`
    display: flex;
    align-items: center;
    width: 20rem;
    height: 2rem;
    font-size: 0.9rem;
    padding: 0.8rem 0;
    color: ${(props) => props.theme.secondaryColor};
    @media all and (max-width: 480px) {
        height: 1.8rem;
        font-size: 0.8rem;
        padding: 0.5rem 0;
    }
`;

const SearchResult = styled.div`
    font-weight: bold;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    max-width: 50%;
    color: ${(props) => props.theme.secondaryColor};
`;

const SelectDiv = styled.div`
    display: flex;
    width: 100%;
`;

const SelectBox = styled.div`
    display: flex;
    align-items: center;
    height: 2.5rem;
    padding-right: 1rem;
    & + & {
        padding-left: 1rem;
    }
`;

const Select = styled.select`
    border-radius: 0.5rem;
    border: none;
    width: 100%;
    min-width: 6rem;
    height: 2.5rem;
    text-align-last: center;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    cursor: pointer;
    &:focus {
        outline: none;
    }
    option:disabled {
        display: none;
    }
`;

const Label = styled.label`
    margin-right: 0.5rem;
    font-size: 0.9rem;
    white-space: nowrap;
`;

const IconBox = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.5rem;
    @media all and (max-width: 480px) {
        height: 2rem;
        line-height: 2rem;
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => props.theme.secondaryColor};
    &:hover {
        color: ${(props) => props.theme.hoverColor};
    }
`;

const CenterDiv = styled.div`
    height: 12rem;
`;

const EditListSearchForm = ({
    keywordData,
    spotData,
    areas,
    contentTypeList,
    likeKeyword,
    loading,
    onChangeAreaIndex,
    onChangeContentTypeId,
    onChangeLikeKeyword,
    onIndexPage,
    onChangeField,
    onClickSearch,
    handleCleanKeyword,
}) => {
    const iconList = [faLandmarkFlag, faHotel, faRankingStar, faTrophy, faBed, faBagShopping, faUtensils];
    const { curKeyword, resultKeyword } = { ...keywordData };
    const { contentTypeId, areaCode } = { ...spotData };
    const [hoveredItemId, setHoveredItemId] = useState(null);

    const onOpenName = (itemId) => {
        setHoveredItemId(itemId);
    };

    const onCloseName = () => {
        setHoveredItemId(null);
    };

    return (
        <FormDiv>
            {loading ? (
                <CenterDiv>
                    <Loading pos="center" />
                </CenterDiv>
            ) : (
                <>
                    <SelectDiv>
                        <SelectBox>
                            <Label>지역</Label>
                            <Select
                                required
                                value={areaCode}
                                onChange={(e) => {
                                    onChangeAreaIndex(e.target.value);
                                    console.log(areaCode);
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
                    </SelectDiv>

                    <MenuList>
                        {contentTypeList.map((c, i) => (
                            <MenuItem
                                onClick={() => {
                                    onChangeContentTypeId(c.id);
                                    onIndexPage(1);
                                }}
                                key={i}
                                onMouseEnter={() => onOpenName(i)}
                                onMouseLeave={onCloseName}
                            >
                                <MenuIcon icon={iconList[i]} aria-current={contentTypeId === c.id ? 'cur' : null} />
                                {hoveredItemId === i && <IconName>{c.label}</IconName>}
                            </MenuItem>
                        ))}
                        <MenuItem
                            onClick={() => {
                                onIndexPage(1);
                                onChangeContentTypeId(0);
                            }}
                            onMouseEnter={() => onOpenName(7)}
                            onMouseLeave={onCloseName}
                        >
                            <MenuIcon icon={faHeart} aria-current={contentTypeId === 0 ? 'cur' : null} />
                            {hoveredItemId === 7 && <IconName>좋아요</IconName>}
                        </MenuItem>
                    </MenuList>
                    {contentTypeId !== 0 && (
                        <Form>
                            <SearchBox>
                                <SearchInput
                                    placeholder="키워드 검색"
                                    type="text"
                                    name="curKeyword"
                                    value={curKeyword}
                                    onChange={onChangeField}
                                />
                                <InvisibleInput type="text" />
                                <IconBox>
                                    {curKeyword.length > 0 ? (
                                        <StyledFontAwesomeIcon onClick={handleCleanKeyword} icon={faXmark} />
                                    ) : null}
                                </IconBox>
                                <SearchButton type="button" onClick={onClickSearch}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </SearchButton>
                            </SearchBox>
                            <ResultBox>
                                {resultKeyword.length > 0 ? (
                                    <>
                                        ' <SearchResult>{resultKeyword}</SearchResult> ' 에 대한 검색 결과...
                                    </>
                                ) : null}
                            </ResultBox>
                        </Form>
                    )}
                    {contentTypeId === 0 && (
                        <Form>
                            <SearchBox>
                                <SearchInput
                                    placeholder="키워드 검색"
                                    type="text"
                                    name="curKeyword"
                                    value={curKeyword}
                                    onChange={onChangeField}
                                />
                                <InvisibleInput type="text" />
                                <IconBox>
                                    {curKeyword.length > 0 ? (
                                        <StyledFontAwesomeIcon onClick={handleCleanKeyword} icon={faXmark} />
                                    ) : null}
                                </IconBox>
                                <SearchButton type="button" onClick={onChangeLikeKeyword}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </SearchButton>
                            </SearchBox>
                            <ResultBox>
                                {likeKeyword.length > 0 ? (
                                    <>
                                        ' <SearchResult>{likeKeyword}</SearchResult> ' 에 대한 검색 결과...
                                    </>
                                ) : null}
                            </ResultBox>
                        </Form>
                    )}
                </>
            )}
        </FormDiv>
    );
};

export default EditListSearchForm;
