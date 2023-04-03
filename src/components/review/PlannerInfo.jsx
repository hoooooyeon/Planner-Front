import styled from 'styled-components';
import tempImage from '../../images/temp.jpg';

const SelectMessage = styled.b`
    padding: 50px 40px;
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

const PlannerInfo = (props) => {
    const { info } = props;
    return (
        <>
            {info ? (
                <>
                    <Image src={tempImage} />
                    <FlexBox>
                        <b>제목: {info.title}</b>
                        <b>생성자: {info.creator}</b>
                        <b>여행비용: {info.expense}</b>
                    </FlexBox>
                </>
            ) : (
                <SelectMessage>플래너를 선택해주세요..</SelectMessage>
            )}
        </>
    );
};

export default PlannerInfo;
