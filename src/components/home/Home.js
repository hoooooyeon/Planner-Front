import styled from 'styled-components';
import ShareList from '../share/ShareList';
import Intro from './Intro';
import SpotSlider from '../spot/SpotSlider';
import ReviewList from '../review/ReviewList';

const HomeBlock = styled.div`
  margin: 100px auto;
  width: 80%;
  border: 1px solid red;
`;

const Home = () => {
  return (
    <HomeBlock>
      <Intro />
      <ShareList />
      <ReviewList />
      <SpotSlider home />
    </HomeBlock>
  );
};

export default Home;
