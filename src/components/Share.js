import styled from 'styled-components';
import PlannerList from './planner/PlannerList';

const ShareBlock = styled.div`
  margin: 100px auto 0px;
  width: 80%;
`;

const Share = () => {
  return (
    <ShareBlock>
      <PlannerList type="share" />
    </ShareBlock>
  );
};

export default Share;
