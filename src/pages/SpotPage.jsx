import HeaderContainer from '../containers/common/HeaderContainer';
import Footer from '../components/common/Footer';
import SpotListContainer from '../containers/spot/SpotListContainer';
import SpotDetailModalContainer from '../containers/spot/SpotDetailModalContainer';

const SpotPage = () => {
    return (
        <>
            <HeaderContainer />
            <SpotListContainer />
            <SpotDetailModalContainer />
            <Footer />
        </>
    );
};

export default SpotPage;
