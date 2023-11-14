import styled from 'styled-components';
import Slider from '../common/Slider';
import SpotSlider from './SpotSlider';
import SpotSearchForm from './SpotSearchForm';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { handleErrorImg } from '../../lib/utils/CommonFunction';
import errorImg from '../../lib/images/spotErrorImg.jpg';
import Empty from '../common/Empty';
import ErrorModal from '../common/ErrorModal';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination.js';

const SpotListBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 3rem 1rem;
    @media all and (min-width: 768px) {
        padding: 3rem 9rem;
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
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
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
    font-size: 0.7rem;
    color: ${(props) => props.theme.tertiaryColor};
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
    background-color: ${(props) => props.theme.primaryBackgroundColor};
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
    color: ${(props) => (props.like ? `${props.theme.likeButtonColor}` : 'transparent')};
`;

const CenterDiv = styled.div`
    height: 29rem;
`;

const PageBox = styled.div`
    padding-top: 1rem;
`;

const SpotList = ({
    areas,
    spots,
    spotData,
    spotError,
    curKeyword,
    resultKeyword,
    sliderSpots,
    contentTypeList,
    drag,
    loading,
    onClickArea,
    onOpenDetail,
    onChangeCurKeyword,
    onChangeContentTypeId,
    onChangeResultKeyword,
    onCloseError,
    onIndexPage,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
}) => {
    const itemRef = useRef();
    const { message } = { ...spotError };
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
                    loading={loading}
                    onClickArea={onClickArea}
                    onChangeContentTypeId={onChangeContentTypeId}
                    onChangeCurKeyword={onChangeCurKeyword}
                    onChangeResultKeyword={onChangeResultKeyword}
                />
                {loading.spotsLoading || loading.searchSpotLoading ? (
                    <CenterDiv>
                        <Loading pos="center" />
                    </CenterDiv>
                ) : Object.keys(spots).length > 0 && spots.list.length > 0 ? (
                    <>
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
                                                <Img
                                                    src={firstImage}
                                                    alt={title}
                                                    onError={(e) => {
                                                        handleErrorImg({ e, errorImg });
                                                    }}
                                                />
                                                <IconBox>
                                                    <StyledFontAwesomeIcon
                                                        icon={faStar}
                                                        like={likeState ? likeState.toString() : undefined}
                                                    />
                                                </IconBox>
                                            </ImgBox>
                                            <Name>{title}</Name>
                                        </SpotItem>
                                    );
                                })}
                            </List>
                        </Slider>
                        <PageBox>
                            <Pagination
                                onIndexPage={onIndexPage}
                                onNextPage={onNextPage}
                                onPreviousPage={onPreviousPage}
                                onFirstPage={onFirstPage}
                                onLastPage={onLastPage}
                                page={spotData.pageNo}
                                totalCount={spots.totalCount}
                                itemIndex={12}
                            />
                        </PageBox>
                    </>
                ) : (
                    <CenterDiv>
                        <Empty text="여행지" />
                    </CenterDiv>
                )}
            </Container>
            {spotError && typeof spotError === 'string' && (
                <ErrorModal errorState={spotError} errorMessage={message} onCloseError={onCloseError} />
            )}
        </SpotListBlock>
    );
};

export default SpotList;
