import styled from 'styled-components';

const InfoMenuBlock = styled.div`
    background-color: white;
    padding: 0.5rem 0;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 0.1rem 1rem;
    flex-direction: column;
    @media all and (min-width: 768px) {
        padding: 0 9rem;
    }
    @media all and (min-width: 1024px) {
        align-items: center;
        flex-direction: row;
    }
`;

const InfoBox = styled.div`
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FlexDiv = styled.div`
    display: flex;
    align-items: center;
`;

const Ask = styled.div`
    font-size: 0.8rem;
    color: gray;
    margin-right: 1rem;
    font-weight: bold;
    @media all and (min-width: 1024px) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const Text = styled.div`
    font-size: 0.9rem;
    font-weight: bold;
    font-weight: bold;
    @media all and (min-width: 1024px) {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const InfoMenu = ({ planner }) => {
    const { title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };

    const memberTypeList = ['혼자', '연인', '친구', '가족'];

    if (!planner) {
        return <div>Loading...</div>;
    }
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
