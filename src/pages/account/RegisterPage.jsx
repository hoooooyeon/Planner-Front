import Auth from '../../components/account/Auth';
import RegisterContainer from '../../containers/account/RegisterContainer';
import AuthTemplate from '../../components/account/AuthTemplate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const RegisterPage = () => {
    return (
        <>
            <RegisterContainer type="register" />
            <Footer />
        </>
    );
};

export default RegisterPage;
