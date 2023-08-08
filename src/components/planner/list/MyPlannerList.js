import { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from '../../common/Slider';
import { handleErrorImg } from '../../../lib/utils/CommonFunction';
import errorImg from '../../../lib/images/plannerErrorImg.png';

const MyPlannerListBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
`;

const Container = styled.div`
    padding: 1rem;
    margin: 0 auto;
    min-height: 10rem;
    @media all and (min-width: 768px) {
        padding: 1rem 9rem;
    }
`;

const PlannerList = styled.ul`
    width: 100%;
    height: 100%;
    display: flex;
    margin: 0 auto;
    padding: 0.5rem 0;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const HeaderTitle = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
`;

const Button = styled.button`
    width: 7rem;
    height: 3rem;
    background-color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
    line-height: 3rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    overflow: auto;
    &::-webkit-scrollbar {
        display: none;
    }
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    a {
        color: black;
        text-decoration: none;
        display: block;
    }
`;
const PlannerItem = styled.li`
    flex-basis: 22.5%;
    height: 20vw;
    position: relative;
    flex-shrink: 0;
    margin-left: 0.5%;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    overflow: hidden;
    &:hover {
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
        transition: transform 0.3s ease;
        transform: translate(0, -5px);
    }
`;
const InfoBox = styled.div`
    height: 4rem;
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
const Creator = styled.div`
    font-size: 0.7rem;
    color: gray;
    overflow: hidden;
    margin-top: 0.2rem;
`;
const Date = styled.div`
    font-size: 0.4rem;
    color: lightgray;
    margin-top: 0.2rem;
    overflow: hidden;
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
        padding-top: 55%;
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

const ErrorDiv = styled.div`
    color: lightgray;
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
`;

const MyPlannerList = ({
    plannerError,
    myPlanners,
    onCreatePlanner,
    onClickPlanner,
    onPreviousPage,
    onNextPage,
    drag,
}) => {
    const itemRef = useRef();

    if (plannerError) {
        return <div>Loading...</div>;
    }
    return (
        <MyPlannerListBlock>
            <Container>
                <Header>
                    <HeaderTitle>나의 플래너</HeaderTitle>
                    <Button onClick={onCreatePlanner}>
                        {/* <Link to="/Planners/edit" onClick={onCreatePlanner}> */}
                        플래너 생성
                        {/* </Link> */}
                    </Button>
                </Header>

                {myPlanners && myPlanners.list && myPlanners.list.length > 0 ? (
                    <Slider
                        list={myPlanners.list}
                        itemRef={itemRef}
                        drag={drag}
                        page={true}
                        prevPage={onPreviousPage}
                        nextPage={onNextPage}
                    >
                        <PlannerList>
                            {myPlanners.list.map((p) => (
                                <PlannerItem
                                    key={p.plannerId}
                                    ref={itemRef}
                                    onClick={() => {
                                        onClickPlanner(p.plannerId);
                                    }}
                                >
                                    <ImgBox>
                                        <Img
                                            src={p.thumbnail}
                                            alt={p.title}
                                            onError={(e) => {
                                                handleErrorImg({ e, errorImg });
                                            }}
                                        />
                                    </ImgBox>
                                    <InfoBox>
                                        <Title>{p.title}</Title>
                                        <Creator>{p.creator}</Creator>
                                        <Date>
                                            {p.planDateStart} ~ {p.planDateEnd}
                                        </Date>
                                    </InfoBox>
                                </PlannerItem>
                            ))}
                        </PlannerList>
                    </Slider>
                ) : (
                    <ErrorDiv>플래너가 없습니다.</ErrorDiv>
                )}
            </Container>
        </MyPlannerListBlock>
    );
};

export default MyPlannerList;
