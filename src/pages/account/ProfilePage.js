import Profile from '../../components/account/Profile';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProfileContainer from '../../containers/account/ProfileContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import MyAccountContainer from '../../containers/account/MyAccountContainer';

const ProfilePage = () => {
  return (
    <>
      <HeaderContainer />
      <MyAccountContainer />
      {/* <Profile /> */}
      {/* <Footer /> */}
    </>
  );
};

export default ProfilePage;
