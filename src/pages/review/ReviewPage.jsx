import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Review from '../../components/review/ReviewList';
import ReviewListContainer from '../../containers/review/ReviewListContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import { Route } from 'react-router';
import ReviewPaginationContainer from '../../containers/review/ReviewPaginationContainer';

const ReviewPage = ({ match }) => {
    return (
        <>
            <HeaderContainer />
            <ReviewListContainer />
            <Footer />
        </>
    );
};

export default ReviewPage;
