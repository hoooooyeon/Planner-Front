import { useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Slider from '../common/Slider';
import serviceImg1 from '../../lib/images/serviceImg1.jpg';
import serviceImg2 from '../../lib/images/serviceImg2.jpg';
import serviceImg3 from '../../lib/images/serviceImg3.jpg';

const HomeServicesBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
`;

const Container = styled.div`
    margin: 0 auto;
    position: relative;
    padding: 3rem 1rem 8rem;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    h3 {
        margin: 0;
    }
`;

const ServiceList = styled.ul`
    margin: 0 auto;
    display: flex;
    padding: 0;
`;

const ServiceItem = styled.li`
    display: flex;
    flex-direction: column;
    width: 33.33%;
    & + & {
        margin-left: 1rem;
    }
`;

const OverviewBox = styled.div`
    width: 100%;
    font-weight: bold;
    color: ${(props) => props.theme.secondaryColor};
    p {
        font-size: 0.8rem;
        text-align: center;
    }
    p + p {
        margin-top: 0;
    }
`;

const ImgBox = styled.div`
    position: relative;
`;

const Img = styled.img`
    border: none;
    object-fit: cover;
    -webkit-user-drag: none;
    width: 100%;
    height: 300px;
    @media all and (min-width: 1025px) {
        height: 400px;
    }
`;

const LeftIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 37%;
    left: 7%;
    z-index: 1;
    font-size: 2rem;
    color: ${(props) => props.theme.tertiaryColor};
    opacity: 0.7;
    display: none;
    @media all and (max-width: 768px) {
        display: inline-block;
    }
`;

const RightIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 37%;
    right: 7%;
    z-index: 1;
    font-size: 2rem;
    color: ${(props) => props.theme.tertiaryColor};
    opacity: 0.7;
    display: none;
    @media all and (max-width: 768px) {
        display: inline-block;
    }
`;

const Title = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    color: ${(props) => props.theme.secondaryColor};
    text-align: center;
    margin-top: 0.5rem;
`;

const HomeServices = () => {
    const serviceArr = [
        {
            title: 'Planner',
            link: '/PlannerList',
            firstimage: serviceImg1,
            overview1: '다른 여행자들의 플래너를 살펴보고, 동료들과 직접 여행 계획을 세워보세요.',
        },
        {
            title: 'Community',
            link: '/ReviewList',
            firstimage: serviceImg2,
            overview1: '여행을 끝낸 여행자들의 후기를 살펴보세요.',
            overview2: '그리고 여행자들끼리 여행 정보를 공유해보세요.',
        },
        {
            title: 'Spot',
            link: '/Spot',
            firstimage: serviceImg3,
            overview1: '가고 싶은 여행지를 검색해보고 그 여행지에 대한 정보를 얻어보세요.',
        },
    ];
    const itemRef = useRef();

    return (
        <HomeServicesBlock>
            <Container>
                <Header>
                    <h3>Services</h3>
                </Header>
                <LeftIcon icon={faCircleChevronLeft} />
                <Slider scroll={true} list={serviceArr} itemRef={itemRef}>
                    <ServiceList>
                        {serviceArr &&
                            serviceArr.map((s, i) => (
                                <ServiceItem key={i} ref={itemRef}>
                                    <ImgBox>
                                        <Img alt={s.title} src={s.firstimage} />
                                    </ImgBox>
                                    <OverviewBox>
                                        <Title>{s.title}</Title>
                                        <p>{s.overview1}</p>
                                        <p>{s.overview2}</p>
                                    </OverviewBox>
                                </ServiceItem>
                            ))}
                    </ServiceList>
                </Slider>
                <RightIcon icon={faCircleChevronRight} />
            </Container>
        </HomeServicesBlock>
    );
};

export default HomeServices;
