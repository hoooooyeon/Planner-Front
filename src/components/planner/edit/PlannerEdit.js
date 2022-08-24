import styled from 'styled-components';
import EditItinerary from './EditItinerary';
import EditList from './EditList';
import EditMap from './EditMap';

const PlannerEditBlock = styled.div`
  margin: 100px auto;
`;

const PlannerEdit = () => {
  return (
    <PlannerEditBlock>
      <EditItinerary />
      <EditMap />
      <EditList />
    </PlannerEditBlock>
  );
};

export default PlannerEdit;
