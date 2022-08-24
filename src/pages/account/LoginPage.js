import Auth from '../../components/account/Auth';
import AuthTemplate from '../../components/account/AuthTemplate';

const LoginPage = () => {
  return (
    <AuthTemplate>
      <Auth type="login" />
    </AuthTemplate>
  );
};

export default LoginPage;
