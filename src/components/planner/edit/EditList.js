import styled from 'styled-components';
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
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EditListDetailModal from './EditListDetailModal';
import { useState } from 'react';
import Pagination from '../../common/Pagination';

const EditListBlock = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 350px;
    height: 100vh;
    background-color: #f5f5f5;
    float: left;
    z-index: 200;
`;

const MenuList = styled.div`
    padding: 0.7rem 0.5rem;
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
        margin-left: 0.2rem;
    }
    &:hover {
        transition: transform 0.3s ease;
        transform: translate(0, -5px);
    }
`;

const MenuIcon = styled(FontAwesomeIcon)`
    border-radius: 2rem;

    width: 1.2rem;
    height: 1.2rem;
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

const List = styled.div`
    height: 35rem;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    z-index: 200;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const ListItem = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    padding: 0.5rem;
    &:hover {
        background-color: #ffcbc14f;
    }
`;

const Img = styled.img`
    border-radius: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    width: 5rem;
    height: 5rem;
`;
const TextInfo = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0 0.8rem;
`;

const Name = styled.div`
    width: 8rem;
    height: 1.2rem;
    overflow: hidden;
    white-space: wrap;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    text-overflow: ellipsis;
`;

const Address = styled.div`
    width: 8rem;
    height: 1rem;
    overflow: hidden;
    white-space: wrap;
    font-size: 0.6rem;
    color: lightgray;
    text-overflow: ellipsis;
`;

const Icons = styled.div`
    display: flex;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    font-size: 1.3rem;
    border-radius: 2rem;
    padding: 0.5rem;
    height: 1rem;
    width: 1rem;
    background-color: rgb(230, 230, 230);
    cursor: pointer;
    & + & {
        margin-left: 0.5rem;
    }
    &:hover {
        transition: transform 0.3s ease;
        transform: scale(1.1);
    }
`;
const FormDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.2rem 1rem 1rem;
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
    option {
        cursor: pointer;
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

const EditList = ({
    spots,
    areas,
    keyword,
    detail,
    spotData,
    searchResultText,
    onChangePlanLocation,
    onCreateLocation,
    onMoveMarker,
    onOpenDetail,
    onCloseDetail,
    onUchangeContentTypeId,
    pageArr,
    onChangePageIndex,
    prevPage,
    nextPage,
    firstPage,
    lastPage,
    contentTypeList,
    onChangeAreaIndex,
    onResetKeyword,
    onChangeKeyword,
    onSearchSpot,
}) => {
    const iconList = [faLandmarkFlag, faHotel, faRankingStar, faTrophy, faBed, faBagShopping, faUtensils];

    const [hoveredItemId, setHoveredItemId] = useState(null);

    const onOpenName = (itemId) => {
        setHoveredItemId(itemId);
    };

    const onCloseName = () => {
        if (hoveredItemId !== null) {
        }
        setHoveredItemId(null);
    };
    return (
        <>
            <EditListBlock>
                <MenuList>
                    {contentTypeList.map((c, i) => (
                        <MenuItem onClick={() => onUchangeContentTypeId(c.id)} key={i} onMouseEnter={() => onOpenName(i)} onMouseLeave={onCloseName}>
                            <MenuIcon icon={iconList[i]} />
                            {hoveredItemId === i && <IconName>{c.label}</IconName>}
                        </MenuItem>
                    ))}
                    <MenuItem onMouseEnter={() => onOpenName(7)} onMouseLeave={onCloseName}>
                        <MenuIcon icon={faHeart} />
                        {hoveredItemId === 7 && <IconName>좋아요</IconName>}
                    </MenuItem>
                </MenuList>
                <FormDiv>
                    <Form>
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
                        <SearchBox>
                            <SearchInput
                                placeholder="키워드 검색"
                                type="text"
                                value={keyword}
                                onChange={(e) => {
                                    onChangeKeyword(e.target.value);
                                }}
                            />
                            <InvisibleInput type="text" />
                            <SearchButton type="button" onClick={onSearchSpot}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </SearchButton>
                        </SearchBox>
                    </Form>
                    {searchResultText.length > 0 ? <SearchResult>' {searchResultText} ' 에 대한 검색 결과...</SearchResult> : null}
                </FormDiv>

                <List>
                    {spots &&
                        spots.list.map((s, i) => {
                            const { firstimage, firstimage2, title, addr1 } = s;
                            return (
                                <ListItem
                                    key={i}
                                    onClick={() => {
                                        onMoveMarker(s);
                                    }}
                                >
                                    <Img
                                        src={firstimage || firstimage2}
                                        alt={title}
                                        // onError={onChangeErrorImg}
                                    />
                                    <TextInfo>
                                        <Name>{title}</Name>
                                        <Address>{addr1.split(' ')[0]}</Address>
                                    </TextInfo>
                                    <Icons>
                                        <StyledFontAwesomeIcon
                                            onClick={() => {
                                                onOpenDetail(s);
                                            }}
                                            icon={faExclamation}
                                        />

                                        <StyledFontAwesomeIcon
                                            onClick={() => {
                                                onCreateLocation(s);
                                            }}
                                            icon={faPlus}
                                        />
                                    </Icons>
                                </ListItem>
                            );
                        })}
                </List>
                {/* <Pagination pageArr={pageArr} onUpdatePageIndex={onChangePageIndex} prevPage={prevPage} nextPage={nextPage} firstPage={firstPage} lastPage={lastPage} /> */}
                {detail && <EditListDetailModal detail={detail} onCloseDetail={onCloseDetail} />}
            </EditListBlock>
        </>
    );
};

export default EditList;
