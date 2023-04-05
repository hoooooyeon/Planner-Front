import Spot from '../components/spot/Spot';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SpotListContainer from '../containers/spot/SpotListContainer';
import SpotPaginationContainer from '../containers/spot/SpotPaginationContainer';
import SpotSliderContainer from '../containers/spot/SpotSliderContainer';

const SpotPage = () => {
    return (
        <>
            <Header />

            <SpotSliderContainer />
            <SpotListContainer />
            <SpotPaginationContainer />
            <Footer />
        </>
    );
};

export default SpotPage;
