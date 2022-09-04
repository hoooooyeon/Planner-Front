import Spot from '../components/spot/Spot';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SpotSlider from '../components/spot/SpotSlider';
import SpotList from '../components/spot/SpotList';

const SpotPage = () => {
  return (
    <>
      <Header />
      <Spot>
        <SpotSlider />
        <SpotList />
      </Spot>
      <Footer />
    </>
  );
};

export default SpotPage;
