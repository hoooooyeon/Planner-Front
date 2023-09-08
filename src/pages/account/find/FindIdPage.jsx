import FindIdContainer from '../../../containers/account/find/FindIdContainer';
import HeaderContainer from '../../../containers/common/HeaderContainer';
import Footer from '../../../components/common/Footer';

const FindIdPage = () => {
    return (
        <>
            <HeaderContainer />
            <FindIdContainer type="findId" />
            <Footer />
        </>
    );
};

export default FindIdPage;
