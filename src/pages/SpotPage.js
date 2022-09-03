import Spot from '../components/spot/Spot';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SpotInfoContainer from '../containers/spot/SpotInfoContainer';
import SpotMenuContainer from '../containers/spot/SpotMenuContainer';

const SpotPage = () => {
  return (
    <>
      <Header />
      <Spot>
        <SpotMenuContainer />
        {/* <SpotInfoContainer /> */}
      </Spot>
      <Footer />
    </>
  );
};

export default SpotPage;
