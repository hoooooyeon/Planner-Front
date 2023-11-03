import FindPasswordContainer from '../../../containers/account/find/FindPasswordContainer';
import HeaderContainer from '../../../containers/common/HeaderContainer';
import Footer from '../../../components/common/Footer';

const FindPasswordPage = () => {
    return (
        <>
            <HeaderContainer />
            <FindPasswordContainer type="findPw" />
            <Footer />
        </>
    );
};

export default FindPasswordPage;
