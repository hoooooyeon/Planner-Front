import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Main from '../components/home/Main';
import HomePlannerList from '../components/home/HomePlannerList';
import HomeReviewList from '../components/home/HomeReviewList';
import HomeSpotList from '../components/home/HomeSpotList';
import HomeServices from '../components/home/HomeServices';

const HomePage = () => {
  return (
    <>
      <Header />
      <Main />
      <HomeServices />
      <HomePlannerList />
      <HomeReviewList />
      <HomeSpotList />
      <Footer />
    </>
  );
};

export default HomePage;
