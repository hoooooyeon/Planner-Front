import styled from 'styled-components';
import SpotItem from './SpotItem';
import defaultImg from '../../lib/images/defaultImg.jpg';
import SpotDetailModal from './SpotDetailModal';
import Slider from '../common/Slider';
import SpotSlider from './SpotSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SpotListBlock = styled.div`
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
    margin: 3rem auto;
    padding: 1rem;

    @media all and (min-width: 768px) {
        padding: 0 9rem;
    }
`;

const MenuTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const List = styled.ul`
    margin: 0 auto;
    padding: 0;
    /* display: inline-block; */
    /* grid-template-columns: repeat(4, 1fr); */
`;

const FormDiv = styled.div`
    margin: 1rem 0;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.5rem 3rem;
    display: flex;
    align-items: center;
    @media all and (max-width: 1023px) {
        border-radius: 1rem;
        height: 10rem;
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

const SpotList = ({
    areas,
    spots,
    spotError,
    detail,
    spotData,
    keyword,
    sliderSpots,
    contentTypeList,
    drag,
    onFirstSpotsPage,
    onUnloadDetailSpot,
    onToggleSpotLike,
    onOpenDetail,
    onChangeKeyword,
    onResetKeyword,
    onSearchSpot,
    onUpdateContentTypeId,
    searchResultText,
}) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    if (spotError) {
        return <div>Loading...</div>;
    }
    return (
        <SpotListBlock>
            <SpotSlider sliderSpots={sliderSpots} />
            <Container>
                <MenuTitle>여행지를 찾아 보세요.</MenuTitle>
                <FormDiv>
                    <Form>
                        <SelectDiv>
                            <SelectBox>
                                <Label>지역</Label>
                                <Select
                                    required
                                    value={spotData.areaIndex}
                                    onChange={(e) => {
                                        onFirstSpotsPage(e.target.value);
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
                                        onUpdateContentTypeId(e.target.value);
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
                </FormDiv>
                {searchResultText.length > 0 ? <SearchResult>' {searchResultText} ' 에 대한 검색 결과...</SearchResult> : null}

                {spots && (
                    <Slider list={spots.list} scroll={true} drag={drag}>
                        <List>
                            {spots.list.map((spot) => (
                                <SpotItem spot={spot} key={spot.contentid} onChangeErrorImg={onChangeErrorImg} onOpenDetail={onOpenDetail} />
                            ))}
                        </List>
                    </Slider>
                )}
                {detail && <SpotDetailModal detail={detail} onChangeErrorImg={onChangeErrorImg} onUnloadDetailSpot={onUnloadDetailSpot} onToggleSpotLike={onToggleSpotLike} />}
            </Container>
        </SpotListBlock>
    );
};

export default SpotList;
