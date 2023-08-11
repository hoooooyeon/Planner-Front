import { useState } from 'react';
import styled from 'styled-components';

const HomeSpotListBlock = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: var(--md-sys-color-background);
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 3rem 0 8rem;
`;
const Header = styled.div`
    text-align: center;
    margin-bottom: 3rem;
    h3 {
        margin: 0 0 1rem 0;
    }
    p {
        color: var(--md-sys-color-on-primary-container);
    }
`;

const SpotList = styled.ul`
    list-style-type: none;
    height: 100%;
    margin: 0 auto;
    display: inline-block;
    width: 100%;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    @media all and (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const SpotItem = styled.li`
    position: relative;
`;

const ImgOveray = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    p {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-weight: bold;
        font-size: 0.8rem;
    }
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
    border: none;
    margin: auto;
    display: block;
`;

const Text = styled.div`
    font-size: 0.9rem;
    color: var(--md-sys-color-on-primary-container);
    & + & {
        margin-top: 0.5rem;
    }
`;

const HomeSpotList = () => {
    const spotArr = [
        {
            title: '강남',
            areaCode: 1,
            contenttypeid: 12,
            contentid: 264570,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg',
        },
        {
            title: '경복궁',
            areaCode: 1,
            contenttypeid: 12,
            contentid: 126508,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/23/2678623_image2_1.jpg',
        },
        {
            title: '관악산',
            areaCode: 1,
            contenttypeid: 12,
            contentid: 126480,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/30/1857230_image2_1.jpg',
        },
        {
            title: '광주천 벚꽃길',
            areaCode: 5,
            contenttypeid: 12,
            contentid: 2774295,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/99/2793199_image2_1.jpg',
        },
        {
            title: '월봉서원',
            areaCode: 5,
            contenttypeid: 12,
            contentid: 1955610,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/87/2675687_image2_1.jpg',
        },
        {
            title: '대왕암공원',
            areaCode: 7,
            contenttypeid: 12,
            contentid: 127515,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/75/2712575_image2_1.jpg',
        },
        {
            title: '강릉 경포해수욕장',
            areaCode: 31,
            contenttypeid: 12,
            contentid: 128758,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/22/2671422_image2_1.jpg',
        },
        {
            title: '거문오름',
            areaCode: 39,
            contenttypeid: 12,
            contentid: 636266,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/62/2661662_image2_1.jpg',
        },
        {
            title: '고산일과 해안도로',
            areaCode: 39,
            contenttypeid: 12,
            contentid: 2779522,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/47/2800647_image2_1.jpg',
        },
        {
            title: '김녕사굴',
            areaCode: 39,
            contenttypeid: 12,
            contentid: 126453,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/37/1618237_image2_1.jpg',
        },
        {
            title: '마라도등대',
            areaCode: 39,
            contenttypeid: 12,
            contentid: 129145,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/15/2617815_image2_1.jpg',
        },
        {
            title: '한라산',
            areaCode: 39,
            contenttypeid: 12,
            contentid: 127635,
            firstimage: 'http://tong.visitkorea.or.kr/cms/resource/99/2870099_image2_1.jpg',
        },
    ];

    const [isOveray, setIsOveray] = useState();
    const onUpdateOveray = (index) => {
        setIsOveray(index);
    };

    return (
        <HomeSpotListBlock>
            <Container>
                <Header>
                    <h3>여행지 리스트</h3>
                    <Text>한국의 다양한 여행지들을 만나보세요.</Text>
                    <Text>구석구석 숨어있는 특별한 장소와 여정들이 당신을 기다리고 있을지도 몰라요.</Text>
                </Header>
                <SpotList>
                    {spotArr &&
                        spotArr.map((s, i) => (
                            <SpotItem
                                key={i}
                                onMouseEnter={() => onUpdateOveray(i)}
                                onMouseLeave={() => onUpdateOveray(null)}
                            >
                                <Img alt={s.title} src={s.firstimage} />
                                {isOveray === i && (
                                    <ImgOveray>
                                        <p>{s.title}</p>
                                    </ImgOveray>
                                )}
                            </SpotItem>
                        ))}
                </SpotList>
            </Container>
        </HomeSpotListBlock>
    );
};

export default HomeSpotList;
