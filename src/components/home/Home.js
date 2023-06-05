import styled from 'styled-components';
// import PlannerList from '../planner/PlannerList';
import Intro from './Intro';
import SpotSlider from '../spot/SpotSlider';
// import ReviewList from '../review/ReviewList';

const HomeBlock = styled.div`
  margin: 100px auto;
  width: 80%;
`;

const Home = () => {
  return (
    <HomeBlock>
      <Intro />
      <PlannerList type="home" />
      {/* <ReviewList type="home" /> */}
      <SpotSlider home="true" />
    </HomeBlock>
  );
};

export default Home;
