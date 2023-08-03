import styled from 'styled-components';
import footerImg from '../../lib/images/footerImg.jpg';

const FooterBlock = styled.div`
    width: 100%;
    /* height: 450px; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const RelativeDiv = styled.div`
    position: relative;
    background-color: rgba(0, 0, 0, 0.3);
`;

const FooterBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 2rem 1rem;
    flex-direction: column;
    p {
        margin: 0.3rem 0;
    }
    h3 {
        margin: 0.5rem 0;
        white-space: nowrap;
    }
    div + div {
        margin-top: 0.5rem;
    }
    @media all and (min-width: 768px) {
        flex-direction: row;
        padding: 2rem 4rem;
        div + div {
            margin-top: 0;
        }
    }
    @media all and (min-width: 1024px) {
        padding: 2rem 6rem;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 460px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
`;

const Music = styled.div`
    display: flex;
    flex-direction: column;
    h3 {
        font-size: 1.2rem;
    }
    p {
        font-size: 0.9rem;
    }

    @media all and (max-width: 767px) {
        align-items: center;
    }
`;

const MusicImg = styled.img`
    background-color: black;
    width: 120px;
    height: 120px;
    @media all and (max-width: 767px) {
        display: none;
    }
`;

const Writing = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    margin-left: 1rem;
    h3 {
        font-size: 1.2rem;
    }
    p {
        font-size: 0.9rem;
    }
    @media all and (max-width: 767px) {
        align-items: center;
    }
`;

const Logo = styled.div`
    height: 150px;
    background-color: rgb(216, 206, 192);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div:first-child {
        font-size: 0.9rem;
    }
    div:last-child {
        font-size: 1.5rem;
        font-weight: bold;
    }
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1rem;
    p {
        font-size: 0.9rem;
    }

    @media all and (max-width: 767px) {
        /* margin-left: 0; */
        align-items: center;
    }
`;

const FlexDiv = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: 10px;
    p {
        margin-bottom: 0;
    }
    p + p {
        margin: 0;
    }
`;

const Footer = () => {
    return (
        <FooterBlock>
            <RelativeDiv>
                <Img alt="footerImg" src={footerImg} />
                <FooterBox>
                    <Music>
                        <h3>Currently vibing to:</h3>
                        <MusicImg />
                        <p>The Weekend (Funk Wav Remix)</p>
                        <p>By SZA, Calvin Harris, Funk Wav</p>
                    </Music>
                    <Writing>
                        <h3>Travel Quotes:</h3>
                        <p>I am not the same, having seen the moon shine on the other side of the world. </p>
                    </Writing>
                    <Info>
                        <FlexDiv>
                            <p>Tel: </p>
                            <ColumnDiv>
                                <p> 010-****-****</p>
                                <p> 010-****-****</p>
                            </ColumnDiv>
                        </FlexDiv>
                        <FlexDiv>
                            <p>Email:</p>
                            <ColumnDiv>
                                <p> B*******@gmail.com</p>
                                <p> l******@gmail.com</p>
                            </ColumnDiv>
                        </FlexDiv>
                    </Info>
                </FooterBox>
            </RelativeDiv>
            <Logo>
                <div>대한민국 여행의 전부</div>
                <div>한국다봄</div>
            </Logo>
        </FooterBlock>
    );
};

export default Footer;
