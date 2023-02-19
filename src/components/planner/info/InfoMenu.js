import styled from 'styled-components';

const InfoMenuBlock = styled.div`
    width: 100%;
    height: 120px;
`;

const Container = styled.div`
    height: calc(100% - 16px);
    border: 1px solid rgb(0, 0, 0, 5%);
    border-width: 8px 0 8px 0;
    /* margin: 5px auto; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    /* @media all and (min-width: 768px) {
    width: 738px;
  } */
    @media all and (min-width: 960px) {
        /* width: 930px; */
        padding: 0 100px;
    }
    /* @media all and (min-width: 1280px) {
    width: 1024px;
  } */
`;

const InfoBox = styled.div`
    width: 33%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & + & {
        border-left: 3px dotted lightgray;
    }
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
`;

const Ask = styled.div`
    font-size: 0.9rem;
    color: gray;
    margin-right: 5px;
    font-weight: bold;
`;

const Text = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const Date = styled.div`
    font-size: 0.9rem;
    color: lightgray;
`;

const InfoMenu = () => {
    return (
        <InfoMenuBlock>
            <Container>
                <InfoBox>
                    <FlexBox>
                        <Ask>플래너 이름: </Ask>
                        <Text>해적선 이야기</Text>
                    </FlexBox>
                    <Date>2022. 11. 11 ~ 2022. 12. 24</Date>
                </InfoBox>
                <InfoBox>
                    <FlexBox>
                        <Ask>인원: </Ask>
                        <Text>4명 (가족)</Text>
                    </FlexBox>
                </InfoBox>
                <InfoBox>
                    <FlexBox>
                        <Ask>자금: </Ask>
                        <Text>900000원</Text>
                    </FlexBox>
                </InfoBox>
            </Container>
        </InfoMenuBlock>
    );
};

export default InfoMenu;
