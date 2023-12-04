import HeaderContainer from '../../containers/common/HeaderContainer';
import MyAccountContainer from '../../containers/account/MyAccountContainer';
import Footer from '../../components/common/Footer';
import SpotDetailModalContainer from '../../containers/spot/SpotDetailModalContainer';

const ProfilePage = () => {
    return (
        <>
            <HeaderContainer />
            <MyAccountContainer />
            <SpotDetailModalContainer />
            <Footer />
        </>
    );
};

export default ProfilePage;
