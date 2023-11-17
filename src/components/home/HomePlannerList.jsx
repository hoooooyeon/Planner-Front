import { useRef } from 'react';
import styled from 'styled-components';
import errorImg from '../../lib/images/plannerErrorImg.png';
import { handleErrorImg } from '../../lib/utils/CommonFunction';
import Empty from '../common/Empty';
import Loading from '../common/Loading';

const HomePlannerListBlock = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 6rem 1rem;
    @media all and (min-width: 481px) {
        padding: 6rem 3rem;
    }
    @media all and (min-width: 769px) {
        padding: 6rem 9rem;
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 6rem;
    h3 {
        margin: 0;
    }
    p {
        color: ${(props) => props.theme.secondaryColor};
    }
`;

const PlannerList = styled.ul`
    list-style-type: none;
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    @media all and (max-width: 480px) {
        flex-direction: column;
    }
    @media all and (min-width: 481px) and (max-width: 768px) {
        flex-wrap: wrap;
    }
`;

const PlannerItem = styled.li`
    float: left;
    flex-shrink: 0;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    border-radius: 0.5rem;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    cursor: pointer;
    margin: 0.5rem;
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
    @media all and (min-width: 481px) and (max-width: 768px) {
        width: 45%;
    }
    @media all and (min-width: 769px) {
        & + & {
            margin-left: 0.5rem;
        }
        margin: 0;
        width: 33%;
    }
    @media all and (min-width: 1025px) {
        width: 24%;
    }
`;

const ImgBox = styled.div`
    margin: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
    padding-top: 30%;
    @media all and (min-width: 481px) {
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
    box-shadow: 0 -1px 1px ${(props) => props.theme.shadowColor};
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
    font-size: 0.7rem;
    color: ${(props) => props.theme.tertiaryColor};
    margin-top: 0.5rem;
    overflow: hidden;
`;

const HomePlannerList = ({ sharePlanners, loading, onClickPlanner }) => {
    const itemRef = useRef();

    return (
        <HomePlannerListBlock>
            <Container>
                <Header>
                    <h3>다른 여행객들의 플래너</h3>
                    <p>먼저 여행을 끝마친 여행객들의 플래너를 구경 해보세요.</p>
                </Header>
                {loading.plannerLoading ? (
                    // && Object.keys(sharePlanners).length <= 0
                    <Loading />
                ) : Object.keys(sharePlanners).length > 0 && sharePlanners.list.length > 0 ? (
                    <PlannerList>
                        {sharePlanners.list.map((p) => (
                            <PlannerItem ref={itemRef} key={p.plannerId} onClick={() => onClickPlanner(p.plannerId)}>
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
                                    <Date>
                                        {p.planDateStart} ~ {p.planDateEnd}
                                    </Date>
                                </InfoBox>
                            </PlannerItem>
                        ))}
                    </PlannerList>
                ) : (
                    <Empty text="플래너" />
                )}
            </Container>
        </HomePlannerListBlock>
    );
};

export default HomePlannerList;
