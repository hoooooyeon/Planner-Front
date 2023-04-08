import styled from 'styled-components';
import tempImage from '../../images/temp.jpg';

const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    //border: 1px solid silver;
    border-radius: 6px;
    margin: 10px;

    &:hover {
        background-color: #f2f2f2;
    }
`;

const SelectMessage = styled.b`
    padding: ${(props) => (props.viewMode ? '0px 0px' : '50px 40px')};
`;

const Image = styled.img`
    padding: 10px;
    width: 100px;
    height: 80px;
`;

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    //color: white;

    b {
        display: block;
    }
`;

const PlannerInfo = ({ planner, viewMode }) => {
    return (
        <InfoBox>
            {planner ? (
                <>
                    <Image src={tempImage} />
                    <FlexBox>
                        <b>제목: {planner.title}</b>
                        <b>생성자: {planner.creator}</b>
                        <b>여행비용: {planner.expense}</b>
                    </FlexBox>
                </>
            ) : (
                <SelectMessage viewMode={viewMode}>{viewMode ? '선택한 플래너가 없습니다.' : '플래너를 선택해주세요.'}</SelectMessage>
            )}
        </InfoBox>
    );
};

export default PlannerInfo;
