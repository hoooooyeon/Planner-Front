import styled from 'styled-components';
import Loading from '../../common/Loading';

const InfoMenuBlock = styled.div`
    background-color: ${(props) => props.theme.primaryBackgroundColor};
    padding: 0.5rem 0;
`;

const Container = styled.div`
    border-top: 1px solid ${(props) => props.theme.outlineColor};
    border-bottom: 1px solid ${(props) => props.theme.outlineColor};
    height: 100%;
    min-height: 6rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 0.1rem 0.5rem;
    overflow: hidden;
    @media all and (min-width: 481px) {
        padding: 0.1rem 1rem;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: row;
    }
    @media all and (min-width: 769px) {
        padding: 0 9rem;
    }
    @media all and (min-width: 1025px) {
    }
`;
const FlexDiv = styled.div`
    display: flex;
    align-items: center;
    align-items: flex-start;
    flex-direction: column;
    @media all and (min-width: 481px) {
    }
    @media all and (min-width: 769px) {
        flex-direction: row;
        justify-content: space-between;
    }
    @media all and (min-width: 1025px) {
        width: 70%;
        justify-content: space-evenly;
    }
`;

const InfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
`;

const Ask = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    margin-right: 0.5rem;
    font-weight: bold;
    font-size: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    @media all and (min-width: 361px) {
        font-size: 0.8rem;
        white-space: nowrap;
    }
    @media all and (min-width: 481px) {
    }
    @media all and (min-width: 1025px) {
        font-size: 0.9rem;
    }
`;

const Text = styled.div`
    font-weight: bold;
    font-size: 0.8rem;
    border-radius: 1rem;
    box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    padding: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 10rem;
    @media all and (min-width: 361px) {
        white-space: nowrap;
    }
    @media all and (min-width: 769px) {
        font-size: 0.8rem;
    }
    @media all and (min-width: 1025px) {
        font-size: 0.9rem;
    }
`;

const Date = styled(Text)`
    max-width: 12rem;
`;

const InfoMenu = ({ planner, loading }) => {
    const { title, planDateStart, planDateEnd, expense, memberCount, memberTypeId } = { ...planner };
    const memberTypeList = ['혼자', '연인', '친구', '가족'];

    return (
        <InfoMenuBlock>
            <Container>
                {loading.plannerLoading ? (
                    <Loading size="small" />
                ) : (
                    <>
                        <FlexDiv>
                            <InfoBox>
                                <Ask>플래너 이름</Ask>
                                <Text>{title}</Text>
                            </InfoBox>
                            <InfoBox>
                                <Ask>여행 일정</Ask>
                                <Date>
                                    {planDateStart} ~ {planDateEnd}
                                </Date>
                            </InfoBox>
                        </FlexDiv>
                        <FlexDiv>
                            <InfoBox>
                                <Ask>여행 멤버</Ask>
                                <Text>
                                    {memberTypeList[memberTypeId - 1]} ({memberCount}명)
                                </Text>
                            </InfoBox>
                            <InfoBox>
                                <Ask>여행 비용</Ask>
                                <Text>{expense}원</Text>
                            </InfoBox>
                        </FlexDiv>
                    </>
                )}
            </Container>
        </InfoMenuBlock>
    );
};

export default InfoMenu;
