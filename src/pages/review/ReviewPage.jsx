import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Review from '../../components/review/ReviewList';
import ReviewContainer from '../../containers/review/ReviewContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';
import { Route } from 'react-router';

const ReviewPage = ({ match }) => {
    return (
        <>
            <HeaderContainer />
            <ReviewContainer />
            <Footer />
        </>
    );
};

export default ReviewPage;
