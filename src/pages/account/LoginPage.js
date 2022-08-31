import Auth from '../../components/account/Auth';
import LoginContainer from '../../containers/account/LoginContainer';
import AuthTemplate from '../../components/account/AuthTemplate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const LoginPage = () => {
  return (
    <>
      <Header />
      <AuthTemplate>
        {/* <Auth type="login" /> */}
        <LoginContainer />
      </AuthTemplate>
      <Footer />
    </>
  );
};

export default LoginPage;
