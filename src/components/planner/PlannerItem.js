import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const PlannerItemBlock = styled.div`
  width: 280px;
  height: 350px;
  margin: 10px;
  /* text-align: center; */
  border: 1px solid ${palette.ivory[0]};
  border-radius: 5%;
  box-shadow: 3px 3px 7px 1px ${palette.gray[1]};
`;

const Title = styled.p`
  font-size: 1.2rem;
  margin: 10px;
`;
const Date = styled.p`
  font-size: 0.9rem;
  margin: 10px;
`;

const SimpleMap = styled.div`
  width: 280px;
  height: 270px;
`;

const PlannerItem = () => {
  return (
    <PlannerItemBlock>
      <SimpleMap />
      <Title>천안 일대기</Title>
      <Date>2020년 11월 11일 ~ 2022년 7월 29일</Date>
    </PlannerItemBlock>
  );
};

export default PlannerItem;
