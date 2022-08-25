import Auth from '../../components/account/Auth';
import AuthTemplate from '../../components/account/AuthTemplate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const RegisterPage = () => {
  return (
    <>
      <Header />
      <AuthTemplate>
        <Auth type="register" />
      </AuthTemplate>
      <Footer />
    </>
  );
};

export default RegisterPage;
