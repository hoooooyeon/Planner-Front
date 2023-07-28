import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Slider from '../common/Slider';
import serviceImg1 from '../../lib/images/serviceImg1.jpg';
import serviceImg2 from '../../lib/images/serviceImg2.jpg';
import serviceImg3 from '../../lib/images/serviceImg3.jpg';

const HomeServicesBlock = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgb(250, 244, 235);
`;

const Container = styled.div`
    margin: 0 auto;
    position: relative;
    padding: 3rem 0 8rem;
    @media all and (max-width: 767px) {
        padding-left: 1rem;
        padding-right: 1rem;
    }
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
    & + & {
        margin-left: 1rem;
    }
`;

const OverviewBox = styled.div`
    width: 250px;
    font-weight: bold;
    color: gray;
    p {
        font-size: 0.8rem;
    }
    p + p {
        margin-top: 0;
    }
    @media all and (min-width: 1024px) {
        width: 350px;
    }
    @media all and (min-width: 1200px) {
        width: 390px;
    }
`;

const ImgBox = styled.div`
    position: relative;
`;

const Img = styled.img`
    border: none;
    object-fit: cover;
    -webkit-user-drag: none;
    &:hover {
        cursor: pointer;
    }
    width: 250px;
    height: 300px;
    @media all and (min-width: 1024px) {
        width: 350px;
        height: 400px;
    }
    @media all and (min-width: 1200px) {
        width: 390px;
        height: 450px;
    }
`;

const ImgOveray = styled.div`
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: black;
    z-index: 1;
    p:first-child {
        font-size: 1.2rem;
        font-weight: bold;
    }
    p {
        font-size: 1rem;
    }
    a {
        color: black;
        text-decoration: none;
        z-index: 999;
    }
    width: 250px;
    height: 300px;
    @media all and (min-width: 1024px) {
        width: 350px;
        height: 400px;
    }
    @media all and (min-width: 1200px) {
        width: 390px;
        height: 450px;
    }
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    margin-left: 10px;
`;

const LeftIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 39%;
    left: 60px;
    z-index: 1;
    font-size: 2rem;
    color: lightgoldenrodyellow;
    opacity: 0.7;
    display: none;
    @media all and (max-width: 767px) {
        display: inline-block;
    }
`;

const RightIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 39%;
    right: 25px;
    z-index: 1;
    font-size: 2rem;
    color: lightgoldenrodyellow;
    opacity: 0.7;
    display: none;
    @media all and (max-width: 767px) {
        display: inline-block;
    }
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
    const [isOveray, setIsOveray] = useState();
    const onUpdateOveray = (e, index) => {
        setIsOveray(index);
    };

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
                                <ServiceItem ref={itemRef}>
                                    <ImgBox
                                        onMouseEnter={(e) => onUpdateOveray(e, i)}
                                        onMouseLeave={(e) => onUpdateOveray(e, null)}
                                    >
                                        <Img alt={s.title} src={s.firstimage} />
                                        {isOveray === i && (
                                            <ImgOveray>
                                                <p>{s.title}</p>
                                                <Link to={s.link}>
                                                    <p>
                                                        learn more
                                                        <StyledFontAwesomeIcon icon={faChevronRight} />
                                                    </p>
                                                </Link>
                                            </ImgOveray>
                                        )}
                                    </ImgBox>
                                    <OverviewBox>
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
