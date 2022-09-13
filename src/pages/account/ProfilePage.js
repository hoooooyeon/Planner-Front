import Profile from '../../components/account/Profile';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProfileContainer from '../../containers/account/ProfileContainer';

const ProfilePage = () => {
  return (
    <>
      <Header />
      <ProfileContainer />
      {/* <Profile /> */}
      <Footer />
    </>
  );
};

export default ProfilePage;
