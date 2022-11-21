import Profile from '../../components/account/Profile';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProfileContainer from '../../containers/account/ProfileContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ProfilePage = () => {
  return (
    <>
      <HeaderContainer />
      <ProfileContainer />
      {/* <Profile /> */}
      <Footer />
    </>
  );
};

export default ProfilePage;
