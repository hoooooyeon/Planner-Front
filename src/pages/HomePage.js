import Home from '../components/home/Home';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeaderConatiner from '../containers/common/HeaderContainer';

const HomePage = () => {
  return (
    <>
      {/* <Header /> */}
      <HeaderConatiner />
      <Home />
      <Footer />
    </>
  );
};

export default HomePage;
