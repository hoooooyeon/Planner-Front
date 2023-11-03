import Main from './Main';
import HomePlannerList from './HomePlannerList';
import HomeReviewList from './HomeReviewList';
import HomeSpotList from './HomeSpotList';
import HomeServices from './HomeServices';

const Home = ({ sharePlanners, reviewList, loading, onClickPlanner, onReviewClick }) => {
    return (
        <>
            <Main />
            <HomeServices />
            <HomePlannerList sharePlanners={sharePlanners} loading={loading} onClickPlanner={onClickPlanner} />
            <HomeReviewList reviewList={reviewList} loading={loading} onReviewClick={onReviewClick} />
            <HomeSpotList />
        </>
    );
};

export default Home;
