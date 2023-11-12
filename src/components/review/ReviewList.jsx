import styled from 'styled-components';
import Loading from '../common/Loading';
import tempImage from '../../lib/images/plannerErrorImg.png';

const ReviewListContainer = styled.ul`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style: none;
    padding: 0px;
    margin: 20px 20px;
`;

const ReviewListEmtpy = styled.b`
    margin: 0px auto;
    padding: 80px;
`;

const ReviewListItem = styled.li`
    //background-color: skyblue;
    /* height: 440px; */
    //width: 240px;
    margin: 20px 20px;
    padding: 10px 10px;
    width: calc(20% - 40px);
    box-sizing: border-box;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 8px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};

    &:hover {
        background-color: silver;
    }

    img {
        display: block;
        width: 100%;
        margin-bottom: 5px;
    }

    @media screen and (min-width: 1024px) and (max-width: 1440px) {
        width: calc(20% - 40px);
    }

    @media screen and (max-width: 1024px) {
        width: calc(50% - 40px);
    }

    @media screen and (max-width: 768px) {
        width: calc(50% - 40px);
    }
`;

const ReviewItem = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    border-radius: 8px;
    box-shadow: 0px 3px 6px ${(props) => props.theme.shadowColor};
    &:hover {
        background-color: silver;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        margin-bottom: 5px;
    }
`;

const ReviewItemTitle = styled.h3`
    //background-color: #00000062;
    //margin-left: 10px;
    display: flex;
    align-items: center;
    margin: 10px 0px;
    /* padding: 25px 10px; */
    /* height: 60px; */
    color: black;
    //line-height: 40px;
`;

const LocationText = styled.div`
    font-size: 14px;
`;

const ReviewList = ({ loading, list, onItemClick }) => {
    if (!loading || !list) {
        return (
            <ReviewListContainer>
                <Loading />
            </ReviewListContainer>
        );
    }

    return (
        <ReviewListContainer>
            {list && list.length > 0 ? (
                list.map((v, i) => (
                    <ReviewListItem key={i} onClick={() => onItemClick(v.reviewId)}>
                        <img src={v.thumbnail ? v.thumbnail : tempImage} />
                        <ReviewItemTitle>{v.title}</ReviewItemTitle>
                        <LocationText>서울</LocationText>
                    </ReviewListItem>
                ))
            ) : (
                <ReviewListEmtpy>데이터가 없습니다.</ReviewListEmtpy>
            )}
        </ReviewListContainer>
    );
};

export default ReviewList;
