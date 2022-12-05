import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import ReviewPost from '../../components/review/ReviewPost';
import HeaderContainer from '../../containers/common/HeaderContainer';

const ReviewPostPage = () => {
    return (
        <>
            <HeaderContainer />
            <ReviewPost />
            <Footer />
        </>
    );
};

export default ReviewPostPage;
