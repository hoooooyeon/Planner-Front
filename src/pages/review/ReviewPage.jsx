import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Review from '../../components/review/Review';
import ReviewContainer from '../../containers/review/ReviewContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ReviewPage = () => {
    return (
        <>
            <HeaderContainer />
            <ReviewContainer />
            <Footer />
        </>
    );
};

export default ReviewPage;
