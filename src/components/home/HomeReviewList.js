import styled from 'styled-components';
import Slider from '../common/Slider';

const HomeReviewListBlock = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: rgb(250, 244, 235);
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 6rem 1rem;
    @media all and (min-width: 400px) {
        padding: 6rem;
    }
    @media all and (min-width: 768px) {
        padding: 6rem 9rem;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 6rem;
    h3 {
        margin: 0;
    }
`;

const ReviewList = styled.ul`
    list-style-type: none;
    height: 100%;
    width: calc(100% - 3rem);
    padding: 0;
    display: flex;
`;

const ReviewItem = styled.li`
    width: 24%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background-color: white;
    cursor: pointer;
    & + & {
        margin-left: 1rem;
    }
    &:hover {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    }
`;
const ImgBox = styled.div`
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
    margin-top: 0.5rem;
    overflow: hidden;
`;

const HomeReviewList = () => {
    return (
        <HomeReviewListBlock>
            <Container>
                <Header>
                    <h3>다른 이용자들의 여행 후기</h3>
                    <p>먼저 여행을 다녀온 이용자들의 여행 후기를 살펴보세요.</p>
                </Header>
                <ReviewList>
                    <ReviewItem>
                        <ImgBox>
                            <Img />
                        </ImgBox>
                        <InfoBox>
                            <Title>1</Title>
                            <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
                        </InfoBox>
                    </ReviewItem>{' '}
                    <ReviewItem>
                        <ImgBox>
                            <Img />
                        </ImgBox>
                        <InfoBox>
                            <Title>1</Title>
                            <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
                        </InfoBox>
                    </ReviewItem>{' '}
                    <ReviewItem>
                        <ImgBox>
                            <Img />
                        </ImgBox>
                        <InfoBox>
                            <Title>1</Title>
                            <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
                        </InfoBox>
                    </ReviewItem>{' '}
                    <ReviewItem>
                        <ImgBox>
                            <Img />
                        </ImgBox>
                        <InfoBox>
                            <Title>1</Title>
                            <Date>2020년 11월 11일 ~ 2022년 17월 29일</Date>
                        </InfoBox>
                    </ReviewItem>
                </ReviewList>
            </Container>
        </HomeReviewListBlock>
    );
};

export default HomeReviewList;
