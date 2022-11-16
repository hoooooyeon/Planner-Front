import styled from 'styled-components';
import HomeReview from './HomeReview';
import HomeShare from './HomeShare';
import HomeSpot from './HomeSpot';
import Intro from './Intro';

const HomeBlock = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 100%;
  
`;

const Home = () => {
  return (
    <HomeBlock>
      <Intro />
      <HomeShare />
      <HomeReview />
      <HomeSpot />
    </HomeBlock>
  );
};

export default Home;
