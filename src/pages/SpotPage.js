import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../components/common/Footer';
import SpotListContainer from '../containers/spot/SpotListContainer';
import SpotPaginationContainer from '../containers/spot/SpotPaginationContainer';
import SpotDetailModalContainer from '../containers/spot/SpotDetailModalContainer';

const SpotPage = () => {
    return (
        <>
            <HeaderContainer />
            <SpotListContainer />
            <SpotPaginationContainer />
            <SpotDetailModalContainer />
            <Footer />
        </>
    );
};

export default SpotPage;
