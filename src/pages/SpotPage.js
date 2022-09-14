import Spot from '../components/spot/Spot';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SpotSlider from '../components/spot/SpotSlider';
import SpotListContainer from '../containers/spot/SpotListContainer';

const SpotPage = () => {
  return (
    <>
      <Header />
      <Spot>
        <SpotSlider />
        <SpotListContainer />
      </Spot>
      <Footer />
    </>
  );
};

export default SpotPage;
