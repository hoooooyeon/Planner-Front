
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Intro from '../components/home/Intro';
import HomeShare from '../components/home/HomeShare';
import HomeReview from '../components/home/HomeReview';
import HomeSpot from '../components/home/HomeSpot';

const HomePage = () => {
  return (
    <>
      <Header />
      <Intro />
      <HomeShare />
      <HomeReview />
      <HomeSpot />
      <Footer />
    </>
  );
};

export default HomePage;
