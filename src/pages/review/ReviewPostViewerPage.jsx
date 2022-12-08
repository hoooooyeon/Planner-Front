import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import ReviewViewer from '../../components/review/ReviewViewer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ReviewPostViewerPage = () => {
    return (
        <>
            <HeaderContainer />
            <ReviewViewer />
            <Footer />
        </>
    );
};

export default ReviewPostViewerPage;
