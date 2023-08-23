import Main from './Main';
import HomePlannerList from './HomePlannerList';
import HomeReviewList from './HomeReviewList';
import HomeSpotList from './HomeSpotList';
import HomeServices from './HomeServices';

const Home = ({ sharePlanners, loading, onClickPlanner }) => {
    return (
        <>
            <Main />
            <HomeServices />
            <HomePlannerList sharePlanners={sharePlanners} loading={loading} onClickPlanner={onClickPlanner} />
            <HomeReviewList loading={loading} />
            <HomeSpotList />
        </>
    );
};

export default Home;
