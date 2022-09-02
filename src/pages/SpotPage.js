import Spot from '../components/spot/Spot';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SpotInfoContainer from '../containers/spot/SpotInfoContainer';

const SpotPage = () => {
  return (
    <>
      <Header />
      <Spot>
        <SpotInfoContainer />
      </Spot>
      <Footer />
    </>
  );
};

export default SpotPage;
