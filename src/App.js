import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PlannerListPage from './pages/planner/PlannerListPage';
import PlannerInfoPage from './pages/planner/PlannerInfoPage';
import PlannerEditPage from './pages/planner/PlannerEditPage';
import ReviewInfoPage from './pages/review/ReviewInfoPage';
import ReviewListPage from './pages/review/ReviewListPage';
import ReviewWritePage from './pages/review/ReviewWritePage';
import ShareInfoPage from './pages/share/ShareInfoPage';
import ShareListPage from './pages/share/ShareListPage';
import SpotPage from './pages/SpotPage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import ProfilePage from './pages/account/ProfilePage';
import MyLikePage from './pages/account/MyLikePage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} exact />
      <Route path="/PlannerList" component={PlannerListPage} />
      <Route path="/PlannerInfo" component={PlannerInfoPage} />
      <Route path="/PlannerEdit" component={PlannerEditPage} />
      <Route path="/ReviewInfo" component={ReviewInfoPage} />
      <Route path="/ReviewList" component={ReviewListPage} />
      <Route path="/ReviewWrite" component={ReviewWritePage} />
      <Route path="/ShareInfo" component={ShareInfoPage} />
      <Route path="/ShareList" component={ShareListPage} />
      <Route path="/Spot" component={SpotPage} />
      <Route path="/Login" component={LoginPage} />
      <Route path="/Register" component={RegisterPage} />
      <Route path="/Profile" component={ProfilePage} />
      <Route path="/MyLike" component={MyLikePage} />
      <Footer />
    </>
  );
};

export default App;
