import styled from 'styled-components';
import defaultImg from '../../lib/images/defaultImg.jpg';
import Slider from '../common/Slider';
import SpotSlider from './SpotSlider';
import SpotSearchForm from './SpotSearchForm';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
    width: 100%;
    height: 100%;
`;

const SpotItem = styled.li`
    width: 200px;
    float: left;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border: none;
    margin: 0.5%;
    position: relative;
    @media all and (min-width: 768px) {
        width: 24%;
    }
    &:hover {
        cursor: pointer;
    }
`;

const ImgBox = styled.div`
    background-color: lightgray;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 75%;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0;
    display: block;
    -webkit-user-drag: none;
    object-fit: cover;
`;

const Name = styled.div`
    text-align: center;
    height: 2rem;
    line-height: 2rem;
    padding: 0.1rem 0.5rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8rem;
    font-weight: bold;
    background-color: white;
    border-top: 0;
    border-radius: 0 0 0.5rem 0.5rem;
`;

const IconBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'lightgray')};
`;

const SpotList = ({ areas, spots, spotError, spotData, curKeyword, resultKeyword, sliderSpots, contentTypeList, drag, onClickArea, onOpenDetail, onChangeKeyword, onSearchSpot, onChangeContentTypeId }) => {
    // 대체 이미지 넣기
    const onChangeErrorImg = (e) => {
        e.target.src = defaultImg;
    };

    const itemRef = useRef();

    if (spotError) {
        return <div>Loading...</div>;
    }
    return (
        <SpotListBlock>
            <SpotSlider sliderSpots={sliderSpots} />
            <Container>
                <MenuTitle>여행지를 찾아 보세요.</MenuTitle>
                <SpotSearchForm
                    areas={areas}
                    resultKeyword={resultKeyword}
                    curKeyword={curKeyword}
                    spotData={spotData}
                    contentTypeList={contentTypeList}
                    onClickArea={onClickArea}
                    onChangeContentTypeId={onChangeContentTypeId}
                    onSearchSpot={onSearchSpot}
                    onChangeKeyword={onChangeKeyword}
                />
                {spots && (
                    <Slider list={spots.list} scroll={true} drag={drag} itemRef={itemRef}>
                        <List>
                            {spots.list.map((spot) => {
                                const { title, firstImage, likeState, contentId } = spot;
                                return (
                                    <SpotItem
                                        ref={itemRef}
                                        onClick={() => {
                                            onOpenDetail(spot);
                                        }}
                                        key={contentId}
                                    >
                                        <ImgBox>
                                            <Img src={firstImage} alt={title} onError={onChangeErrorImg} />
                                            <IconBox>
                                                <StyledFontAwesomeIcon icon={faStar} like={likeState ? likeState.toString() : undefined} />
                                            </IconBox>
                                        </ImgBox>
                                        <Name>{title}</Name>
                                    </SpotItem>
                                );
                            })}
                        </List>
                    </Slider>
                )}
            </Container>
        </SpotListBlock>
    );
};

export default SpotList;
