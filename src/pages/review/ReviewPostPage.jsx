import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import ReviewPost from '../../components/review/ReviewPost';
import HeaderContainer from '../../containers/common/HeaderContainer';
import ReviewWriteEditContainer from '../../containers/review/ReviewWriteEditContainer';

const ReviewPostPage = () => {
    return (
        <>
            <HeaderContainer />
            <ReviewWriteEditContainer />
            <Footer />
        </>
    );
};

export default ReviewPostPage;
