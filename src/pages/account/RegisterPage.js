import Auth from '../../components/account/Auth';
import AuthTemplate from '../../components/account/AuthTemplate';

const RegisterPage = () => {
  return (
    <AuthTemplate>
      <Auth type="register" />
    </AuthTemplate>
  );
};

export default RegisterPage;
