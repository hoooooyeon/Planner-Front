import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import ReviewViewer from '../../components/review/ReviewViewer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ReviewViewerContainer from '../../containers/review/ReviewViewerContainer';

const ReviewPostViewerPage = () => {
    return (
        <>
            <HeaderContainer />
            <ReviewViewerContainer />
            <Footer />
        </>
    );
};

export default ReviewPostViewerPage;
