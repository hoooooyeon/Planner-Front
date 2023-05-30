import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Review from '../../components/review/ReviewList';
import ReviewContainer from '../../containers/review/ReviewContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import { Route } from 'react-router';
import ReviewPaginationContainer from '../../containers/review/ReviewPaginationContainer';

const ReviewPage = ({ match }) => {
    return (
        <>
            <HeaderContainer />
            <ReviewContainer />
            <ReviewPaginationContainer />
            <Footer />
        </>
    );
};

export default ReviewPage;
