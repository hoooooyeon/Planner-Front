import Main from '../home/Main';
import HomePlannerList from '../home/HomePlannerList';
import HomeReviewList from '../home/HomeReviewList';
import HomeSpotList from '../home/HomeSpotList';
import HomeServices from '../home/HomeServices';

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
