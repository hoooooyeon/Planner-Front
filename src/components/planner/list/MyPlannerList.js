import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import Slider from '../../common/Slider';

const MyPlannerListBlock = styled.div`
    width: 100%;
    height: 100%;
    padding: 15px 0;
    background-color: #f5f5f5;
    /* background-color: #f1eee0; */
`;

const Container = styled.div`
    padding: 0 15px;
    margin: 0 auto;
    @media all and (min-width: 768px) {
        width: 738px;
    }
    @media all and (min-width: 960px) {
        width: 930px;
    }
    @media all and (min-width: 1280px) {
        width: 1024px;
    }
`;

const HiddenBox = styled.div`
    overflow: hidden;
    z-index: 1;
`;

const Planners = styled.ul`
    display: flex;
    padding: 10px 0;
    width: 100%;
    height: 100%;
`;

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.p`
    font-size: 1.3rem;
    font-weight: bold;
`;

const Button = styled.button`
    width: 7rem;
    height: 3rem;
    background-color: #9aad67;
    border: none;
    border-radius: 0.5rem;
    font-weight: bolder;
    font-size: 0.9rem;
    text-align: center;
    line-height: 3rem;
    a {
        color: white;
        text-decoration: none;
        display: block;
    }
`;
const PlannerItem = styled.li`
    width: 100%;
    height: 100%;
    flex-basis: 22.5%;
    flex-shrink: 0;
    margin-left: 0.5%;
    background-color: white;
    border: 1px solid ivory;
    border-radius: 0.5rem;
    box-shadow: 3px 3px 7px 1px rgb(0, 0, 0, 30%);
    &:hover {
        cursor: pointer;
        box-shadow: 3px 4px 14px 2px rgb(0, 0, 0, 30%);
        transform: translateY(-5px);
    }
`;
const InfoBox = styled.div`
    height: 60px;
    margin: 0;
    padding: 3px;
    border-top: 1px solid lightgray;
    overflow: hidden;
`;
const Name = styled.p`
    margin: 0 0 8px 0;
    font-size: 0.7rem;
    @media all and (min-width: 768px) {
        font-size: 0.8rem;
    }
    @media all and (min-width: 960px) {
        font-size: 0.9rem;
    }
`;
const Date = styled.p`
    margin: 0;
    font-size: 0.4rem;
    color: gray;
    @media all and (min-width: 768px) {
        font-size: 0.6rem;
    }
    @media all and (min-width: 960px) {
        font-size: 0.7rem;
    }
`;
const Map = styled.div`
    width: 100%;
    height: 100%;
`;

const SimpleMap = styled.div`
    height: 14vw;
    @media all and (min-width: 768px) {
        height: 120px;
    }
    @media all and (min-width: 960px) {
        height: 160px;
    }
    @media all and (min-width: 1280px) {
        height: 190px;
    }
`;

const MyPlannerList = ({ mapRef, plannerError, myPlanners, onResetPlannerInfoForm, onCreatePlanner, onChangeCurPlannerId, prevPage, nextPage }) => {
    const history = useHistory();
    const transition = useRef(false);
    const allowTransition = () => {
        if (transition.current) {
            history.push('/PlannerInfo');
        }
    };
    if (plannerError) {
        return <div>Loading...</div>;
    }
    return (
        <MyPlannerListBlock>
            <Container>
                <TitleBox>
                    <Title>나의 플래너</Title>
                    <Button>
                        <Link to="/PlannerEdit" onClick={onCreatePlanner}>
                            플래너 생성
                        </Link>
                    </Button>
                </TitleBox>

                {myPlanners ? (
                    <Slider list={myPlanners.list} transition={transition} page={true} prevPage={prevPage} nextPage={nextPage}>
                        {myPlanners.list &&
                            myPlanners.list.map((p) => (
                                <PlannerItem
                                    key={p.plannerId}
                                    onClick={() => {
                                        // onLoadPlanner(p.plannerId);
                                        onChangeCurPlannerId(p.plannerId);
                                        allowTransition();
                                    }}
                                >
                                    {/* <Link to="/PlannerInfo"> */}

                                    <Map ref={mapRef} />
                                    <InfoBox>
                                        <Name>{p.title}</Name>
                                        <Date>
                                            {p.planDateStart} ~ {p.planDateEnd}
                                        </Date>
                                    </InfoBox>
                                    {/* </Link> */}
                                </PlannerItem>
                            ))}
                    </Slider>
                ) : (
                    <div>플래너가 없습니다. </div>
                )}
            </Container>
        </MyPlannerListBlock>
    );
};

export default MyPlannerList;
