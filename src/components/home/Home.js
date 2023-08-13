import Main from '../home/Main';
import HomePlannerList from '../home/HomePlannerList';
import HomeReviewList from '../home/HomeReviewList';
import HomeSpotList from '../home/HomeSpotList';
import HomeServices from '../home/HomeServices';

const Home = ({ sharePlanners, onClickPlanner }) => {
    return (
        <>
            <Main />
            <HomeServices />
            <HomePlannerList sharePlanners={sharePlanners} onClickPlanner={onClickPlanner} />
            <HomeReviewList />
            <HomeSpotList />
        </>
    );
};

export default Home;
