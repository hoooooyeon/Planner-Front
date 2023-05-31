import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Main from '../components/home/Main';
import HomePlannerList from '../components/home/HomePlannerList';
import HomeReviewList from '../components/home/HomeReviewList';
import HomeSpotList from '../components/home/HomeSpotList';

const HomePage = () => {
  return (
    <>
      <Header />
      <Main />
      <HomePlannerList />
      <HomeReviewList />
      <HomeSpotList />
      <Footer />
    </>
  );
};

export default HomePage;
