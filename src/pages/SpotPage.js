import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import SpotListContainer from '../containers/spot/SpotListContainer';
import SpotSliderContainer from '../containers/spot/SpotSliderContainer';
import SpotPaginationContainer from '../containers/spot/SpotPaginationContainer';

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
