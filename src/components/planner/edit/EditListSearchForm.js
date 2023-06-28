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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    background-color: white;
    margin-bottom: 0.2rem;
`;

const IconName = styled.div`
    font-size: 0.1rem;
    padding: 0.2rem 0.4rem;
    font-weight: bold;
    color: gray;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    background-color: white;
    border-radius: 1rem;
    position: absolute;
    top: 35px;
`;

const FormDiv = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.9rem 1rem 0;
    margin-bottom: 1rem;
    background-color: #f5f5f5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
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
    &:focus {
        outline: none;
    }
`;

const SearchButton = styled.button`
    border: none;
    border-radius: 0 0.5rem 0.5rem 0;
    min-width: 3rem;
    height: 2.5rem;
    background-color: rgba(0, 0, 0, 0.1);
    color: white;
    font-size: 1rem;
    font-weight: bold;
    white-space: nowrap;
    cursor: pointer;
`;
const InvisibleInput = styled.input`
    display: none;
`;
const ResultBox = styled.div`
    display: flex;
    align-items: center;
    width: 20rem;
    height: 2rem;
    padding: 0.8rem 0;
    color: gray;
    font-size: 0.9rem;
`;

const SearchResult = styled.div`
    font-weight: bold;
    overflow: hidden;
    white-space: wrap;
    text-overflow: ellipsis;
    max-width: 50%;
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
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    &:invalid {
        color: lightgray;
    }
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
    color: gray;
    white-space: nowrap;
`;

const IconBox = styled.div`
    background-color: white;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.5rem;
`;

const EditListSearchForm = ({}) => {
    const iconList = [faLandmarkFlag, faHotel, faRankingStar, faTrophy, faBed, faBagShopping, faUtensils];

    const [hoveredItemId, setHoveredItemId] = useState(null);

    const onOpenName = (itemId) => {
        setHoveredItemId(itemId);
    };

    const onCloseName = () => {
        setHoveredItemId(null);
    };

    const { curKeyword, resultKeyword } = { ...keyword };

    return (
        <FormDiv>
            <SelectDiv>
                <SelectBox>
                    <Label>지역</Label>
                    <Select
                        required
                        value={spotData.areaIndex}
                        onChange={(e) => {
                            onChangeAreaIndex(e.target.value);
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
            </SelectDiv>

            <MenuList>
                {contentTypeList.map((c, i) => (
                    <MenuItem
                        onClick={() => {
                            onChangeContentTypeId(c.id);
                            onChangeMenuIndex(i);
                        }}
                        key={i}
                        onMouseEnter={() => onOpenName(i)}
                        onMouseLeave={onCloseName}
                    >
                        <MenuIcon icon={iconList[i]} />
                        {hoveredItemId === i && <IconName>{c.label}</IconName>}
                    </MenuItem>
                ))}
                <MenuItem onClick={() => onChangeMenuIndex(7)} onMouseEnter={() => onOpenName(7)} onMouseLeave={onCloseName} key={7}>
                    <MenuIcon icon={faHeart} />
                    {hoveredItemId === 7 && <IconName>좋아요</IconName>}
                </MenuItem>
            </MenuList>
            {menuIndex < 7 && (
                <Form>
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
                    <ResultBox>
                        {resultKeyword.length > 0 ? (
                            <>
                                ' <SearchResult>{resultKeyword}</SearchResult> ' 에 대한 검색 결과...
                            </>
                        ) : null}
                    </ResultBox>
                </Form>
            )}
            {menuIndex === 7 && (
                <Form>
                    <SearchBox>
                        <SearchInput
                            placeholder="좋아요 키워드 검색"
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
        </FormDiv>
    );
};

export default EditListSearchForm;
