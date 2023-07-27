import { useRef } from 'react';
import styled from 'styled-components';
import Slider from '../../common/Slider';
import ShareListSearchForm from './ShareListSearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const ShareListBlock = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    background-color: white;
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 1rem;
    min-height: 13rem;
    @media all and (min-width: 768px) {
        padding: 1rem 9rem;
    }
`;

const HeaderTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const Shares = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

const ShareItem = styled.li`
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    float: left;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    margin: 0.5%;
    position: relative;
    cursor: pointer;
    @media all and (min-width: 768px) {
        width: 24%;
        height: auto;
    }
    &:hover {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    }
    a {
        color: black;
    }
`;
const InfoBox = styled.div`
    height: 2.5rem;
    margin: 0;
    padding: 0.5rem;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.div`
    font-size: 0.8rem;
    font-weight: bold;
    overflow: hidden;
`;
const Date = styled.div`
    font-size: 0.4rem;
    color: lightgray;
    margin-top: 0.6rem;
    overflow: hidden;
`;

const MapBox = styled.div`
    background-color: lightgray;
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 90%;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
    @media all and (max-width: 767px) {
        padding-top: 75%;
    }
`;

const Map = styled.div`
    width: 100%;
    height: 100%;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
`;

const IconBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'black')};
`;

const ErrorDiv = styled.div`
    color: lightgray;
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
`;

const ShareList = ({
    sharePlanners,
    plannerError,
    keyword,
    sortCriteria,
    onClickPlanner,
    onChangeKeyword,
    onChangeResultKeyword,
    onChangeSort,
    drag,
}) => {
    const itemRef = useRef();

    if (plannerError) {
        return <div>Loading...</div>;
    }
    return (
        <ShareListBlock>
            <Container>
                <HeaderTitle>다른 이용자들의 플래너</HeaderTitle>
                <ShareListSearchForm
                    keyword={keyword}
                    sortCriteria={sortCriteria}
                    onChangeKeyword={onChangeKeyword}
                    onChangeResultKeyword={onChangeResultKeyword}
                    onChangeSort={onChangeSort}
                />
                {sharePlanners && sharePlanners.list && sharePlanners.list.length > 0 ? (
                    <Slider list={sharePlanners.list} itemRef={itemRef} scroll={true} drag={drag}>
                        <Shares>
                            {sharePlanners.list.map((p, i) => (
                                <ShareItem
                                    key={p.plannerId}
                                    ref={itemRef}
                                    id={p.plannerId}
                                    onClick={() => {
                                        onClickPlanner(p.plannerId);
                                    }}
                                >
                                    <MapBox>
                                        <Map
                                        // ref={mapsRef.current[i]}
                                        // ref={mapsRef}
                                        />
                                        <IconBox>
                                            <StyledFontAwesomeIcon
                                                icon={faStar}
                                                like={p.likeState ? p.likeState.toString() : undefined}
                                            />
                                        </IconBox>
                                    </MapBox>
                                    <InfoBox>
                                        <Title>{p.title}</Title>
                                        <Date>
                                            {p.planDateStart} ~ {p.planDateEnd}
                                        </Date>
                                    </InfoBox>
                                </ShareItem>
                            ))}
                        </Shares>
                    </Slider>
                ) : (
                    <ErrorDiv>플래너가 없습니다.</ErrorDiv>
                )}
            </Container>
        </ShareListBlock>
    );
};

export default ShareList;
