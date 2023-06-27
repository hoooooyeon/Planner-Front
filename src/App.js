import './App.css';
import './css/theme.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpotPage from './pages/SpotPage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import ProfilePage from './pages/account/ProfilePage';
import MyLikePage from './pages/account/MyLikePage';
import ReviewPage from './pages/review/ReviewPage';
import ReviewPostPage from './pages/review/ReviewPostPage';
import ReviewPostViewerPage from './pages/review/ReviewPostViewerPage';

const App = () => {
  return (
    <>
      <Route path="/" component={HomePage} exact />
      <Route path="/Spot" component={SpotPage} />
      <Route path="/Login" component={LoginPage} />
      <Route path="/Register" component={RegisterPage} />
      <Route path="/Profile" component={ProfilePage} />
      <Route path="/MyLike" component={MyLikePage} />
      <Route exact path="/reviews" component={ReviewPage} />
      <Route exact path={["/reviews/write", "/reviews/edit"]} component={ReviewPostPage} />
      <Route exact path="/reviews/:reviewId" component={ReviewPostViewerPage} />
    </>
  );
};

export default App;
