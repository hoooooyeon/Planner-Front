import styled from 'styled-components';

const InfoMenuBlock = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    padding: 0.5rem 0;
`;

const Container = styled.div`
    border-top: 1px solid ${(props) => props.theme.outlineColor};
    border-bottom: 1px solid ${(props) => props.theme.outlineColor};
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0.1rem 0.5rem;
    @media all and (min-width: 400px) {
        padding: 0.1rem 1rem;
    }
    @media all and (min-width: 768px) {
        padding: 0 9rem;
    }
    @media all and (min-width: 1024px) {
        align-items: center;
        flex-direction: row;
    }
`;

const InfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    @media all and (min-width: 400px) {
        padding: 1rem;
    }
`;

const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    overflow: hidden;
`;

const Ask = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 0.6rem;
    @media all and (min-width: 400px) {
        margin-right: 1rem;
        font-size: 0.8rem;
    }
    @media all and (min-width: 1024px) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const Text = styled.div`
    font-weight: bold;
    font-size: 0.7rem;
    @media all and (min-width: 400px) {
        font-size: 0.9rem;
    }
    @media all and (min-width: 1024px) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const InfoMenu = ({ planner }) => {
    const { title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const memberTypeList = ['혼자', '연인', '친구', '가족'];

    return (
        <InfoMenuBlock>
            <Container>
                <FlexDiv>
                    <InfoBox>
                        <Ask>플래너 이름:</Ask>
                        <Text>{title}</Text>
                    </InfoBox>
                    <InfoBox>
                        <Ask>여행 일정:</Ask>
                        <Text>
                            {planDateStart} ~ {planDateEnd}
                        </Text>
                    </InfoBox>
                </FlexDiv>
                <FlexDiv>
                    <InfoBox>
                        <Ask>여행 멤버:</Ask>
                        <Text>
                            {memberTypeList[memberTypeId - 1]} ({memberCount}명)
                        </Text>
                    </InfoBox>
                    <InfoBox>
                        <Ask>여행 비용:</Ask>
                        <Text>{expense}원</Text>
                    </InfoBox>
                </FlexDiv>
            </Container>
        </InfoMenuBlock>
    );
};

export default InfoMenu;
