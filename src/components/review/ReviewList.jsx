import styled from 'styled-components';
import Loading from '../common/Loading';
import tempImage from '../../lib/images/plannerErrorImg.png';

const ReviewListContainer = styled.ul`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    list-style: none;
    padding: 0px;
    margin: 0.625rem 0rem;
`;

const ReviewListEmtpy = styled.b`
    margin: 0px auto;
    padding: 5rem;
`;

const ReviewListItem = styled.li`
    margin: 0.625rem 0.3125rem;
    padding: 0.3125rem;
    width: calc(20% - 0.625rem);
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
        margin-bottom: 0.3125rem;
    }

    @media screen and (min-width: 1024px) and (max-width: 1440px) {
        width: calc(20% -0.625rem);
    }

    @media screen and (max-width: 1024px) {
        width: calc(33.33% - 0.625rem);
    }

    @media screen and (max-width: 768px) {
        width: calc(50% - 0.625rem);
    }

    @media screen and (max-width: 480px) {
        width: calc(50% - 0.625rem);
    }
`;

const ReviewItemTitle = styled.h3`
    display: flex;
    align-items: center;
    margin: 0.625rem 0rem;
    color: black;
`;

const LocationText = styled.div`
    font-size: 0.875rem;
`;

const ReviewList = ({ loading, list, onItemClick }) => {
    if (loading && !list) {
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
                        <img src={v.thumbnail ? `/api/upload/files/${v.thumbnail}` : tempImage} />
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
