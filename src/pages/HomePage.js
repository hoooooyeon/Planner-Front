
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Intro from '../components/home/Intro';
import HomePlanner from '../components/home/HomePlanner';
import HomeReview from '../components/home/HomeReview';
import HomeSpot from '../components/home/HomeSpot';

const HomePage = () => {
  return (
    <>
      <Header />
      <Intro />
      <HomePlanner />
      <HomeReview />
      <HomeSpot />
      <Footer />
    </>
  );
};

export default HomePage;
